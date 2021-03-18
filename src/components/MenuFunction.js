// import Cesium from 'cesium/Cesium'
import * as Cesium from "Cesium/Cesium";
import state from "@/store/index";
import { viewer } from "./cesiumviewer";
import pic from "@/assets/circle_red.png";
import pic2 from "@/assets/circle_gray.png";
import { GlobeTooltip } from "./GlobeTooltip";
import $ from "jquery";

let canvas = null;
let ellipsoid = null;
let tooltip = null;
let entity = null;
let positions = [];
let tempPositions = [];
let drawHandler = null;
let modifyHandler = null;
let dragIcon = pic2;
let dragIconLight = pic;
let material = null;
let markers = {};
let layerId = "globeDrawerLayer";

//清除当前界面绘制的测线entity
function ClearLine() {
  viewer.entities.remove(entity);
}

//Tooltip提示框
$(function() {
  tooltip = new GlobeTooltip(viewer.container);
  tooltip.setVisible(false);
});

//测量贴地线
function MeasureStickDis() {
  startDrawPolyline();
}

function clear() {
  if (drawHandler) {
    drawHandler.destroy();
    drawHandler = null;
  }
  if (modifyHandler) {
    modifyHandler.destroy();
    modifyHandler = null;
  }
  clearMarkers(layerId);
  tooltip.setVisible(false);
}

function startDrawPolyline() {
  positions = [];
  var floatingPoint = null;
  drawHandler = new Cesium.ScreenSpaceEventHandler(canvas);

  drawHandler.setInputAction(function(event) {
    var position = event.position;
    if (!Cesium.defined(position)) {
      return;
    }
    var ray = viewer.camera.getPickRay(position);
    if (!Cesium.defined(ray)) {
      return;
    }
    var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    if (!Cesium.defined(cartesian)) {
      return;
    }
    var num = positions.length;
    if (num === 0) {
      positions.push(cartesian);
      floatingPoint = createPoint(cartesian, -1);
      showPolyline2Map();
    }
    positions.push(cartesian);
    var oid = positions.length - 2;
    createPoint(cartesian, oid);

    entity.position = cartesian;
    /*console.log(positions);
    var text = getMeasureTip(positions);
    entity.label.text = text;*/
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  drawHandler.setInputAction(function(event) {
    var position = event.endPosition;
    if (!Cesium.defined(position)) {
      return;
    }
    if (positions.length < 1) {
      tooltip.showAt(position, "<p>选择起点</p>");
      return;
    }
    var num = positions.length;
    var tip = "<p>点击添加下一个点</p>";
    if (num > 2) {
      tip += "<p>右键结束绘制</p>";
    }
    tooltip.showAt(position, tip);

    var ray = viewer.camera.getPickRay(position);
    if (!Cesium.defined(ray)) {
      return;
    }
    var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    if (!Cesium.defined(cartesian)) {
      return;
    }
    floatingPoint.position.setValue(cartesian);
    positions.pop();
    positions.push(cartesian);

    entity.position.setValue(cartesian);
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  drawHandler.setInputAction(function(movement) {
    if (positions.length < 3) {
      return;
    }
    positions.pop();
    viewer.entities.remove(floatingPoint);
    tooltip.setVisible(false);

    //进入编辑状态
    state.state.status.draftStatus = true;
    clear();
    showModifyPolyline2Map();
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}

function startModify() {
  var isMoving = false;
  var pickedAnchor = null;
  if (drawHandler) {
    drawHandler.destroy();
    drawHandler = null;
  }

  modifyHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

  modifyHandler.setInputAction(function(event) {
    var position = event.position;
    if (!Cesium.defined(position)) {
      return;
    }
    var ray = viewer.camera.getPickRay(position);
    if (!Cesium.defined(ray)) {
      return;
    }
    var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    if (!Cesium.defined(cartesian)) {
      return;
    }
    if (isMoving) {
      isMoving = false;
      pickedAnchor.position.setValue(cartesian);
      var oid = pickedAnchor.oid;
      tempPositions[oid] = cartesian;
      tooltip.setVisible(false);
      if (pickedAnchor.flag == "mid_anchor") {
        updateModifyAnchors(oid);
      }
      entity.position.setValue(cartesian);
      /*var text = getMeasureTip(tempPositions);
      entity.label.text = text;*/
    } else {
      var pickedObject = viewer.scene.pick(position);
      if (!Cesium.defined(pickedObject)) {
        return;
      }
      if (!Cesium.defined(pickedObject.id)) {
        return;
      }
      let entity1 = pickedObject.id;
      /*console.log(pickedObject.oid)*/
      if (entity1.layerId != layerId) {
        return;
      }
      if (entity1.flag != "anchor" && entity1.flag != "mid_anchor") {
        return;
      }
      pickedAnchor = entity1;
      isMoving = true;
      if (entity1.flag == "anchor") {
        tooltip.showAt(position, "<p>移动控制点</p>");
      }
      if (entity1.flag == "mid_anchor") {
        tooltip.showAt(position, "<p>移动创建新的控制点</p>");
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  modifyHandler.setInputAction(function(event) {
    if (!isMoving) {
      return;
    }
    var position = event.endPosition;
    if (!Cesium.defined(position)) {
      return;
    }
    tooltip.showAt(position, "<p>移动控制点</p>");

    var ray = viewer.camera.getPickRay(position);
    if (!Cesium.defined(ray)) {
      return;
    }
    var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    if (!Cesium.defined(cartesian)) {
      return;
    }
    var oid = pickedAnchor.oid;
    if (pickedAnchor.flag == "anchor") {
      pickedAnchor.position.setValue(cartesian);
      tempPositions[oid] = cartesian;
      //左右两个中点
      updateNewMidAnchors(oid);
    } else if (pickedAnchor.flag == "mid_anchor") {
      pickedAnchor.position.setValue(cartesian);
      tempPositions[oid] = cartesian;
    }

    entity.position.setValue(cartesian);
    /*var text = getMeasureTip(tempPositions);
    entity.label.text = text;*/
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}

function showPolyline2Map() {
  if (material == null) {
    material = new Cesium.PolylineGlowMaterialProperty({
      glowPower: 0.25,
      color: Cesium.Color.fromCssColorString("#00f").withAlpha(0.9)
    });
  }
  var dynamicPositions = new Cesium.CallbackProperty(function() {
    return positions;
  }, false);
  var num = positions.length;
  var last = positions[num - 1];
  var bData = {
    position: last,
    label: {
      text: "",
      font: '16px "微软雅黑", Arial, Helvetica, sans-serif, Helvetica',
      fillColor: Cesium.Color.RED,
      outlineColor: Cesium.Color.SKYBLUE,
      outlineWidth: 1,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    },
    polyline: {
      positions: dynamicPositions,
      clampToGround: true,
      width: 8,
      material: material
    }
  };
  entity = viewer.entities.add(bData);
  entity.layerId = layerId;
}

function showModifyPolyline2Map() {
  startModify();
  computeTempPositions();

  var dynamicPositions = new Cesium.CallbackProperty(function() {
    return tempPositions;
  }, false);
  if (material == null) {
    material = new Cesium.PolylineGlowMaterialProperty({
      glowPower: 0.25,
      color: Cesium.Color.fromCssColorString("#00f").withAlpha(0.9)
    });
  }
  var num = tempPositions.length;
  var last = tempPositions[num - 1];
  /*var text = getMeasureTip(tempPositions);*/
  var bData = {
    position: last,
    label: {
      /*text: text,*/
      /* text:"暂不计算",*/
      font: '16px "微软雅黑", Arial, Helvetica, sans-serif, Helvetica',
      fillColor: Cesium.Color.RED,
      outlineColor: Cesium.Color.SKYBLUE,
      outlineWidth: 1,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    },
    polyline: {
      positions: dynamicPositions,
      clampToGround: true,
      width: 8,
      material: material
    }
  };
  entity = viewer.entities.add(bData);
  entity.layerId = layerId;
  var positions = tempPositions;
  for (var i = 0; i < positions.length; i++) {
    var ys = i % 2;
    if (ys == 0) {
      createPoint(positions[i], i);
    } else {
      createMidPoint(positions[i], i);
    }
  }
}

function updateModifyAnchors(oid) {
  var num = tempPositions.length;
  if (oid == 0 || oid == num - 1) {
    return;
  }
  //重新计算tempPositions
  var p = tempPositions[oid];
  var p1 = tempPositions[oid - 1];
  var p2 = tempPositions[oid + 1];

  //计算中心
  var cp1 = computeCenterPotition(p1, p);
  var cp2 = computeCenterPotition(p, p2);

  //插入点
  var arr = [cp1, p, cp2];
  tempPositions.splice(oid, 1, cp1, p, cp2);

  //重新加载锚点
  clearAnchors(layerId);
  var positions = tempPositions;
  for (var i = 0; i < positions.length; i++) {
    var ys = i % 2;
    if (ys == 0) {
      createPoint(positions[i], i);
    } else {
      createMidPoint(positions[i], i);
    }
  }
}

function updateNewMidAnchors(oid) {
  if (oid == null || oid == undefined) {
    return;
  }
  //左边两个中点，oid2为临时中间点
  var oid1 = null;
  var oid2 = null;
  //右边两个中点，oid3为临时中间点
  var oid3 = null;
  var oid4 = null;

  var num = tempPositions.length;
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

  var c1 = tempPositions[oid1];
  var c = tempPositions[oid];
  var c4 = tempPositions[oid4];

  if (oid == 0) {
    var c3 = computeCenterPotition(c4, c);
    tempPositions[oid3] = c3;
    markers[oid3].position.setValue(c3);
  } else if (oid == num - 1) {
    var c2 = computeCenterPotition(c1, c);
    tempPositions[oid2] = c2;
    markers[oid2].position.setValue(c2);
  } else {
    var c2 = computeCenterPotition(c1, c);
    var c3 = computeCenterPotition(c4, c);
    tempPositions[oid2] = c2;
    tempPositions[oid3] = c3;
    markers[oid2].position.setValue(c2);
    markers[oid3].position.setValue(c3);
  }
}

function createPoint(cartesian, oid) {
  var bData = {
    position: cartesian,
    billboard: {
      image: dragIconLight,
      eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0, 0, -500)),
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    }
  };
  var point = viewer.entities.add(bData);
  point.oid = oid;
  point.layerId = layerId;
  point.flag = "anchor";
  markers[oid] = point;
  return point;
}

function createMidPoint(cartesian, oid) {
  var point = viewer.entities.add({
    position: cartesian,
    billboard: {
      image: dragIcon,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    }
  });
  point.oid = oid;
  point.layerId = layerId;
  point.flag = "mid_anchor";
  markers[oid] = point;
  return point;
}

function getMeasureTip(pntList) {
  try {
    var dis3d = computeLineDis3d(pntList);
    dis3d = dis3d.toFixed(3);
    var tip = "距离：" + dis3d + "千米";
    return tip;
  } catch (e) {
    return "计算超出范围，请缩短距离";
  }
}

function computeTempPositions() {
  var pnts = [].concat(positions);
  var num = pnts.length;
  tempPositions = [];
  for (var i = 1; i < num; i++) {
    var p1 = pnts[i - 1];
    var p2 = pnts[i];
    var cp = computeCenterPotition(p1, p2);
    tempPositions.push(p1);
    tempPositions.push(cp);
  }
  var last = pnts[num - 1];
  tempPositions.push(last);
}

function computeCenterPotition(p1, p2) {
  ellipsoid = viewer.scene.globe.ellipsoid;
  var c1 = ellipsoid.cartesianToCartographic(p1);
  var c2 = ellipsoid.cartesianToCartographic(p2);
  var cm = new Cesium.EllipsoidGeodesic(c1, c2).interpolateUsingFraction(0.5);
  var cp = ellipsoid.cartographicToCartesian(cm);
  return cp;
}

function computeDis3d(p1, p2) {
  var dis = Cesium.Cartesian3.distance(p1, p2) / 1000; //distance计算两点之间的距离
  return dis;
}

function computeLineDis3d(pntList) {
  var total = 0;
  var positions = getStick2GroundLine(pntList);
  for (var i = 1; i < positions.length; i++) {
    var p1 = positions[i - 1];
    var p2 = positions[i];
    var dis = computeDis3d(p1, p2);
    total += dis;
  }
  return total;
}

//获取贴地线
function getStick2GroundLine(positions) {
  var flatPositions = Cesium.PolylinePipeline.generateArc({
    positions: positions,
    granularity: 0.000001 //一个数字属性，指定每个纬度和经度点之间的角度距离。  大概距离一米左右一个点
    /*granularity:0.001*/
  });
  var cartesianArray = [];
  for (var i = 0; i < flatPositions.length; i += 3) {
    var cartesian = Cesium.Cartesian3.unpack(flatPositions, i);
    cartesianArray.push(cartesian);
  }

  var raisedPositions = [];
  for (var i = 0; i < cartesianArray.length; i += 3) {
    var cartesian3 = getStick2GroundPoint3d(cartesianArray[i]);
    raisedPositions.push(cartesian3);
  }
  return raisedPositions;
}

//获取高程值
function getStick2GroundPoint3d(cartesian) {
  ellipsoid = viewer.scene.globe.ellipsoid;
  var cartographic = ellipsoid.cartesianToCartographic(cartesian);
  cartographic.height = viewer.scene.globe.getHeight(cartographic);
  var cartesian3 = ellipsoid.cartographicToCartesian(cartographic); //长度大了会报错
  /*console.log(cartesian3);*/
  return cartesian3;
}

function isSimpleXYZ(p1, p2) {
  if (p1.x == p2.x && p1.y == p2.y && p1.z == p2.z) {
    return true;
  }
  return false;
}

function clearMarkers(layerName) {
  var entityList = viewer.entities.values;
  if (entityList == null || entityList.length < 1) return;
  for (var i = 0; i < entityList.length; i++) {
    var entity = entityList[i];
    if (entity.layerId == layerName) {
      viewer.entities.remove(entity);
      i--;
    }
  }
}

function clearAnchors() {
  for (var key in markers) {
    var m = markers[key];
    viewer.entities.remove(m);
  }
  markers = {};
}

function CountLineLength() {
  var text = getMeasureTip(tempPositions);
  return text;
}

export {
  MeasureStickDis,
  clear,
  ClearLine,
  CountLineLength,
  getMeasureTip,
  startDrawPolyline,
  showModifyPolyline2Map
};
