const Cesium = require("cesium/Cesium");

export default class SubmergenceAnalysis {
  constructor(
    viewer,
    isTerrain = true,
    height_max,
    height_min,
    step,
    map_type,
    positionsArr,
    speed
  ) {
    this.viewer = viewer;
    this.isTerrain = isTerrain;
    this.handler = null;
    this.tempEntities = [];
    this.polygonEntities = [];
    this.linePositionList = [];
    this.tempPoints = [];
    this.extrudedHeight = height_min;
    this.height_max = height_max;
    this.height_min = height_min;
    this.step = step;
    // 默认是范围图/深度图
    this.map_type = map_type;
    this.polygon_degrees = positionsArr;
    this.speed = speed;
    this._addDisListener();
  }

  // 根据矩形范围得到行列数点坐标和高程信息
  _getPoints(xmin, xmax, ymin, ymax) {
    const x_count = 10;
    const y_count = 10;
    let cartesians = new Array(x_count * y_count);
    const x_d = (xmax - xmin) / x_count;
    for (var i = 0; i < x_count; ++i) {
      const start_pt = { x: xmin + i * x_d, y: ymax };
      const end_pt = { x: xmin + i * x_d, y: ymin };
      for (let j = 0; j < y_count; j++) {
        const offset = j / (y_count - 1);
        const x = Cesium.Math.lerp(start_pt.x, end_pt.x, offset);
        const y = Cesium.Math.lerp(start_pt.y, end_pt.y, offset);
        cartesians[j + i * y_count] = Cesium.Cartographic.fromDegrees(x, y);
      }
    }
    return cartesians;
  }
  _getHeights(cartesians, extrudedHeight, callback) {
    var terrainProvider = new Cesium.createWorldTerrain({
      requestVertexNormals: true
    });
    // 根据地形计算某经纬度点的高度
    var promise = Cesium.sampleTerrainMostDetailed(terrainProvider, cartesians);
    Cesium.when(promise, function(updatedPositions) {
      let positions = updatedPositions.filter(d => {
        const cartographic = d;
        if (cartographic) {
          const h_d = extrudedHeight - cartographic.height;
          return h_d > 0;
        }
      });
      positions = positions.map(d => {
        const cartographic = d;
        let h = extrudedHeight - cartographic.height;
        return {
          x: Cesium.Math.toDegrees(cartographic.longitude),
          y: Cesium.Math.toDegrees(cartographic.latitude),
          value: h
        };
      });

      if (callback) {
        callback(positions);
      }
    });
  }

  _addDisListener() {
    let viewer = this.viewer;
    let scene = viewer.scene;
    let linePositionList = this.linePositionList;
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );
    this.handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    // 绘制线
    this._drawLine(linePositionList);
    //this.loadGrandCanyon()
    // 绘制面
    if (this.map_type) {
      this._drawPoly(this.polygon_degrees);
    } else {
      // 得到插值网格
      const bounds = {
        west: 115.8784,
        east: 115.9614,
        south: 39.9912,
        north: 40.0381
      };

      const positions_cartesian = this._getPoints(
        bounds.east,
        bounds.west,
        bounds.south,
        bounds.north
      );
      this._getHeights(positions_cartesian, this.extrudedHeight);
    }
  }

  _drawLine(linePositionList) {
    let lineStyle = {
      width: 2,
      material: Cesium.Color.CHARTREUSE
    };

    let entity = this.viewer.entities.add({
      polyline: lineStyle
    });

    entity.polyline.positions = new Cesium.CallbackProperty(function() {
      return linePositionList;
    }, false);

    this.polygonEntities.push(entity);
  }

  _drawPoly(degrees) {
    const that = this;
    let entity = this.viewer.entities.add({
      polygon: {
        hierarchy: {},
        material: new Cesium.Color.fromBytes(64, 157, 253, 100),
        perPositionHeight: true
      }
    });
    entity.polygon.hierarchy = new Cesium.PolygonHierarchy(
      Cesium.Cartesian3.fromDegreesArray(degrees)
    );
    entity.polygon.extrudedHeight = new Cesium.CallbackProperty(
      () => that.extrudedHeight,
      false
    );
    this.polygonEntities.push(entity);
  }

  //移除整个资源
  remove() {
    let viewer = this.viewer;
    for (let tempEntity of this.tempEntities) {
      viewer.entities.remove(tempEntity);
    }
    for (let lineEntity of this.polygonEntities) {
      viewer.entities.remove(lineEntity);
    }
    this.handler.destroy();
  }
  start() {
    const that = this;
    this.timer = window.setInterval(() => {
      if (
        that.height_max > that.extrudedHeight &&
        that.extrudedHeight >= that.height_min
      ) {
        that.extrudedHeight = that.extrudedHeight + that.step;
      } else {
        that.extrudedHeight = that.height_min;
      }
    }, that.speed * 1000);
    if (that.map_type) {
      that._drawPoly(that.polygon_degrees);
    }
  }
  clear() {
    let viewer = this.viewer;
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
    this.extrudedHeight = this.height_min;
    for (let entity of this.polygonEntities) {
      viewer.entities.remove(entity);
    }
    viewer.skyAtmosphere = true;
  }
  changeMapType(type) {
    if (!type) {
      for (let entity of this.polygonEntities) {
        entity.show = false;
      }
    } else {
      for (let entity of this.polygonEntities) {
        entity.show = true;
      }
    }
  }

  // 切割一部分地形
  loadGrandCanyon() {
    var globe = this.viewer.scene.globe;
    const viewer = this.viewer;
    // viewer.skyAtmosphere = false,
    // Pick a position at the Grand Canyon
    var position = Cesium.Cartographic.toCartesian(
      new Cesium.Cartographic.fromDegrees(115.9165534, 40.0139345, 100)
    );
    var distance = 30000.0;
    var boundingSphere = new Cesium.BoundingSphere(position, distance);

    globe.clippingPlanes = new Cesium.ClippingPlaneCollection({
      modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(position),
      planes: [
        new Cesium.ClippingPlane(
          new Cesium.Cartesian3(1.0, 0.0, 0.0),
          distance
        ),
        new Cesium.ClippingPlane(
          new Cesium.Cartesian3(-1.0, 0.0, 0.0),
          distance
        ),
        new Cesium.ClippingPlane(
          new Cesium.Cartesian3(0.0, 1.0, 0.0),
          distance
        ),
        new Cesium.ClippingPlane(
          new Cesium.Cartesian3(0.0, -1.0, 0.0),
          distance
        )
      ],
      unionClippingRegions: true
    });
    globe.clippingPlanes.enabled = true;
    viewer.camera.viewBoundingSphere(
      boundingSphere,
      new Cesium.HeadingPitchRange(0.5, -0.5, boundingSphere.radius * 5.0)
    );
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
  }
}
