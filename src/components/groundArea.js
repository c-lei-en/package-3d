import * as Cesium from 'Cesium/Cesium'
import widget from 'Cesium/Widgets/widgets.css'
import state from '@/store/index'
import ce from '@/assets/circle_red.png'
import ce1 from '@/assets/circle_gray.png'
import {viewer} from "./cesiumviewer";
import {GlobeTooltip} from './GlobeTooltip'
import $ from 'jquery'

let turf = require('@turf/turf/turf')
let layerId = "aeralayer"
let tooltip = null
let positions = []
let drawHandler = null
let tempPositions = []
let modifyHandler = null
let material = null
let outlineMaterial = null
let fill = true
let outline = true
let outlineWidth = 2
let toolBarIndex = null
let markers = {}
let entitypoint = null
let imageurl = ce
let imageurlmid = ce1
$(function () {
  tooltip = new GlobeTooltip(viewer.container)
  tooltip.setVisible(false)
});

function startDrawGroundPolygon() {
  state.state.groundAreaBtnStatus = true
  areaGroundclear();
  positions = []
  let floatingPoint = null
  drawHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  drawHandler.setInputAction(function (event) {
    let position = event.position;
    if (!Cesium.defined(position)) {
      return;
    }
    let ray = viewer.camera.getPickRay(position);
    if (!Cesium.defined(ray)) {
      return;
    }
    let cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    if (!Cesium.defined(cartesian)) {
      return;
    }
    let num = positions.length;
    if (num == 0) {
      positions.push(cartesian);
      floatingPoint = createPoint(cartesian, -1);
      _showRegion2Map();
    }
    positions.push(cartesian);
    let oid = positions.length - 2;
    createPoint(cartesian, oid);
    /* if (positions.length > 2) {
         let text = _getMeasureTip(positions);
         entitypoint.label.text = text;
     }

     entitypoint.position = cartesian;
     let text =_getMeasureTip(positions);
     entitypoint.label.text = text;*/
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  drawHandler.setInputAction(function (event) {
    let position = event.endPosition;
    if (!Cesium.defined(position)) {
      return;
    }
    if (positions.length < 1) {
      tooltip.showAt(position, "<p>选择起点</p>");
      return;
    }
    let num = positions.length;
    /* let tip =_getMeasureTip(positions);*/
    let tip = ""
    tip = tip.replace("\n", "<br/>");
    tip += "<p>点击添加下一个点</p>";
    if (num > 3) {
      tip += "<p>右键结束绘制</p>";
    }
    tooltip.showAt(position, tip);

    let ray = viewer.camera.getPickRay(position);
    if (!Cesium.defined(ray)) {
      return;
    }
    let cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    if (!Cesium.defined(cartesian)) {
      return;
    }
    floatingPoint.position.setValue(cartesian);
    positions.pop();
    positions.push(cartesian);
    /*  if (positions.length > 2) {
          let text =_getMeasureTip(positions);
          entitypoint.label.text = text;
      }

      entitypoint.position = cartesian;
      let text = _getMeasureTip(positions);
      entitypoint.label.text = text;*/
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  drawHandler.setInputAction(function (movement) {
    if (positions.length < 4) {
      return;
    }
    positions.pop()
    viewer.entities.remove(floatingPoint);
    tooltip.setVisible(false);

    //进入编辑状态
    areaGroundclear();
    _showModifyRegion2Map();
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}

function createPoint(cartesian, oid) {
  let point = viewer.entities.add({
    position: cartesian,
    billboard: {
      image: imageurl,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    }
  });
  point.oid = oid;
  point.layerId = layerId;
  point.flag = "anchor";
  markers[oid] = point;
  return point;
}

function areaGroundclear() {
  if (drawHandler) {
    drawHandler.destroy();
    drawHandler = null;
  }
  if (modifyHandler) {
    modifyHandler.destroy();
    modifyHandler = null;
  }
  /*if (toolBarIndex != null) {
      layer.close(_this.toolBarIndex);
  }*/
  _clearMarkers(layerId)
  tooltip.setVisible(false)
}

function _clearMarkers(layerName) {
  let entityList = viewer.entities.values;
  if (entityList == null || entityList.length < 1)
    return;
  for (let i = 0; i < entityList.length; i++) {
    let entity = entityList[i];
    if (entity.layerId == layerName) {
      viewer.entities.remove(entity);
      i--;
    }
  }
}

function _getMeasureTip(pntList) {
  /*  let dis2d = _computeLineDis2d(pntList);
    let dis3d = _computeLineDis3d(pntList);
    dis2d = dis2d.toFixed(3);
    dis3d = dis3d.toFixed(3);*/
  /* let tip = "周长：" + dis3d + "米";
   if (pntList.length > 2) {
       let area = _computeArea(pntList);
       tip += "\n 面积：" + area.toFixed(3) + "平方米";
   }*/
  return new Promise((resolve, reject) => {
    computedGroundArea(pntList).then((data) => {
      resolve("面积：" + data + "平方米")
    })
  })
}

function _computeLineDis2d(pntList) {
  let total = 0;
  for (let i = 1; i < pntList.length; i++) {
    let p1 = pntList[i - 1];
    let p2 = pntList[i];
    let dis = _computeDis2d(p1, p2);
    total += dis;
  }
  return total;
}

function _computeLineDis3d(pntList) {
  let total = 0;
  for (let i = 1; i < pntList.length; i++) {
    let p1 = pntList[i - 1];
    let p2 = pntList[i];
    let dis = _computeDis3d(p1, p2);
    total += dis;
  }
  return total;
}

function _computeDis2d(c1, c2) {
  let dis = Cesium.Cartesian2.distance(c1, c2) / 1000;
  return dis;
}

function _computeDis3d(p1, p2) {
  let dis = Cesium.Cartesian3.distance(p1, p2);
  return dis;
}

function _computeArea(positions) {
  let arr = [];
  for (let i = 0; i < positions.length; i++) {
    let p = _cartesian2LonLat(positions[i]);
    arr.push([p.lon, p.lat]);
  }
  arr.push(arr[0]); //终点和起点重合

  let polygon = turf.polygon([arr]);
  let area = turf.area(polygon);
  return area;
}

function _cartesian2LonLat(cartesian) {
  //将笛卡尔坐标转换为地理坐标
  let cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian);
  //将弧度转为度的十进制度表示
  let pos = {
    lon: Cesium.Math.toDegrees(cartographic.longitude),
    lat: Cesium.Math.toDegrees(cartographic.latitude),
    alt: Math.ceil(cartographic.height)
  };
  return pos;
}

function _showRegion2Map() {
  if (material == null) {
    material = Cesium.Color.fromCssColorString('#ff0').withAlpha(0.5);
  }
  if (outlineMaterial == null) {
    outlineMaterial = new Cesium.PolylineDashMaterialProperty({
      dashLength: 16,
      color: Cesium.Color.fromCssColorString('#00f').withAlpha(0.7)
    });
  }
  let dynamicHierarchy = new Cesium.CallbackProperty(function () {
    if (positions.length > 2) {
      let pHierarchy = new Cesium.PolygonHierarchy(positions)
      return pHierarchy;
    } else {
      return null;
    }
  }, false);
  let outlineDynamicPositions = new Cesium.CallbackProperty(function () {
    if (positions.length > 1) {
      let arr = [].concat(positions);
      let first = positions[0];
      arr.push(first);
      return arr;
    } else {
      return null;
    }
  }, false);
  let num = positions.length;
  let last = positions[num - 1];
  let bData = {
    position: last,
    /*       label: {
               text: "",
               font: '30px "微软雅黑", Arial, Helvetica, sans-serif, Helvetica',
               fillColor: Cesium.Color.RED,
               outlineColor: Cesium.Color.SKYBLUE,
               outlineWidth: 1,
               style: Cesium.LabelStyle.FILL_AND_OUTLINE,
               heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
               disableDepthTestDistance: Number.POSITIVE_INFINITY
           },*/
    polygon: new Cesium.PolygonGraphics({
      hierarchy: dynamicHierarchy,
      material: material,
      show: fill
    }),
    polyline: {
      positions: outlineDynamicPositions,
      clampToGround: true,
      width: outlineWidth,
      material: outlineMaterial,
      show: outline
    }
  };
  entitypoint = viewer.entities.add(bData);
  entitypoint.layerId = layerId;
}

//修改部分
function _showModifyRegion2Map() {

  _startModify();
  _computeTempPositions();

  let dynamicHierarchy = new Cesium.CallbackProperty(function () {
    if (positions.length > 2) {
      let pHierarchy = new Cesium.PolygonHierarchy(tempPositions);
      return pHierarchy;
    } else {
      return null;
    }
  }, false);
  let outlineDynamicPositions = new Cesium.CallbackProperty(function () {
    if (tempPositions.length > 1) {
      let arr = [].concat(tempPositions);
      let first = tempPositions[0];
      arr.push(first);
      return arr;
    } else {
      return null;
    }
  }, false);
  if (material == null) {
    material = Cesium.Color.fromCssColorString('#ff0').withAlpha(0.5);
  }
  if (outlineMaterial == null) {
    outlineMaterial = new Cesium.PolylineDashMaterialProperty({
      dashLength: 16,
      color: Cesium.Color.fromCssColorString('#00f').withAlpha(0.7)
    });
  }
  let num = tempPositions.length;
  let last = tempPositions[num - 1];
  let bData = {
    position: last,
    /*  label: {
          text: data,
          font: '16px "微软雅黑", Arial, Helvetica, sans-serif, Helvetica',
          fillColor: Cesium.Color.RED,
          outlineColor: Cesium.Color.SKYBLUE,
          outlineWidth: 1,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -15)
      },*/
    polygon: new Cesium.PolygonGraphics({
      hierarchy: dynamicHierarchy,
      material: material,
      show: fill
    }),
    polyline: {
      positions: outlineDynamicPositions,
      clampToGround: true,
      width: outlineWidth,
      material: outlineMaterial,
      show: outline
    }
  };
  entitypoint = viewer.entities.add(bData);
  entitypoint.layerId = layerId;
  let positions = tempPositions;
  for (let i = 0; i < positions.length; i++) {
    let ys = i % 2;
    if (ys == 0) {
      createPoint(positions[i], i);
    } else {
      _createMidPoint(positions[i], i);
    }
  }
  _getMeasureTip(tempPositions).then((data) => {
    entitypoint.label = {
      text: data,
      font: '16px "微软雅黑", Arial, Helvetica, sans-serif, Helvetica',
      fillColor: Cesium.Color.RED,
      outlineColor: Cesium.Color.SKYBLUE,
      outlineWidth: 1,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -15)
    }
  });

}

function _startModify() {
  let isMoving = false;
  let pickedAnchor = null;
  if (drawHandler) {
    drawHandler.destroy();
    drawHandler = null;
  }
  /* _showToolBar();*/
  /*state.state.pickaerabtnstatus=true*/
  modifyHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

  modifyHandler.setInputAction(function (event) {
    let position = event.position;
    if (!Cesium.defined(position)) {
      return;
    }
    let ray = viewer.camera.getPickRay(position);
    if (!Cesium.defined(ray)) {
      return;
    }
    let cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    if (!Cesium.defined(cartesian)) {
      return;
    }
    if (isMoving) {
      isMoving = false;
      pickedAnchor.position.setValue(cartesian);
      let oid = pickedAnchor.oid;
      tempPositions[oid] = cartesian;
      tooltip.setVisible(false);
      if (pickedAnchor.flag == "mid_anchor") {
        _updateModifyAnchors(oid);
      }

      entitypoint.position.setValue(cartesian);
      //
      _getMeasureTip(tempPositions).then((data) => {
        entitypoint.label = {
          text: data,
          font: '16px "微软雅黑", Arial, Helvetica, sans-serif, Helvetica',
          fillColor: Cesium.Color.RED,
          outlineColor: Cesium.Color.SKYBLUE,
          outlineWidth: 1,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -15)
        }
      });
      /*        let text = _getMeasureTip(tempPositions);
              entitypoint.label.text = text;*/
    } else {
      let pickedObject = viewer.scene.pick(position);
      if (!Cesium.defined(pickedObject)) {
        return;
      }
      if (!Cesium.defined(pickedObject.id)) {
        return;
      }
      let entity = pickedObject.id;
      if (entity.layerId != layerId) {
        return;
      }
      if (entity.flag != "anchor" && entity.flag != "mid_anchor") {
        return;
      }
      pickedAnchor = entity;
      isMoving = true;
      if (entity.flag == "anchor") {
        tooltip.showAt(position, "<p>移动控制点</p>");
      }
      if (entity.flag == "mid_anchor") {
        tooltip.showAt(position, "<p>移动创建新的控制点</p>");
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  modifyHandler.setInputAction(function (event) {
    if (!isMoving) {
      return;
    }
    let position = event.endPosition;
    if (!Cesium.defined(position)) {
      return;
    }
    tooltip.showAt(position, "<p>移动控制点</p>");

    let ray = viewer.camera.getPickRay(position);
    if (!Cesium.defined(ray)) {
      return;
    }
    let cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    if (!Cesium.defined(cartesian)) {
      return;
    }
    let oid = pickedAnchor.oid;
    if (pickedAnchor.flag == "anchor") {
      pickedAnchor.position.setValue(cartesian);
      tempPositions[oid] = cartesian;
      //左右两个中点
      _updateNewMidAnchors(oid);
    } else if (pickedAnchor.flag == "mid_anchor") {
      pickedAnchor.position.setValue(cartesian);
      tempPositions[oid] = cartesian;
    }

    entitypoint.position.setValue(cartesian);
    /*    let text = _getMeasureTip(tempPositions);
        entitypoint.label.text = text;*/
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}

function _computeTempPositions() {

  let pnts = [].concat(positions);
  let num = pnts.length;
  let first = pnts[0];
  let last = pnts[num - 1];
  if (_isSimpleXYZ(first, last) == false) {
    pnts.push(first);
    num += 1;
  }
  tempPositions = [];
  for (let i = 1; i < num; i++) {
    let p1 = pnts[i - 1];
    let p2 = pnts[i];
    let cp = _computeCenterPotition(p1, p2);
    tempPositions.push(p1);
    tempPositions.push(cp);
  }
}

/*function _showToolBar() {
    _createToolBar();
    var width = $(window).width();
    var wTop = 60;
    var wLeft = parseInt((width - 145) / 2);
    _this.toolBarIndex = layer.open({
        title: false,
        type: 1,
        fixed: true,
        resize: false,
        shade: 0,
        content: $("#shapeEditContainer"),
        offset: [wTop + "px", wLeft + "px"],
        move: "#shapeEditRTCorner"
    });
    var cssSel = "#layui-layer" + _this.toolBarIndex + " .layui-layer-close2";
    $(cssSel).hide();
}
function _createToolBar() {
    let objs = $("#shapeEditContainer");
    objs.remove();
    let html = '<div id="shapeEditContainer" style="padding: 10px 10px;">'
        + '    <button name="btnOK">  确定 </button>'
        + '    <button name="btnCancel"> 取消 </button>'
        + '    <div id="shapeEditRTCorner" style="width: 16px; position: absolute; right: 0px; top: 0px; bottom: 0px">'
        + '    </div>'
        + '</div>';
    $("body").append(html);

    let btnOK = $("#shapeEditContainer button[name='btnOK']");
    let btnCancel = $("#shapeEditContainer button[name='btnCancel']");
    btnOK.unbind("click").bind("click", function () {
        if (callback) {
            let positions = [];
            for (var i = 0; i <tempPositions.length; i += 2) {
                var p = tempPositions[i];
                positions.push(p);
            }
          positions = positions;

            clear();
            layer.close(_this.toolBarIndex);

            var dis2d = _this._computeLineDis2d(positions);
            var dis3d = _this._computeLineDis3d(positions);
            var area = _this._computeArea(positions);
            dis2d = dis2d.toFixed(3);
            dis3d = dis3d.toFixed(3);
            area = area.toFixed(3);

            var rlt = {
                dis2d: dis2d,
                dis3d: dis3d,
                area: area
            }
            _this.callback(positions, rlt);
        }
    });
    btnCancel.unbind("click").bind("click", function () {
        _this.clear();
        layer.close(_this.toolBarIndex);
    });
}*/
function _updateModifyAnchors(oid) {
  //重新计算tempPositions
  let p = tempPositions[oid];
  let p1 = null;
  let p2 = null;
  let num = tempPositions.length;
  if (oid == 0) {
    p1 = tempPositions[num - 1];
    p2 = tempPositions[oid + 1];
  } else if (oid == num - 1) {
    p1 = tempPositions[oid - 1];
    p2 = tempPositions[0];
  } else {
    p1 = tempPositions[oid - 1];
    p2 = tempPositions[oid + 1];
  }
  //计算中心
  let cp1 = _computeCenterPotition(p1, p);
  let cp2 = _computeCenterPotition(p, p2);

  //插入点
  let arr = [cp1, p, cp2];
  tempPositions.splice(oid, 1, cp1, p, cp2);

  //重新加载锚点
  _clearAnchors(layerId);
  let positions = tempPositions;
  for (let i = 0; i < positions.length; i++) {
    let ys = i % 2;
    if (ys == 0) {
      createPoint(positions[i], i);
    } else {
      _createMidPoint(positions[i], i);
    }
  }
}

function _computeCenterPotition(p1, p2) {
  let c1 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(p1);
  let c2 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(p2);
  let cm = new Cesium.EllipsoidGeodesic(c1, c2).interpolateUsingFraction(0.5);
  let cp = Cesium.Ellipsoid.WGS84.cartographicToCartesian(cm);
  return cp;
}

function _clearAnchors() {
  for (let key in markers) {
    let m = markers[key];
    viewer.entities.remove(m);
  }
  markers = {};
}

function _createMidPoint(cartesian, oid) {
  let point = viewer.entities.add({
    position: cartesian,
    billboard: {
      image: ce1,
      eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0, 0, -500)),
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    }
  });
  point.oid = oid;
  point.layerId = layerId;
  point.flag = "mid_anchor";
  markers[oid] = point;
  return point;
}

function _updateNewMidAnchors(oid) {
  if (oid == null || oid == undefined) {
    return;
  }
  //左边两个中点，oid2为临时中间点
  let oid1 = null;
  let oid2 = null;

  //右边两个中点，oid3为临时中间点
  let oid3 = null;
  let oid4 = null;
  let num = tempPositions.length;
  if (oid == 0) {
    oid1 = num - 2;
    oid2 = num - 1;
    oid3 = oid + 1;
    oid4 = oid + 2;
  } else if (oid == num - 2) {
    oid1 = oid - 2;
    oid2 = oid - 1;
    oid3 = num - 1;
    oid4 = 0;
  } else {
    oid1 = oid - 2;
    oid2 = oid - 1;
    oid3 = oid + 1;
    oid4 = oid + 2;
  }

  let c1 = tempPositions[oid1];
  let c = tempPositions[oid];
  let c4 = tempPositions[oid4];

  let c2 = _computeCenterPotition(c1, c);
  let c3 = _computeCenterPotition(c4, c);

  tempPositions[oid2] = c2;
  tempPositions[oid3] = c3;

  markers[oid2].position.setValue(c2);
  markers[oid3].position.setValue(c3);
}

function _isSimpleXYZ(p1, p2) {
  if (p1.x == p2.x && p1.y == p2.y && p1.z == p2.z) {
    return true;
  }
  return false;
}

function cegrid() {
  let pso = []
  pso.push(new Cesium.Cartesian3(-1189320.8769539467, 5238894.284088392, 3433907.635919925))
  pso.push(new Cesium.Cartesian3(-1189098.4874485559, 5239071.412896252, 3433644.6157160136))
  pso.push(new Cesium.Cartesian3(-1189453.8385316436, 5239252.517625561, 3433355.8594888053))
  pso.push(new Cesium.Cartesian3(-1189855.8156941058, 5238964.119781468, 3433620.820269648))

  /*  pso.push(new Cesium.Cartesian3( -1159086.4971449429, 5261137.313359491, 3410155.854104712))
    pso.push(new Cesium.Cartesian3(-1158993.2880690875, 5261258.87182738,3409925.076236482))
    pso.push(new Cesium.Cartesian3(-1159277.01972341, 5261245.347810771, 3409828.328596637))
    pso.push(new Cesium.Cartesian3( -1159425.6153388575, 5261129.242130426, 3410019.159346315))
    pso.push(new Cesium.Cartesian3(-1159203.2926049659, 5261191.474337088, 3410027.1230304353))*/
  /*  computedGroundArea(pso).then((data)=>{
        console.log(data)
    })*/
}

//positionArray是cartesian3类型的数组
function computedGroundArea(positionArray) {
  return new Promise((resolve, reject) => {
    if (!Cesium.defined(positionArray)) {
      throw "positionArray is null or undefined";
    }
    let polygonGeoJson = cartesian3ToGeoJson(positionArray)
    let triangles = turf.tesselate(polygonGeoJson);
    //总面积
    let groundArea = 0
    let terrainProvider = new Cesium.CesiumTerrainProvider({
      url: dynamicConfig.DEMAddress
    })
    let promiseArray = []
    for (let i = 0; i < triangles.features.length; i++) {
      let trianglePoint = triangleInterpolationPoint(triangles.features[i])
      //获取点数组
      let allPos = []
      for (let i = 0; i < trianglePoint.features.length; i++) {
        allPos.push(Cesium.Cartographic.fromDegrees(trianglePoint.features[i].geometry.coordinates[0], trianglePoint.features[i].geometry.coordinates[1]))
      }
      let promisePos = Cesium.sampleTerrainMostDetailed(terrainProvider, allPos);
      promiseArray.push(promisePos)
    }
    Promise.all(promiseArray).then((updatedPositions) => {
      for (let m = 0; m < updatedPositions.length; m++) {
        let mapPos = new Map()
        for (let i = 0; i < updatedPositions[m].length; i++) {
          mapPos.set(updatedPositions[m][i].longitude.toString() + updatedPositions[m][i].latitude.toString(), updatedPositions[m][i].height)
        }
        let tin = getTin(triangleInterpolationPoint(triangles.features[m]))
        for (let j = 0; j < tin.features.length; j++) {
          let car3Array = []
          for (let k = 0; k < 3; k++) {
            let lon = tin.features[j].geometry.coordinates[0][k][0]
            let lat = tin.features[j].geometry.coordinates[0][k][1]
            let car2g = Cesium.Cartographic.fromDegrees(lon, lat)
            let height = mapPos.get(car2g.longitude.toString() + car2g.latitude.toString())
            car2g.height = height
            car3Array.push(car2g)
          }
          groundArea += computed(car3Array)
        }
      }
      resolve(parseFloat(groundArea).toFixed(3))
    })
  })
}

function cartesian3ToGeoJson(positionArray) {
  let ellipsoid = Cesium.Ellipsoid.WGS84
  let lonLatArray = []
  for (let i = 0; i < positionArray.length; i++) {
    let cartographic = ellipsoid.cartesianToCartographic(positionArray[i]);
    lonLatArray.push([Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude)])
  }
  lonLatArray.push(lonLatArray[0])
  return turf.polygon([lonLatArray]);
}

function triangleInterpolationPoint(triangle) {
  let area = turf.area(triangle);
  let cellSize = Math.sqrt(area / 1000);
  let enveloped = turf.envelope(triangle);
  let bbox = turf.bbox(enveloped);
  let grid = turf.pointGrid(bbox, cellSize, {units: 'meters'});
  return turf.pointsWithinPolygon(grid, triangle);
}

function getTin(trianglePoint) {
  return turf.tin(trianglePoint);
}

function computed(car3Array) {
  let firstPoint2car3 = Cesium.Cartesian3.fromRadians(car3Array[0].longitude, car3Array[0].latitude, car3Array[0].height)
  let secondPoint2car3 = Cesium.Cartesian3.fromRadians(car3Array[1].longitude, car3Array[1].latitude, car3Array[1].height)
  let thirdPoint2car3 = Cesium.Cartesian3.fromRadians(car3Array[2].longitude, car3Array[2].latitude, car3Array[2].height)
  let a = Cesium.Cartesian3.distance(firstPoint2car3, secondPoint2car3)
  let b = Cesium.Cartesian3.distance(thirdPoint2car3, secondPoint2car3)
  let c = Cesium.Cartesian3.distance(firstPoint2car3, thirdPoint2car3)
  let p = (a + b + c) / 2
  return Math.sqrt(p * (p - a) * (p - b) * (p - c))
}


export {
  startDrawGroundPolygon,
  areaGroundclear,
  cegrid
}
