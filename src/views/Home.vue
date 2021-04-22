<template>
  <div style="width:100%;height:100%;">
    <!-- <div class="infoBox">
      <span>123</span>
    </div> -->
    <!-- <video id="myVideo" muted="" autoplay="" loop="" crossorigin="" controls="">
      <source src="http://localhost:8091/淹没分析.mp4" type="video/mp4" />
    </video> -->
    <div id="cesiumContainer" style="width:100%;height:100%;"></div>
  </div>
</template>

<script>
import createImageryProvider from "@/mapconfig/addlayer/createImageryProvider";
import addTerrain from "@/mapconfig/addTerrain/addTerrain";
import Camera from "@/mapconfig/camera/camera";
// import createDataSource from "@/mapconfig/dataSource/dataSource";
// import createEntity from "@/mapconfig/entity/entity";
// import createPrimitve from "@/mapconfig/primitive/primitive";
// import createParticleSystem from "@/mapconfig/particleSystem/particleSystem";
// import { popFun } from "@/mapconfig/infoBox/infoBox";
// import { startDrawGroundPolygon } from "@/mapconfig/measure/groundArea";
// import { MeasureStickDis } from "@/mapconfig/measure/groundLength";
// import { MeasureStickDis as planeLength } from "@/mapconfig/measure/planeLength";
// import { startDrawGroundPolygon as planeArea } from "@/mapconfig/measure/planeArea";
// import ViewShedStage from "@/mapconfig/viewshedAnalysis/ViewshedAnalysis";
// import SubmergenceAnalysis from "@/mapconfig/floodAnalysis/FloodAnalysis";
// import VideoOn from "@/mapconfig/videoOn/videoOn";
// import { VisibilityAnalysis } from "@/mapconfig/visibilityAnalysis/visibilityAnalysis";
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
      showRenderLoopErrors: false, // * HTML面板中显示错误信息
      useBrowserRecommendedResolution: true, // * 如果为true，则以浏览器建议的分辨率渲染并忽略window.devicePixelRatio
      automaticallyTrackDataSourceClocks: true, // * 自动追踪最近添加的数据源的时钟设置
      orderIndependentTranslucency: true, // * 如果为true并且配置支持它，则使用顺序无关的半透明性
      shadows: false, // * 阴影效果
      projectionPicker: false, // * 透视投影和正投影之间切换
      requestRenderMode: true, // * 在指定情况下进行渲染,提高性能
      imageryProvider: createImageryProvider(
        "wmts",
        "http://t0.tianditu.gov.cn/img_w/wmts?tk=c0b9cb30599dd11c468c8aaa2fc1863a",
        {
          layer: "img",
          format: "image/jpeg",
          tileMatrixSetID: "w",
          maximumLevel: 18
        }
      ),
      terrainProvider: addTerrain("ionTerrain")
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
    camera.setView([112.419718, 37.927023, 2000.0], {
      heading: 0,
      pitch: -45,
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
      // * 3dtile
      // let primitive = createPrimitve("3dTile", {
      //   url: "http://localhost:8091/cz/tileset.json"
      // });
      // let pri = window.viewer.scene.primitives.add(primitive);
      // window.viewer.zoomTo(pri);
    }

    // ? ParticleSystem
    {
      // var emitterModelMatrix = new this.Cesium.Matrix4();
      // var translation = new this.Cesium.Cartesian3();
      // var rotation = new this.Cesium.Quaternion();
      // var hpr = new this.Cesium.HeadingPitchRoll();
      // var trs = new this.Cesium.TranslationRotationScale();
      // let computeEmitterModelMatrix = () => {
      //   hpr = this.Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, hpr);
      //   trs.translation = this.Cesium.Cartesian3.fromElements(
      //     -4.0,
      //     0.0,
      //     1.4,
      //     translation
      //   );
      //   trs.rotation = this.Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);

      //   return this.Cesium.Matrix4.fromTranslationRotationScale(
      //     trs,
      //     emitterModelMatrix
      //   );
      // };

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
        // var start = this.Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
        // var stop = this.Cesium.JulianDate.addSeconds(
        //   start,
        //   120,
        //   new this.Cesium.JulianDate()
        // );
        // window.viewer.clock.startTime = start.clone();
        // window.viewer.clock.stopTime = stop.clone();
        // window.viewer.clock.currentTime = start.clone();
        // window.viewer.clock.clockRange = this.Cesium.ClockRange.LOOP_STOP; //Loop at the end
        // window.viewer.clock.multiplier = 1;
        // // window.viewer.timeline.zoomTo(start, stop);
        // var pos1 = this.Cesium.Cartesian3.fromDegrees(
        //   -75.1633691390455,
        //   39.95355089912078
        // );
        // var pos2 = this.Cesium.Cartesian3.fromDegrees(
        //   -74.15787310614596,
        //   39.97862668312678
        // );
        // var position = new this.Cesium.SampledPositionProperty();
        // position.addSample(start, pos1);
        // position.addSample(stop, pos2);
        // let entity = {
        //   position: position,
        //   availability: new this.Cesium.TimeIntervalCollection([
        //     new this.Cesium.TimeInterval({
        //       start: start,
        //       stop: stop
        //     })
        //   ]),
        //   model: {
        //     uri:
        //       "http://localhost:8091/SampleData/models/CesiumAir/Cesium_Air.glb"
        //   }
        // };
        // let enti = window.viewer.entities.add(entity);
        // window.viewer.zoomTo(enti);
        // window.viewer.trackedEntity = enti;
        // var viewModel = {
        //   emissionRate: 5.0,
        //   gravity: 0.0,
        //   minimumParticleLife: 1.2,
        //   maximumParticleLife: 1.2,
        //   minimumSpeed: 1.0,
        //   maximumSpeed: 4.0,
        //   startScale: 0.001,
        //   endScale: 0.001,
        //   particleSize: 25.0
        // };
        // var gravityScratch = new this.Cesium.Cartesian3();
        // let applyGravity = (p, dt) => {
        //   // We need to compute a local up vector for each particle in geocentric space.
        //   var position = p.position;
        //   this.Cesium.Cartesian3.normalize(position, gravityScratch);
        //   this.Cesium.Cartesian3.multiplyByScalar(
        //     gravityScratch,
        //     viewModel.gravity * dt,
        //     gravityScratch
        //   );
        //   p.velocity = this.Cesium.Cartesian3.add(
        //     p.velocity,
        //     gravityScratch,
        //     p.velocity
        //   );
        // };
        // let particleSystem = createParticleSystem({
        //   image: require("../assets/cat.jpg"),
        //   imageSize: new this.Cesium.Cartesian2(
        //     viewModel.particleSize,
        //     viewModel.particleSize
        //   ),
        //   startScale: viewModel.startScale,
        //   endScale: viewModel.endScale,
        //   startColor: this.Cesium.Color.LIGHTSEAGREEN.withAlpha(0.7),
        //   endColor: this.Cesium.Color.WHITE.withAlpha(0.0),
        //   minimumParticleLife: viewModel.minimumParticleLife,
        //   maximumParticleLife: viewModel.maximumParticleLife,
        //   emitter: new this.Cesium.CircleEmitter(20),
        //   emissionRate: viewModel.emissionRate,
        //   minimumSpeed: viewModel.minimumSpeed,
        //   maximumSpeed: viewModel.maximumSpeed,
        //   lifetime: 16.0,
        //   updateCallback: applyGravity,
        //   emitterModelMatrix: computeEmitterModelMatrix(),
        //   modelMatrix: enti.computeModelMatrix(
        //     window.viewer.clock.startTime,
        //     new this.Cesium.Matrix4()
        //   )
        // });
        // let particle = window.viewer.scene.primitives.add(particleSystem);
        // window.viewer.scene.preUpdate.addEventListener((scene, time) => {
        //   particle.modelMatrix = enti.computeModelMatrix(
        //     time,
        //     new this.Cesium.Matrix4()
        //   );
        //   // Account for any changes to the emitter model matrix.
        //   particle.emitterModelMatrix = computeEmitterModelMatrix();
        //   // Spin the emitter if enabled.
        //   if (viewModel.spin) {
        //     viewModel.heading += 1.0;
        //     viewModel.pitch += 1.0;
        //     viewModel.roll += 1.0;
        //   }
        // });
      }

      // * fireworks
      {
        // let scene = window.viewer.scene;
        // let modelMatrix = this.Cesium.Transforms.eastNorthUpToFixedFrame(
        //   this.Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883)
        // );
        // let emitterInitialLocation = new this.Cesium.Cartesian3(0.0, 0.0, 100.0);
        // let particleCanvas;
        // // * 创建粒子
        // let getImage = () => {
        //   if (!this.Cesium.defined(particleCanvas)) {
        //     particleCanvas = document.createElement("canvas");
        //     particleCanvas.width = 20;
        //     particleCanvas.height = 20;
        //     let context2D = particleCanvas.getContext("2d");
        //     context2D.beginPath();
        //     context2D.arc(8, 8, 8, 0, this.Cesium.Math.TWO_PI, true);
        //     context2D.closePath();
        //     context2D.fillStyle = "rgb(255, 255, 255)";
        //     context2D.fill();
        //   }
        //   return particleCanvas;
        // };
        // let minimumExplosionSize = 30.0;
        // let maximumExplosionSize = 100.0;
        // let particlePixelSize = new this.Cesium.Cartesian2(7.0, 7.0);
        // let burstSize = 400.0;
        // let lifetime = 10.0;
        // let numberOfFireworks = 20.0;
        // let emitterModelMatrixScratch = new this.Cesium.Matrix4();
        // // * 创建烟花
        // let createFireworks = (offset, color, bursts) => {
        //   // * 创建粒子发射器位置
        //   let position = this.Cesium.Cartesian3.add(
        //     emitterInitialLocation,
        //     offset,
        //     emitterModelMatrixScratch
        //   );
        //   let emitterModelMatrix = this.Cesium.Matrix4.fromTranslation(
        //     position,
        //     emitterModelMatrixScratch
        //   );
        //   let particleToWorld = this.Cesium.Matrix4.multiply(
        //     modelMatrix,
        //     emitterModelMatrix,
        //     new this.Cesium.Matrix4()
        //   );
        //   let worldToParticle = this.Cesium.Matrix4.inverseTransformation(
        //     particleToWorld,
        //     particleToWorld
        //   );
        //   let size = this.Cesium.Math.randomBetween(
        //     minimumExplosionSize,
        //     maximumExplosionSize
        //   );
        //   let particlePositionScratch = new this.Cesium.Cartesian3();
        //   let force = particle => {
        //     let position = this.Cesium.Matrix4.multiplyByPoint(
        //       worldToParticle,
        //       particle.position,
        //       particlePositionScratch
        //     );
        //     if (
        //       this.Cesium.Cartesian3.magnitudeSquared(position) >=
        //       size * size
        //     ) {
        //       this.Cesium.Cartesian3.clone(
        //         this.Cesium.Cartesian3.ZERO,
        //         particle.velocity
        //       );
        //     }
        //   };
        //   let normalSize =
        //     (size - minimumExplosionSize) /
        //     (maximumExplosionSize - minimumExplosionSize);
        //   let minLife = 0.3;
        //   let maxLife = 1.0;
        //   let life = normalSize * (maxLife - minLife) + minLife;
        //   scene.primitives.add(
        //     createParticleSystem({
        //       image: getImage(),
        //       startColor: color,
        //       endColor: color.withAlpha(0.0),
        //       particleLife: life,
        //       speed: 100.0,
        //       imageSize: particlePixelSize,
        //       emissionRate: 0,
        //       emitter: new this.Cesium.SphereEmitter(0.1),
        //       bursts: bursts,
        //       lifetime: lifetime,
        //       updateCallback: force,
        //       modelMatrix: modelMatrix,
        //       emitterModelMatrix: emitterModelMatrix
        //     })
        //   );
        // };
        // let xMin = -100.0;
        // let xMax = 100.0;
        // let yMin = -80.0;
        // let yMax = 100.0;
        // let zMin = -50.0;
        // let zMax = 50.0;
        // let colorOptions = [
        //   {
        //     minimumRed: 0.75,
        //     green: 0.0,
        //     minimumBlue: 0.8,
        //     alpha: 1.0
        //   },
        //   {
        //     red: 0.0,
        //     minimumGreen: 0.75,
        //     minimumBlue: 0.8,
        //     alpha: 1.0
        //   },
        //   {
        //     red: 0.0,
        //     green: 0.0,
        //     minimumBlue: 0.8,
        //     alpha: 1.0
        //   },
        //   {
        //     minimumRed: 0.75,
        //     minimumGreen: 0.75,
        //     blue: 0.0,
        //     alpha: 1.0
        //   }
        // ];
        // for (let i = 0; i < numberOfFireworks; ++i) {
        //   let x = this.Cesium.Math.randomBetween(xMin, xMax);
        //   let y = this.Cesium.Math.randomBetween(yMin, yMax);
        //   let z = this.Cesium.Math.randomBetween(zMin, zMax);
        //   let offset = new this.Cesium.Cartesian3(x, y, z);
        //   let color = this.Cesium.Color.fromRandom(
        //     colorOptions[i % colorOptions.length]
        //   );
        //   let bursts = [];
        //   for (let j = 0; j < 3; ++j) {
        //     bursts.push(
        //       new this.Cesium.ParticleBurst({
        //         time: this.Cesium.Math.nextRandomNumber() * lifetime,
        //         minimum: burstSize,
        //         maximum: burstSize
        //       })
        //     );
        //   }
        //   createFireworks(offset, color, bursts);
        // }
        // let cam = window.viewer.scene.camera;
        // let cameraOffset = new this.Cesium.Cartesian3(-300.0, 0.0, 0.0);
        // cam.lookAtTransform(modelMatrix, cameraOffset);
        // cam.lookAtTransform(this.Cesium.Matrix4.IDENTITY);
        // let toFireworks = this.Cesium.Cartesian3.subtract(
        //   emitterInitialLocation,
        //   cameraOffset,
        //   new this.Cesium.Cartesian3()
        // );
        // this.Cesium.Cartesian3.normalize(toFireworks, toFireworks);
        // let angle =
        //   this.Cesium.Math.PI_OVER_TWO -
        //   Math.acos(
        //     this.Cesium.Cartesian3.dot(toFireworks, this.Cesium.Cartesian3.UNIT_Z)
        //   );
        // cam.lookUp(angle);
      }

      // * weather snow
      {
        // let scene = window.viewer.scene;
        // scene.camera.setView({
        //   destination: new this.Cesium.Cartesian3(
        //     277096.634865404,
        //     5647834.481964232,
        //     2985563.7039122293
        //   ),
        //   orientation: {
        //     heading: 4.731089976107251,
        //     pitch: -0.32003481981370063
        //   }
        // });
        // // * 雪
        // let snowParticleSize = 12.0;
        // let snowRadius = 100000.0;
        // let minimumSnowImageSize = new this.Cesium.Cartesian2(
        //   snowParticleSize,
        //   snowParticleSize
        // );
        // let maximumSnowImageSize = new this.Cesium.Cartesian2(
        //   snowParticleSize * 2.0,
        //   snowParticleSize * 2.0
        // );
        // let snowGravityScratch = new this.Cesium.Cartesian3();
        // let snowSystem;
        // let snowUpdate = particle => {
        //   snowGravityScratch = this.Cesium.Cartesian3.normalize(
        //     particle.position,
        //     snowGravityScratch
        //   );
        //   this.Cesium.Cartesian3.multiplyByScalar(
        //     snowGravityScratch,
        //     this.Cesium.Math.randomBetween(-30.0, -300.0),
        //     snowGravityScratch
        //   );
        //   particle.velocity = this.Cesium.Cartesian3.add(
        //     particle.velocity,
        //     snowGravityScratch,
        //     particle.velocity
        //   );
        //   let distance = this.Cesium.Cartesian3.distance(
        //     scene.camera.position,
        //     particle.position
        //   );
        //   if (distance > snowRadius) {
        //     particle.endColor.alpha = 0.0;
        //   } else {
        //     particle.endColor.alpha =
        //       snowSystem.endColor.alpha / (distance / snowRadius + 0.1);
        //   }
        // };
        // snowSystem = createParticleSystem({
        //   modelMatrix: new this.Cesium.Matrix4.fromTranslation(
        //     scene.camera.position
        //   ),
        //   minimumSpeed: -1.0,
        //   maximumSpeed: 0.0,
        //   lifetime: 15.0,
        //   emitter: new this.Cesium.SphereEmitter(snowRadius),
        //   startScale: 0.5,
        //   endScale: 1.0,
        //   image: "http://localhost:8091/SampleData/snowflake_particle.png",
        //   emissionRate: 7000.0,
        //   startColor: this.Cesium.Color.WHITE.withAlpha(0.0),
        //   endColor: this.Cesium.Color.WHITE.withAlpha(1.0),
        //   minimumImageSize: minimumSnowImageSize,
        //   maximumImageSize: maximumSnowImageSize,
        //   updateCallback: snowUpdate
        // });
        // scene.primitives.add(snowSystem);
      }

      // * weather rain
      {
        // let scene = window.viewer.scene;
        // scene.camera.setView({
        //   destination: new this.Cesium.Cartesian3(
        //     277096.634865404,
        //     5647834.481964232,
        //     2985563.7039122293
        //   ),
        //   orientation: {
        //     heading: 4.731089976107251,
        //     pitch: -0.32003481981370063
        //   }
        // });
        // // * 雨
        // let rainParticleSize = 15.0;
        // let rainRadius = 100000.0;
        // let rainImageSize = new this.Cesium.Cartesian2(
        //   rainParticleSize,
        //   rainParticleSize * 2.0
        // );
        // let rainGravityScratch = new this.Cesium.Cartesian3();
        // let rainSystem;
        // let rainUpdate = particle => {
        //   rainGravityScratch = this.Cesium.Cartesian3.normalize(
        //     particle.position,
        //     rainGravityScratch
        //   );
        //   this.Cesium.Cartesian3.multiplyByScalar(
        //     rainGravityScratch,
        //     -1050.0,
        //     rainGravityScratch
        //   );
        //   particle.velocity = this.Cesium.Cartesian3.add(
        //     particle.velocity,
        //     rainGravityScratch,
        //     particle.velocity
        //   );
        //   let distance = this.Cesium.Cartesian3.distance(
        //     scene.camera.position,
        //     particle.position
        //   );
        //   if (distance > rainRadius) {
        //     particle.endColor.alpha = 0.0;
        //   } else {
        //     particle.endColor.alpha =
        //       rainSystem.endColor.alpha / (distance / rainRadius + 0.1);
        //   }
        // };
        // rainSystem = createParticleSystem({
        //   modelMatrix: new this.Cesium.Matrix4.fromTranslation(
        //     scene.camera.position
        //   ),
        //   minimumSpeed: -1.0,
        //   maximumSpeed: 0.0,
        //   lifetime: 15.0,
        //   emitter: new this.Cesium.SphereEmitter(rainRadius),
        //   startScale: 1.0,
        //   endScale: 0.0,
        //   image: "http://localhost:8091/SampleData/circular_particle.png",
        //   emissionRate: 7000.0,
        //   startColor: new this.Cesium.Color(0.27, 0.5, 0.7, 0.0),
        //   endColor: new this.Cesium.Color(0.27, 0.5, 0.7, 0.98),
        //   imageSize: rainImageSize,
        //   updateCallback: rainUpdate
        // });
        // scene.primitives.add(rainSystem);
      }
    }

    // ? cesiumWallBillboard
    {
      // let cesiumWallBillboard = new this.Cesium.CesiumWallBillboard({
      //   viewer: window.viewer,
      //   center: {
      //     // 广告牌中心点
      //     longitude: 118.05741,
      //     latitude: 24.630362,
      //     height: 80
      //   },
      //   width: 150, // 广告牌宽度
      //   height: 50, // 广告牌高度
      //   rotate: 180, // 正北顺时针角度
      //   content: `
      //       <style>
      //           .border-box{padding: 5px;width:calc(100% - 14px);height:calc(100% - 14px);background: rgba(1, 19, 67, 0.4);border: 2px solid rgb(0, 161, 255);border-radius: 8px;font-size: 12px;color: white;}
      //           .border-box::before {position: absolute;top: -2px;bottom: -2px;left: 2px;width: calc(100% - 4px);content: "";border-top: 2px solid rgb(1, 104, 134);border-bottom: 2px solid rgb(1, 104, 134);z-index: 0;}
      //           .border-box::after {position: absolute;top: 2px;right: -2px;left: -2px;height: calc(100% - 4px);content: "";border-right: 2px solid rgb(1, 104, 134);border-left: 2px solid rgb(1, 104, 134);z-index: 0;}
      //       </style>
      //       <div class="border-box">
      //       <div>"BSM":"370100000000091188",</div>
      //       <div>"CG":"3",</div>
      //       <div>"CODE":"370100",</div>
      //       <div>"CS":"15",</div>
      //       <div>"LG":"45",</div>
      //       <div>"NAME":"楼房91188",</div>
      //       <div>"UID":"bc2e4443-2fbb-11ea-9cec-380025e8e3aa",</div>
      //       <div>"id":"91188"</div>
      //   </div>`
      // });
      // setInterval(() => {
      //   window.viewer.entities.remove(cesiumWallBillboard._entities);
      // }, 400000);
    }

    // ? infoBox 随地球移动的信息窗口
    // popFun(new this.Cesium.Cartesian3(-1076075, 5245631, 3453356));

    // ? 贴地面积测量
    // startDrawGroundPolygon();

    // ? 贴地线测量
    // MeasureStickDis();

    // ? 平面线测量
    // planeLength();

    // ? 平面面积测量
    // planeArea();

    // ? 可视域分析
    {
      // let primitive = createPrimitve("3dTile", {
      //   url: "http://localhost:8091/cz/tileset.json"
      // });
      // let pri = window.viewer.scene.primitives.add(primitive);
      // window.viewer.zoomTo(pri);
      // window.viewer.scene.globe.depthTestAgainstTerrain = true;
      // window.viewer.scene.globe.enableLighting = true;
      // let drawHandler = new this.Cesium.ScreenSpaceEventHandler(
      //   window.viewer.scene.canvas
      // );
      // // * 监测鼠标左击事件
      // drawHandler.setInputAction(event => {
      //   let position = event.position;
      //   if (!this.Cesium.defined(position)) return;
      //   let ray = window.viewer.camera.getPickRay(position);
      //   if (!this.Cesium.defined(ray)) return;
      //   let cartesian = window.viewer.scene.globe.pick(
      //     ray,
      //     window.viewer.scene
      //   );
      //   if (!this.Cesium.defined(cartesian)) return;
      //   new ViewShedStage(window.viewer, {
      //     viewPosition: cartesian,
      //     viewDistance: 1000
      //   });
      // }, this.Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    // ? 淹没分析
    {
      // window.viewer.scene.globe.depthTestAgainstTerrain = true;
      // let obj = new SubmergenceAnalysis(
      //   window.viewer,
      //   3800,
      //   1000,
      //   1,
      //   [
      //     112.419718,
      //     37.927023,
      //     112.442443,
      //     37.916786,
      //     112.435592,
      //     37.904635,
      //     112.411082,
      //     37.915696
      //   ],
      //   0.05
      // );
      // obj.start();
    }

    // ? 热力图
    {
      // let bounds = {
      //   west: 112.419718,
      //   east: 112.442443,
      //   south: 37.916786,
      //   north: 37.947023
      // };
      // let data = [
      //   { x: 112.4383442264, y: 37.9360048372, value: 76 },
      //   { x: 112.4384363011, y: 37.9360298848, value: 63 },
      //   { x: 112.438368102, y: 37.9358360603, value: 1 },
      //   { x: 112.4385627739, y: 37.9358799123, value: 21 },
      //   { x: 112.4385138501, y: 37.9359327669, value: 28 },
      //   { x: 112.4385031219, y: 37.9359730105, value: 41 },
      //   { x: 112.4384127393, y: 37.935928255, value: 75 },
      //   { x: 112.4384551136, y: 37.9359450132, value: 3 },
      //   { x: 112.4384927196, y: 37.9359158649, value: 45 },
      //   { x: 112.4384938639, y: 37.9358498311, value: 45 },
      //   { x: 112.4385183299, y: 37.9360213794, value: 93 },
      //   { x: 112.4384007925, y: 37.9359860133, value: 46 },
      //   { x: 112.4383604844, y: 37.9358298672, value: 54 },
      //   { x: 112.43851025, y: 37.9359098303, value: 39 },
      //   { x: 112.4383874733, y: 37.9358511035, value: 34 },
      //   { x: 112.4384981796, y: 37.9359355403, value: 81 },
      //   { x: 112.4384504107, y: 37.9360332348, value: 39 },
      //   { x: 112.4385582664, y: 37.9359788335, value: 20 },
      //   { x: 112.4383967364, y: 37.9360581999, value: 35 },
      //   { x: 112.4383839615, y: 37.936016316, value: 47 },
      //   { x: 112.4384082712, y: 37.9358423338, value: 36 },
      //   { x: 112.4385092651, y: 37.9358577623, value: 69 },
      //   { x: 112.438360356, y: 37.936046789, value: 90 },
      //   { x: 112.438471893, y: 37.9359184292, value: 88 },
      //   { x: 112.4385605689, y: 37.9360271359, value: 81 },
      //   { x: 112.4383585714, y: 37.9359362476, value: 32 },
      //   { x: 112.4384939114, y: 37.9358844253, value: 67 },
      //   { x: 112.438466724, y: 37.936019121, value: 17 },
      //   { x: 112.4385504355, y: 37.9360614056, value: 49 },
      //   { x: 112.4383883832, y: 37.9358733544, value: 82 },
      //   { x: 112.4385670669, y: 37.9359650236, value: 25 },
      //   { x: 112.4383416534, y: 37.9359310876, value: 82 },
      //   { x: 112.438525285, y: 37.9359394661, value: 66 },
      //   { x: 112.4385487719, y: 37.9360137656, value: 73 },
      //   { x: 112.4385496029, y: 37.9359187277, value: 73 },
      //   { x: 112.4383989222, y: 37.9358556562, value: 61 },
      //   { x: 112.4385499424, y: 37.9359149305, value: 67 },
      //   { x: 112.438404523, y: 37.9359563326, value: 90 },
      //   { x: 112.4383883675, y: 37.9359794855, value: 78 },
      //   { x: 112.4383967187, y: 37.935891185, value: 15 },
      //   { x: 112.4384610005, y: 37.9359044797, value: 15 },
      //   { x: 112.4384688489, y: 37.9360396127, value: 91 },
      //   { x: 112.4384431875, y: 37.9360684409, value: 8 },
      //   { x: 112.4385411067, y: 37.9360645847, value: 42 },
      //   { x: 112.4385237178, y: 37.9358843181, value: 31 },
      //   { x: 112.4384406464, y: 37.9360003831, value: 51 },
      //   { x: 112.4384679169, y: 37.9359950456, value: 96 },
      //   { x: 112.4384194314, y: 37.9358419739, value: 22 },
      //   { x: 112.4385049792, y: 37.9359574813, value: 44 },
      //   { x: 112.4384097378, y: 37.9358598672, value: 82 },
      //   { x: 112.4384993219, y: 37.9360352975, value: 84 },
      //   { x: 112.4383640499, y: 37.9359839518, value: 81 }
      // ];
      // let options = {
      //   bounds: bounds,
      //   data: {
      //     max: 100,
      //     min: 0,
      //     points: data
      //   },
      //   heatmapOptions: {
      //     radius: 50,
      //     maxOpacity: 0.5,
      //     minOpacity: 0,
      //     blur: 0.75
      //   }
      // };
      // let instance = new this.Cesium.HeatmapImageryProvider(options);
      // window.viewer.scene.imageryLayers.addImageryProvider(instance);
    }

    // ? 视频投影
    {
      // this.$nextTick(() => {
      //   let rectangle = VideoOn(113, 23.1, 113.1, 23.2);
      //   window.viewer.trackedEntity = rectangle;
      // });
    }

    // ? 通视分析
    {
      // VisibilityAnalysis();
    }

    // ? 动态水纹
    {
      // let River1Point = [
      //   115.5985634205044,
      //   32.43079913513041,
      //   116.5985634205044,
      //   32.43079913513041,
      //   116.5985634205044,
      //   33.43079913513041,
      //   115.5985634205044,
      //   33.43079913513041
      // ];
      // //河道1多边形
      // var polygon1 = new this.Cesium.PolygonGeometry({
      //   polygonHierarchy: new this.Cesium.PolygonHierarchy(
      //     this.Cesium.Cartesian3.fromDegreesArray(River1Point)
      //   ),
      //   extrudedHeight: 0,
      //   height: 0,
      //   vertexFormat: this.Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
      // });
      // var River1 = new this.Cesium.GroundPrimitive({
      //   geometryInstances: new this.Cesium.GeometryInstance({
      //     geometry: polygon1
      //   }),
      //   appearance: new this.Cesium.EllipsoidSurfaceAppearance({
      //     aboveGround: true
      //   }),
      //   show: true
      // });
      // var River1_Material = new this.Cesium.Material({
      //   fabric: {
      //     type: "Water",
      //     uniforms: {
      //       normalMap: require("@/assets/waterNormals.jpg"),
      //       frequency: 100.0,
      //       animationSpeed: 0.01,
      //       amplitude: 10.0
      //     }
      //   }
      // });
      // var scene = window.viewer.scene;
      // River1.appearance.material = River1_Material;
      // scene.primitives.add(River1); //添加到场景
    }
  }
};
</script>
<style scoped>
/* .infoBox {
  position: fixed;
  background: yellowgreen;
  width: 50px;
  height: 50px;
  z-index: 1000;
}
.infoBox::after {
  content: "";
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: yellowgreen;
  position: absolute;
  left: 16px; 
  top: 100%; 
}
*/
</style>
