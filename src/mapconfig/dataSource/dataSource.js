const Cesium = require("cesium/Cesium");

function dataSource(type, url, options = {}) {
  let dataSource = null;
  switch (type) {
    case "customDataSource":
      dataSource = new Cesium.CustomDataSource(url);
      break;
    case "kmlDataSource":
      dataSource = new Cesium.KmlDataSource.load(url, {
        camera: window.viewer.scene.camera,
        canvas: window.viewer.scene.canvas,
        clampToGround: options.clampToGround || false
      });
      break;
    default:
      break;
  }
  return dataSource;
}

export default dataSource;
