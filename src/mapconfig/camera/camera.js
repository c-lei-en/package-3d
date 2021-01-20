const Cesium = require("cesium/Cesium");

/**
 * ! cesium中的笛卡尔坐标系介绍
 * ! x轴垂直屏幕向外
 * ! y轴向东
 * ! z轴向北
 * ! 坐标原点为地球集合中心
 */

class Camera {
  constructor() {
    this.camera = window.viewer.scene.camera;
  }
  /**
   * @description: 为相机设置位置和角度
   * @param {*} destination 设置相机的位置需要以数组的形式提供,可分别提供迪卡尔坐标[经度,维度,高度],如[-117.16, 32.71, 15000.0]或者矩形的西,南,东,北坐标的最大值如[-100.0, 20.0, -90.0, 30.0]
   * @param {*} orientation 设置相机的方向,{ heading: 90.0, pitch:-90, roll: 0.0 },heading表示绕Z轴旋转,沿-Z方向为正值;pitch表示绕y轴旋转,沿-Y方向为正值;roll表示绕x轴旋转,沿+X为正值
   * @param {*} convert 是否将目的地从世界坐标转换为场景坐标(仅在不使用3D时相关)
   */
  setView(
    destination = [0, 0, 0],
    orientation = {
      heading: 90.0, // east, default value is 0.0 (north)
      pitch: -90, // default value (looking down)
      roll: 0.0 // default value
    },
    convert = true
  ) {
    this.camera.setView({
      destination:
        destination.length === 3
          ? Cesium.Cartesian3.fromDegrees(
              destination[0],
              destination[1],
              destination[2]
            )
          : Cesium.Rectangle.fromDegrees(
              destination[0],
              destination[1],
              destination[2],
              destination[3]
            ),
      orientation: {
        heading: Cesium.Math.toRadians(orientation.heading),
        pitch: Cesium.Math.toRadians(orientation.pitch),
        roll: Cesium.Math.toRadians(orientation.roll)
      },
      convert: convert
    });
  }
}

export default Camera;
