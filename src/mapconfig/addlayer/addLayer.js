const Cesium = require("cesium/Cesium");

/**
 * @description: 创建一个指定类型的图层并返回
 * @param {*} type 要创建的图层的类型
 * @param {*} url 地图的地址
 * @param {*} options 图层的配置项
 * @return {*} 返回一个创建好的指定类型的图层
 */
function addLayer(type, url, options) {
  let layer = null;
  switch (type) {
    case "arcgis":
      layer = new Cesium.ArcGisMapServerImageryProvider({
        url: url
      });
      break;
    case "bing":
      if (!options.key) {
        throw new Error("使用bing地图必须传入options.key!");
      }
      layer = new Cesium.BingMapsImageryProvider({
        url: url,
        key: options.key,
        mapStyle: options.mapStyle
          ? Cesium.BingMapsStyle[options.mapStyle]
          : Cesium.BingMapsStyle.AERIAL_WITH_LABELS_ON_DEMAND
      });
      break;
    case "google": // * 提供对托管在Google Earth企业服务器上的数据的访问
      layer = new Cesium.GoogleEarthEnterpriseImageryProvider({
        metaData: new Cesium.GoogleEarthEnterpriseMetaData(url)
      });
      break;
    case "grid": // * 地图网格
      layer = new Cesium.GridImageryProvider();
      break;
    case "ion": // * 在网站 https://cesium.com/ion/ 注册一个账号;点击"Access Token"，跳转到Access Tokens page页面;选择Default默认的access token拷贝到contents中
      layer = new Cesium.IonImageryProvider({
        assetId: url
      });
      break;
    case "mapbox":
      if (!options.accessToken) {
        throw new Error("使用bing地图必须传入options.accessToken!");
      }
      layer = new Cesium.MapboxImageryProvider({
        mapId: `mapbox.${options.mapId}`,
        accessToken: options.accessToken
      });
      break;
    case "mapboxStyle":
      layer = new Cesium.MapboxStyleImageryProvider({
        styleId: options.styleId,
        accessToken: options.accessToken
      });
      break;
    case "osm":
      layer = new Cesium.OpenStreetMapImageryProvider({
        fileExtension: "png",
        url: "https://a.tile.openstreetmap.org/"
      });
      break;
    case "singleTile": // * 传入图片的url时要require require("@/assets/cat.jpg")
      layer = new Cesium.SingleTileImageryProvider({
        url: url,
        rectangle: options.rectangle
          ? Cesium.Rectangle(
              options.rectangle[0],
              options.rectangle[1],
              options.rectangle[2],
              options.rectangle[3]
            )
          : Cesium.Rectangle(0, 0, 0, 0)
      });
      break;
    case "tileCoordinates": // * 网格瓦片 包括网格瓦片等级、X、Y序号
      layer = new Cesium.TileCoordinatesImageryProvider();
      break;
    case "tileMapService": // * 访问瓦片图的Rest接口
      layer = new Cesium.TileMapServiceImageryProvider({
        url: url
      });
      break;
    case "urlTemplate": // * 通过使用指定的URL模板请求贴图来提供图像。通常用于加载拥有固定规范url的地图,如'xyz'方式的地图
      layer = new Cesium.UrlTemplateImageryProvider({
        url: url
      });
      break;
    case "wms": // * 适用于所有符合wms标准的地图
      layer = new Cesium.WebMapServiceImageryProvider({
        url: url,
        layers: options.layer,
        parameters: {
          transparent: true,
          format: "image/png"
        }
      });
      break;
    case "wmts": // * 适用于所有符合wmts标准的地图
      layer = new Cesium.WebMapTileServiceImageryProvider({
        url: url,
        layer: options.layer,
        style: options.style || "default",
        format: options.format,
        tileMatrixSetID: options.tileMatrixSetID,
        tileMatrixLabels: options.matrixIds,
        tilingScheme: options.tilingScheme
          ? new Cesium.GeographicTilingScheme({
              numberOfLevelZeroTilesX: options.tilingScheme[0],
              numberOfLevelZeroTilesY: options.tilingScheme[1]
            })
          : null,
        rectangle: options.rectangle
          ? Cesium.Rectangle(
              options.rectangle[0],
              options.rectangle[1],
              options.rectangle[2],
              options.rectangle[3]
            )
          : Cesium.Rectangle(-180, -90, 180, 90)
      });
      break;
    default:
      throw new Error("请选择正确的地图加载类型!");
  }
  return layer;
}

export default addLayer;
