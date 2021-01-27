<template>
  <div id="cesiumContainer" style="width:100%;height:100%"></div>
</template>

<script>
import createImageryProvider from "@/mapconfig/addlayer/createImageryProvider";
import addTerrain from "@/mapconfig/addTerrain/addTerrain";
import Camera from "@/mapconfig/camera/camera";
export default {
  name: "Home",
  mounted() {
    window.viewer = new this.Cesium.Viewer("cesiumContainer", {
      animation: false, // * 左下角圆盘 速度控制器
      shouldAnimate: false, // * 当动画控件出现，用来控制是否通过旋转控件，旋转场景
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
      imageryProvider: createImageryProvider("osm"),
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
    camera.setView([-117.16, 32.71, 10000000.0], {
      heading: 0,
      pitch: -90,
      roll: 0
    });
    // camera.cameraControl();
    camera.flyTo({
      destination: [-117.16, 32.71, 15000.0],
      orientation: {
        heading: 175.0,
        pitch: -35.0,
        roll: 0.0
      }
    });
  }
};
</script>
