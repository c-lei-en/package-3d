<template>
  <div id="cesiumContainer" style="width:100%;height:100%"></div>
</template>

<script>
import createImageryProvider from "@/mapconfig/addlayer/createImageryProvider";
import addTerrain from "@/mapconfig/addTerrain/addTerrain";
import Camera from "@/mapconfig/camera/camera";
// import createDataSource from "@/mapconfig/dataSource/dataSource";
// import createEntity from "@/mapconfig/entity/entity";
// import createPrimitve from "@/mapconfig/primitive/primitive";
import createParticleSystem from "@/mapconfig/particleSystem/particleSystem";
export default {
  name: "Home",
  mounted() {
    window.viewer = new this.Cesium.Viewer("cesiumContainer", {
      animation: true, // * 左下角圆盘 速度控制器
      shouldAnimate: true, // * 当动画控件出现，用来控制是否通过旋转控件，旋转场景
      baseLayerPicker: false, // * 右上角图层选择器
      fullscreenButton: false, // * 右下角全屏按钮
      vrButton: false, // * 右下角vr按钮
      homeButton: false, // * 右上角地图恢复到初始页面按钮
      selectionIndicator: false, // * 点击后地图上显示的选择控件
      infoBox: false, // * 右上角鼠标点击后信息展示框
      sceneModePicker: false, // * 右上角2D和3D之间的切换
      timeline: false, // * 页面下方的时间条
      navigationHelpButton: false, // * 右上角帮助按钮
      navigationInstructionsInitiallyVisible: false, // * 是否展开帮助
      scene3DOnly: true, // * 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
      useDefaultRenderLoop: true, // * 控制渲染循环
      showRenderLoopErrors: true, // * HTML面板中显示错误信息
      useBrowserRecommendedResolution: true, // * 如果为true，则以浏览器建议的分辨率渲染并忽略window.devicePixelRatio
      automaticallyTrackDataSourceClocks: true, // * 自动追踪最近添加的数据源的时钟设置
      orderIndependentTranslucency: true, // * 如果为true并且配置支持它，则使用顺序无关的半透明性
      shadows: false, // * 阴影效果
      projectionPicker: false, // * 透视投影和正投影之间切换
      requestRenderMode: true, // * 在指定情况下进行渲染,提高性能
      imageryProvider: createImageryProvider(
        "arcgis",
        "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer"
      ),
      terrainProvider: addTerrain(
        "cesiumTerrain",
        "http://localhost:8091/jiuzhaigou"
      )
    });
    // let layers = window.viewer.scene.imageryLayers;
    // let imaPro = createImageryProvider(
    //   "arcgis",
    //   "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer"
    // );
    // * 添加imageryProvider
    // let arcLayer = layers.addImageryProvider(imaPro);
    // * 设置图层的可视性
    // arcLayer.show = true;
    // * 设置图层的透明度
    // arcLayer.alpha = 0.5;
    // * 添加图层
    // layers.add(arcLayer);
    // * 移除图层 第二个参数表明这个图层移除后是否销毁,如果不指明,默认销毁
    // layers.remove(arcLayer, false)
    window.viewer._cesiumWidget._creditContainer.style.display = "none"; // * 隐藏版权信息
    // let scene = window.viewer.scene;

    // * 禁止掉默认事件
    // scene.screenSpaceCameraController.enableRotate = false;
    // scene.screenSpaceCameraController.enableTranslate = false;
    // scene.screenSpaceCameraController.enableZoom = false;
    // scene.screenSpaceCameraController.enableTilt = false;
    // scene.screenSpaceCameraController.enableLook = false;

    let camera = new Camera();
    camera.setView([0, 0, 10000000.0], {
      heading: 0,
      pitch: -90,
      roll: 0
    });

    // * 相机控制
    // camera.cameraControl();

    // * 相机飞行
    {
      // camera.flyTo({
      //   destination: [-117.16, 32.71, 15000.0],
      //   orientation: {
      //     heading: 175.0,
      //     pitch: -35.0,
      //     roll: 0.0
      //   }
      // });
    }

    // ? dataSource
    {
      // * 创建customDataSource
      {
        // let dataSource = createDataSource("customDataSource", "myData");
        // dataSource.entities.add({
        //   position: this.Cesium.Cartesian3.fromDegrees(1, 2, 0),
        //   billboard: {
        //     image: require("../assets/cat.jpg")
        //   }
        // });
        // window.viewer.dataSources.add(dataSource);
      }

      // * 创建kmlDataSource
      {
        // let dataSource = createDataSource(
        //   "kmlDataSource",
        //   "@/SampleData/kml/bikeRide.kml",
        //   { clampToGround: true }
        // );
        // dataSource.then(res => {
        //   window.viewer.dataSources.add(res);
        // });
      }

      // * 创建GeoJsonDataSource
      {
        // let dataSource = createDataSource(
        //   "json",
        //   "http://localhost:8091/SampleData/simplestyles.geojson",
        //   {
        //     clampToGround: true
        //   }
        // );
        // dataSource.then(res => {
        //   console.log(res);
        //   window.viewer.dataSources.add(res);
        //   window.viewer.zoomTo(dataSource);
        // });
      }

      // * 创建topojson
      {
        // let dataSource = createDataSource(
        //   "json",
        //   "http://localhost:8091/SampleData/ne_10m_us_states.topojson"
        // );
        // dataSource.then(res => {
        //   let entities = res.entities.values;
        //   for (let entity of entities) {
        //     if (this.Cesium.defined(entity.polygon)) {
        //       // *设置材质
        //       entity.polygon.material = this.Cesium.Color.fromRandom({
        //         red: 0.1,
        //         maximumGreen: 0.5,
        //         minimumBlue: 0.5,
        //         alpha: 0.5
        //       });
        //       // * 多边形对地形和3Dtile进行区分
        //       entity.polygon.classificationType = this.Cesium.ClassificationType.TERRAIN;
        //       // * 获取多边形的中心位置
        //       let polyPositions = entity.polygon.hierarchy.getValue(
        //         this.Cesium.JulianDate.now()
        //       ).positions;
        //       let polyCenter = this.Cesium.BoundingSphere.fromPoints(polyPositions)
        //         .center;
        //       polyCenter = this.Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(
        //         polyCenter
        //       );
        //       entity.position = polyCenter;
        //       // * 设置实体的文字
        //       entity.label = {
        //         text: entity.name,
        //         showBackground: true,
        //         scale: 0.6,
        //         horizontalOrigin: this.Cesium.HorizontalOrigin.CENTER, // * 标签的左右位置
        //         verticalOrigin: this.Cesium.VerticalOrigin.BOTTOM, // * 标签的垂直位置
        //         distanceDisplayCondition: new this.Cesium.DistanceDisplayCondition(
        //           10.0,
        //           10000000.0
        //         ), // * 标签离摄像机多远时显示
        //         disableDepthTestDistance: 100.0
        //       };
        //     }
        //   }
        //   window.viewer.dataSources.add(res);
        // });
      }

      // * 创建czml
      {
        // let dataSource = createDataSource(
        //   "czml",
        //   "http://localhost:8091/SampleData/simple.czml"
        // );
        // dataSource.then(res => {
        //   window.viewer.dataSources.add(res);
        //   let drone = res.entities.getById("Satellite/ISS");
        //   // * 替换glb
        //   drone.model = {
        //     uri:
        //       "http://localhost:8091/SampleData/models/CesiumDrone/CesiumDrone.glb",
        //     minimumPixelSize: 128, // * 最小像素大小
        //     maximumScale: 1000, // * 最大比例尺寸
        //     silhouetteColor: this.Cesium.Color.WHITE, // * 轮廓颜色
        //     silhouetteSize: 3 // * 轮廓大小
        //   };
        //   // * 计算并设置模型方向
        //   drone.orientation = new this.Cesium.VelocityOrientationProperty(
        //     drone.position
        //   );
        //   // * 位置插值使运动平滑
        //   drone.position.setInterpolationOptions({
        //     interpolationDegree: 3,
        //     interpolationAlgorithm: this.Cesium.HermitePolynomialApproximation // * 插值算法
        //   });
        // });
      }
    }

    // ? entity
    {
      // * 创建polygon
      {
        //   let entity = createEntity("polygon", {
        //   name: "entity",
        //   hierarchy: [
        //     -109.080842,
        //     45.002073,
        //     -105.91517,
        //     45.002073,
        //     -104.058488,
        //     44.996596,
        //     -104.053011,
        //     43.002989,
        //     -104.053011,
        //     41.003906,
        //     -105.728954,
        //     40.998429,
        //     -107.919731,
        //     41.003906,
        //     -109.04798,
        //     40.998429,
        //     -111.047063,
        //     40.998429,
        //     -111.047063,
        //     42.000709,
        //     -111.047063,
        //     44.476286,
        //     -111.05254,
        //     45.002073
        //   ],
        //   height: 20000,
        //   extrudedHeight: 250000,
        //   material: this.Cesium.Color.RED.withAlpha(0.5),
        //   outline: true
        // });
        // let enti = window.viewer.entities.add(entity);
        // window.viewer.zoomTo(enti);
      }

      // * 创建point
      {
        //   let entity = createEntity("point", {
        //   name: "entity",
        //   position: [-109.080842, 45.002073],
        //   outlineWidth: 2
        // });
        // let enti = window.viewer.entities.add(entity);
        // window.viewer.zoomTo(enti);
      }

      // * 创建polyline
      {
        // let entity = createEntity("polyline", {
        //   positions: [86.787554, 28.034714, 86.391273, 27.939707],
        //   material: new this.Cesium.PolylineOutlineMaterialProperty({
        //     color: this.Cesium.Color.ORANGE,
        //     outlineWidth: 3,
        //     outlineColor: this.Cesium.Color.RED,
        //     glowPower: 0.2
        //   }),
        //   width: 5,
        //   clampToGround: true
        // });
        // let enti = window.viewer.entities.add(entity);
        // window.viewer.zoomTo(enti);
      }

      // * 创建billboard
      {
        // let entity = createEntity("billboard", {
        //   position: [86.787554, 28.034714],
        //   image: require("../assets/cat.jpg"),
        //   show: true,
        //   pixelOffset: new this.Cesium.Cartesian2(0, -50),
        //   eyeOffset: new this.Cesium.Cartesian3(0.0, 0.0, 0.0),
        //   horizontalOrigin: this.Cesium.HorizontalOrigin.CENTER,
        //   verticalOrigin: this.Cesium.VerticalOrigin.BOTTOM,
        //   scale: 2.0,
        //   color: this.Cesium.Color.WHITE,
        //   rotation: this.Cesium.Math.PI_OVER_FOUR,
        //   alignedAxis: this.Cesium.Cartesian3.ZERO,
        //   width: 100,
        //   height: 100
        // });
        // let enti = window.viewer.entities.add(entity);
        // window.viewer.zoomTo(enti);
      }

      // * 创建box
      {
        // let entity = createEntity("box", {
        //   position: [86.787554, 28.034714],
        //   show: true,
        //   dimensions: [400000.0, 300000.0, 500000.0],
        //   material: this.Cesium.Color.BLUE,
        //   outline: true,
        //   outlineColor: this.Cesium.Color.RED,
        //   outlineWidth: 3.0
        // });
        // let enti = window.viewer.entities.add(entity);
        // window.viewer.zoomTo(enti);
      }

      // * 创建corridor
      {
        // let entity = createEntity("corridor", {
        //   position: [-90.0, 40.0, -95.0, 40.0, -95.0, 35.0],
        //   show: true,
        //   height: 100000.0,
        //   width: 200000.0,
        //   extrudedHeight: 120000.0,
        //   cornerType: this.Cesium.CornerType.BEVELED,
        //   material: this.Cesium.Color.BLUE,
        //   outline: true,
        //   outlineColor: this.Cesium.Color.RED,
        //   outlineWidth: 3.0
        // });
        // let enti = window.viewer.entities.add(entity);
        // window.viewer.zoomTo(enti);
      }

      // * 创建cylinder
      {
        // let entity = createEntity("cylinder", {
        //   position: [-90.0, 40.0, 0],
        //   show: true,
        //   length: 100000.0,
        //   topRadius: 200000.0,
        //   bottomRadius: 300000.0,
        //   material: this.Cesium.Color.BLUE,
        //   outline: true,
        //   outlineColor: this.Cesium.Color.RED,
        //   outlineWidth: 3.0
        // });
        // let enti = window.viewer.entities.add(entity);
        // window.viewer.zoomTo(enti);
      }

      // * 创建ellipse
      {
        // let entity = createEntity("ellipse", {
        //   position: [-90.0, 40.0, 0],
        //   show: true,
        //   semiMajorAxis: 100000.0,
        //   semiMinorAxis: 50000.0,
        //   extrudedHeight: 3000.0,
        //   material: this.Cesium.Color.BLUE,
        //   outline: true,
        //   outlineColor: this.Cesium.Color.RED,
        //   outlineWidth: 3.0
        // });
        // let enti = window.viewer.entities.add(entity);
        // window.viewer.zoomTo(enti);
      }

      // * 创建ellipsoid
      {
        // let entity = createEntity("ellipsoid", {
        //   position: [-90.0, 40.0, 0],
        //   show: true,
        //   radii: [200000.0, 200000.0, 300000.0],
        //   material: this.Cesium.Color.BLUE,
        //   outline: true,
        //   outlineColor: this.Cesium.Color.RED,
        //   outlineWidth: 3.0
        // });
        // let enti = window.viewer.entities.add(entity);
        // window.viewer.zoomTo(enti);
      }

      // * 创建label
      {
        // let entity = createEntity("label", {
        //   position: [-90.0, 40.0, 0],
        //   show: true,
        //   text: "Philadelphia",
        //   font: "40px Helvetica",
        //   outlineWidth: 2,
        //   backgroundColor: new this.Cesium.Color(0.5, 0.5, 0, 0.8),
        //   showBackground: true
        // });
        // let enti = window.viewer.entities.add(entity);
        // window.viewer.zoomTo(enti);
      }

      // * 创建plane
      {
        // let entity = createEntity("plane", {
        //   position: [-114.0, 40.0, 300000.0],
        //   show: true,
        //   dimensions: [400000.0, 300000.0], // * 指定平面宽高
        //   fill: true,
        //   outline: true,
        //   outlineWidth: 2
        // });
        // let enti = window.viewer.entities.add(entity);
        // window.viewer.zoomTo(enti);
      }

      // * 创建polylineVolume
      {
        // let entity = createEntity("polylineVolume", {
        //   positions: [
        //     -90.0,
        //     32.0,
        //     0.0,
        //     -90.0,
        //     36.0,
        //     100000.0,
        //     -94.0,
        //     36.0,
        //     0.0
        //   ],
        //   show: true,
        //   cornerType: this.Cesium.CornerType.BEVELED,
        //   material: this.Cesium.Color.GREEN.withAlpha(0.5),
        //   outline: true,
        //   outlineColor: this.Cesium.Color.BLACK
        // });
        // let enti = window.viewer.entities.add(entity);
        // window.viewer.zoomTo(enti);
      }

      // * 创建rectangle
      {
        // let entity = createEntity("rectangle", {
        //   coordinates: [-110.0, 30.0, -100.0, 40.0],
        //   extrudedHeight: 300000.0,
        //   fill: false,
        //   outline: true,
        //   outlineWidth: 2.0
        // });
        // let enti = window.viewer.entities.add(entity);
        // window.viewer.zoomTo(enti);
      }

      // * 创建wall
      {
        // let entity = createEntity("wall", {
        //   positions: [
        //     -107.0,
        //     43.0,
        //     100000.0,
        //     -97.0,
        //     43.0,
        //     100000.0,
        //     -97.0,
        //     40.0,
        //     100000.0,
        //     -107.0,
        //     40.0,
        //     100000.0,
        //     -107.0,
        //     43.0,
        //     100000.0
        //   ],
        //   maximumHeights: [100000, 200000, 100000, 200000, 100000],
        //   minimumHeights: [0, 100000, 0, 100000, 0],
        //   fill: false,
        //   material: this.Cesium.Color.BLUE.withAlpha(0.5),
        //   outline: true,
        //   outlineWidth: 2.0
        // });
        // let enti = window.viewer.entities.add(entity);
        // window.viewer.zoomTo(enti);
      }

      // * 创建model
      {
        // let entity = createEntity("model", {
        //   positions: [-107.0, 43.0, 0],
        //   uri:
        //     "http://localhost:8091/SampleData/models/CesiumAir/Cesium_Air.glb"
        // });
        // let enti = window.viewer.entities.add(entity);
        // window.viewer.zoomTo(enti);
      }

      // * 创建tileset
      {
        // let entity = createEntity("tileset", {
        //   uri: "http://localhost:8091/cz/tileset.json"
        // });
        // let enti = window.viewer.entities.add(entity);
        // window.viewer.zoomTo(enti);
      }
    }

    // ? primitive
    {
      // * box
      // let geometry = createPrimitve("box", {
      //   dimensions: [400000.0, 300000.0, 500000.0],
      //   modelMatrix: [-105.0, 45.0]
      // });
      // * boxOutline
      // let geometry = createPrimitve("boxOutline", {
      //   dimensions: [400000.0, 300000.0, 500000.0],
      //   modelMatrix: [-105.0, 45.0]
      // });
      // * circle
      // let geometry = createPrimitve("circle", {
      //   center: [-75.59777, 40.03883],
      //   radius: 100000.0
      // });
      // * circleOutline
      // let geometry = createPrimitve("circleOutline", {
      //   center: [-75.59777, 40.03883],
      //   radius: 100000.0
      // });
      // * coplanarPolygon
      // let geometry = createPrimitve("coplanarPolygon", {
      //   polygonHierarchy: [
      //     -90.0,
      //     30.0,
      //     0.0,
      //     -90.0,
      //     30.0,
      //     300000.0,
      //     -80.0,
      //     30.0,
      //     300000.0,
      //     -80.0,
      //     30.0,
      //     0.0
      //   ]
      // });
      // * coplanarPolygonOutline
      // let geometry = createPrimitve("coplanarPolygonOutline", {
      //   polygonHierarchy: [
      //     -90.0,
      //     30.0,
      //     0.0,
      //     -90.0,
      //     30.0,
      //     300000.0,
      //     -80.0,
      //     30.0,
      //     300000.0,
      //     -80.0,
      //     30.0,
      //     0.0
      //   ]
      // });
      // * corridor
      // let geometry = createPrimitve("corridor", {
      //   positions: [-72.0, 40.0, -70.0, 35.0, -75.59777, 40.03883],
      //   width: 100000,
      //   extrudedHeight: 100000
      // });
      // * corridorOutline
      // let geometry = createPrimitve("corridorOutline", {
      //   positions: [-72.0, 40.0, -70.0, 35.0, -75.59777, 40.03883],
      //   width: 100000,
      //   extrudedHeight: 100000
      // });
      // * cylinder
      // let geometry = createPrimitve("cylinder", {
      //   length: 200000,
      //   topRadius: 80000,
      //   bottomRadius: 200000,
      //   modelMatrix: [-105.0, 45.0]
      // });
      // * cylinderOutline
      // let geometry = createPrimitve("cylinderOutline", {
      //   length: 200000,
      //   topRadius: 80000,
      //   bottomRadius: 200000,
      //   modelMatrix: [-105.0, 45.0]
      // });
      // * ellipse
      // let geometry = createPrimitve("ellipse", {
      //   center: [-75.59777, 40.03883],
      //   semiMajorAxis: 500000.0,
      //   semiMinorAxis: 300000.0,
      //   extrudedHeight: 100000
      // });
      // * ellipseOutline
      // let geometry = createPrimitve("ellipseOutline", {
      //   center: [-75.59777, 40.03883],
      //   semiMajorAxis: 500000.0,
      //   semiMinorAxis: 300000.0,
      //   extrudedHeight: 100000
      // });
      // * ellipsoid
      // let geometry = createPrimitve("ellipsoid", {
      //   radii: [1000000.0, 500000.0, 500000.0],
      //   modelMatrix: [-105.0, 45.0]
      // });
      // * ellipsoidOutline
      // let geometry = createPrimitve("ellipsoidOutline", {
      //   radii: [1000000.0, 500000.0, 500000.0],
      //   modelMatrix: [-105.0, 45.0]
      // });
      // * frustum
      // let geometry = createPrimitve("frustum", {
      //   origin: [-105.0, 45.0]
      // });
      // * frustumOutline
      // let geometry = createPrimitve("frustumOutline", {
      //   origin: [-105.0, 45.0]
      // });
      // * plane
      // let geometry = createPrimitve("plane", {
      //   modelMatrix: [-105.0, 45.0],
      //   long: 100000.0,
      //   width: 200000.0
      // });
      // * planeOutline
      // let geometry = createPrimitve("planeOutline", {
      //   modelMatrix: [-105.0, 45.0],
      //   long: 100000.0,
      //   width: 200000.0
      // });
      // * polygon
      // let geometry = createPrimitve("polygon", {
      //   polygonHierarchy: [
      //     -72.0,
      //     40.0,
      //     -70.0,
      //     35.0,
      //     -75.0,
      //     30.0,
      //     -70.0,
      //     30.0,
      //     -68.0,
      //     40.0
      //   ],
      //   extrudedHeight: 1000000.0
      // });
      // * polygonOutline
      // let geometry = createPrimitve("polygonOutline", {
      //   polygonHierarchy: [
      //     -72.0,
      //     40.0,
      //     -70.0,
      //     35.0,
      //     -75.0,
      //     30.0,
      //     -70.0,
      //     30.0,
      //     -68.0,
      //     40.0
      //   ],
      //   extrudedHeight: 1000000.0
      // });
      // * polyline
      // let geometry = createPrimitve("polyline", {
      //   positions: [-80.0, 39.0, -74.0, 42.0],
      //   width: 6.0
      // });
      // * simplePolyline
      // let geometry = createPrimitve("simplePolyline", {
      //   positions: [-80.0, 39.0, -74.0, 42.0, -72.0, 40.0]
      // });
      // * rectangle
      // let geometry = createPrimitve("rectangle", {
      //   rectangle: [-80.0, 39.0, -74.0, 42.0],
      //   extrudedHeight: 1000000.0
      // });
      // * rectangleOutline
      // let geometry = createPrimitve("rectangleOutline", {
      //   rectangle: [-80.0, 39.0, -74.0, 42.0],
      //   extrudedHeight: 1000000.0
      // });
      // * sphere
      // let geometry = createPrimitve("sphere", {
      //   radius: 1.0,
      //   modelMatrix: [-80.0, 39.0]
      // });
      // * sphereOutline
      // let geometry = createPrimitve("sphereOutline", {
      //   radius: 1.0,
      //   modelMatrix: [-80.0, 39.0]
      // });
      // * wall
      // let geometry = createPrimitve("wall", {
      //   positions: [-95.0, 50.0, -85.0, 50.0, -75.0, 50.0],
      //   maximumHeights: [500000, 1000000, 500000],
      //   minimumHeights: [0, 500000, 0]
      // });
      // * wallOutline
      // let geometry = createPrimitve("wallOutline", {
      //   positions: [-95.0, 50.0, -85.0, 50.0, -75.0, 50.0],
      //   maximumHeights: [500000, 1000000, 500000],
      //   minimumHeights: [0, 500000, 0]
      // });
      // * 创建primitive
      // let primitive = new this.Cesium.Primitive({
      //   geometryInstances: geometry,
      //   // appearance: new this.Cesium.EllipsoidSurfaceAppearance({
      //   //   material: this.Cesium.Material.fromType("Stripe")
      //   // }),
      //   appearance: new this.Cesium.PerInstanceColorAppearance({
      //     flat: true,
      //     translucent: false,
      //     renderState: {
      //       lineWidth: Math.min(
      //         6.0,
      //         window.viewer.scene.maximumAliasedLineWidth
      //       )
      //     }
      //   }),
      //   // appearance: new this.Cesium.PolylineColorAppearance({
      //   //   translucent: false
      //   // }),
      //   show: true,
      //   modelMatrix: this.Cesium.Matrix4.IDENTITY,
      //   vertexCacheOptimize: false, // * 当为真时，几何顶点会被优化为前顶点着色器和后顶点着色器缓存
      //   interleave: false, // * 为true时顶点属性交错,改善了渲染性能但是增加了加载时间
      //   compressVertices: true, // *为true时压缩顶点,节省内存
      //   releaseGeometryInstances: true, // * 为true时primitive不会保留对GeometryInstance的引用以节省内存
      //   allowPicking: true, // * 为true时只能通过场景pick来拾取,为false则表示保存GPU内存
      //   asynchronous: false, // * 为true表示异步创建
      //   debugShowBoundingVolume: false // * 为true表示展示primitive的边界球
      // });
      // window.viewer.scene.primitives.add(primitive);
    }

    // ? ParticleSystem

    var emitterModelMatrix = new this.Cesium.Matrix4();
    var translation = new this.Cesium.Cartesian3();
    var rotation = new this.Cesium.Quaternion();
    var hpr = new this.Cesium.HeadingPitchRoll();
    var trs = new this.Cesium.TranslationRotationScale();
    let computeEmitterModelMatrix = () => {
      hpr = this.Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, hpr);
      trs.translation = this.Cesium.Cartesian3.fromElements(
        -4.0,
        0.0,
        1.4,
        translation
      );
      trs.rotation = this.Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);

      return this.Cesium.Matrix4.fromTranslationRotationScale(
        trs,
        emitterModelMatrix
      );
    };

    // * basicParticle
    {
      // let entity = createEntity("model", {
      //   positions: [-107.0, 43.0, 0],
      //   uri: "http://localhost:8091/SampleData/models/CesiumAir/Cesium_Air.glb"
      // });
      // let enti = window.viewer.entities.add(entity);
      // window.viewer.zoomTo(enti);
      // let particleSystem = createParticleSystem({
      //   image: require("../assets/cat.jpg"),
      //   imageSize: new this.Cesium.Cartesian2(20, 20),
      //   startScale: 0.001,
      //   endScale: 4.0,
      //   particleLife: 1.0,
      //   speed: 5.0,
      //   emitter: new this.Cesium.CircleEmitter(20),
      //   emissionRate: 5.0,
      //   emitterModelMatrix: computeEmitterModelMatrix(),
      //   modelMatrix: enti.computeModelMatrix(
      //     window.viewer.clock.startTime,
      //     new this.Cesium.Matrix4()
      //   )
      // });
      // window.viewer.scene.primitives.add(particleSystem);
    }

    // * followModel
    {
      var start = this.Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
      var stop = this.Cesium.JulianDate.addSeconds(
        start,
        120,
        new this.Cesium.JulianDate()
      );

      window.viewer.clock.startTime = start.clone();
      window.viewer.clock.stopTime = stop.clone();
      window.viewer.clock.currentTime = start.clone();
      window.viewer.clock.clockRange = this.Cesium.ClockRange.LOOP_STOP; //Loop at the end
      window.viewer.clock.multiplier = 1;
      // window.viewer.timeline.zoomTo(start, stop);

      var pos1 = this.Cesium.Cartesian3.fromDegrees(
        -75.1633691390455,
        39.95355089912078
      );
      var pos2 = this.Cesium.Cartesian3.fromDegrees(
        -74.15787310614596,
        39.97862668312678
      );
      var position = new this.Cesium.SampledPositionProperty();

      position.addSample(start, pos1);
      position.addSample(stop, pos2);

      let entity = {
        position: position,
        availability: new this.Cesium.TimeIntervalCollection([
          new this.Cesium.TimeInterval({
            start: start,
            stop: stop
          })
        ]),

        model: {
          uri:
            "http://localhost:8091/SampleData/models/CesiumAir/Cesium_Air.glb"
        }
      };
      let enti = window.viewer.entities.add(entity);
      window.viewer.zoomTo(enti);

      window.viewer.trackedEntity = enti;

      var viewModel = {
        emissionRate: 5.0,
        gravity: 0.0,
        minimumParticleLife: 1.2,
        maximumParticleLife: 1.2,
        minimumSpeed: 1.0,
        maximumSpeed: 4.0,
        startScale: 0.001,
        endScale: 0.001,
        particleSize: 25.0
      };

      var gravityScratch = new this.Cesium.Cartesian3();
      let applyGravity = (p, dt) => {
        // We need to compute a local up vector for each particle in geocentric space.
        var position = p.position;

        this.Cesium.Cartesian3.normalize(position, gravityScratch);
        this.Cesium.Cartesian3.multiplyByScalar(
          gravityScratch,
          viewModel.gravity * dt,
          gravityScratch
        );

        p.velocity = this.Cesium.Cartesian3.add(
          p.velocity,
          gravityScratch,
          p.velocity
        );
      };

      let particleSystem = createParticleSystem({
        image: require("../assets/cat.jpg"),

        imageSize: new this.Cesium.Cartesian2(
          viewModel.particleSize,
          viewModel.particleSize
        ),
        startScale: viewModel.startScale,
        endScale: viewModel.endScale,
        startColor: this.Cesium.Color.LIGHTSEAGREEN.withAlpha(0.7),
        endColor: this.Cesium.Color.WHITE.withAlpha(0.0),
        minimumParticleLife: viewModel.minimumParticleLife,
        maximumParticleLife: viewModel.maximumParticleLife,
        emitter: new this.Cesium.CircleEmitter(20),
        emissionRate: viewModel.emissionRate,
        minimumSpeed: viewModel.minimumSpeed,
        maximumSpeed: viewModel.maximumSpeed,
        lifetime: 16.0,
        updateCallback: applyGravity,

        emitterModelMatrix: computeEmitterModelMatrix(),
        modelMatrix: enti.computeModelMatrix(
          window.viewer.clock.startTime,
          new this.Cesium.Matrix4()
        )
      });
      let particle = window.viewer.scene.primitives.add(particleSystem);

      window.viewer.scene.preUpdate.addEventListener((scene, time) => {
        particle.modelMatrix = enti.computeModelMatrix(
          time,
          new this.Cesium.Matrix4()
        );

        // Account for any changes to the emitter model matrix.
        particle.emitterModelMatrix = computeEmitterModelMatrix();

        // Spin the emitter if enabled.
        if (viewModel.spin) {
          viewModel.heading += 1.0;
          viewModel.pitch += 1.0;
          viewModel.roll += 1.0;
        }
      });
    }
  }
};
</script>
