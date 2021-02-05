const Cesium = require("cesium/Cesium");

function entity(type, options = {}) {
  let entity = null;
  switch (type) {
    case "polygon":
      entity = {
        name: options.name || "示例",
        polygon: {
          show: options.show || true,
          hierarchy: Cesium.Cartesian3.fromDegreesArray(options.hierarchy), // * polygon坐标
          height: options.height || 0, // * 离地面高度
          extrudedHeight: options.extrudedHeight || 0, // * 这一项与height的差为物体本身的高度
          stRotation: options.stRotation || 0.0, // * 纹理沿正北逆时钟方向旋转角度
          fill: options.fill || true, // * 是否填充
          material: options.material, // * 材质
          outline: options.outline || true, // * 边框
          outlineColor: options.outlineColor || Cesium.Color.BLACK, // * 边框颜色
          outlineWidth: options.outlineWidth || 1.0, // *边框宽度 只适用于非Windows系统
          classificationType:
            options.classificationType || Cesium.ClassificationType.BOTH // * 多边形对地形和3Dtile进行区分
        }
      };
      break;
    case "point":
      entity = {
        name: options.name || "示例",
        position: Cesium.Cartesian3.fromDegrees(
          options.position[0],
          options.position[1]
        ),
        point: {
          show: options.show || true,
          pixelSize: options.pixelSize || 1, // * 大小
          heightReference:
            options.heightReference || Cesium.HeightReference.NONE, // * 高度相对于什么
          color: options.color || Cesium.Color.WHITE, // * 这一项与height的差为物体本身的高度
          outlineColor: options.outlineColor || Cesium.Color.BLACK, // * 边框颜色
          outlineWidth: options.outlineWidth || 0 // *边框宽度
        }
      };
      break;
    case "polyline":
      entity = {
        name: options.name || "示例",
        polyline: {
          show: options.show || true,
          positions: Cesium.Cartesian3.fromDegreesArray(
            options.positions || [-77, 35, -77.1, 35]
          ),
          width: options.width || 1.0,
          material: options.material, // * 材质
          depthFailMaterial: options.depthFailMaterial, // * 线条位于地形下方时的材质,entity中失效,在Primitive中有效
          clampToGround: options.clampToGround || false, // * 是否依附在地形上面
          classificationType:
            options.classificationType || Cesium.ClassificationType.BOTH, // * 对地形和3Dtile进行区分
          zIndex: options.zIndex || 0
        }
      };
      break;
    case "billboard":
      entity = {
        name: options.name || "示例",
        position: Cesium.Cartesian3.fromDegrees(
          options.position[0],
          options.position[1]
        ),
        billboard: {
          show: options.show || true,
          image: options.image,
          scale: options.scale || 1.0,
          pixelOffset: options.pixelOffset || new Cesium.Cartesian2(0, 0), // * 偏移量
          eyeOffset: options.eyeOffset || new Cesium.Cartesian3(0.0, 0.0, 0.0), // * eyeoffset能够基于viewer来移动label或billboard的渲染位置。x为正移动到viewer的右边，y为正向上移动，z为正就移动到屏幕里面
          horizontalOrigin:
            options.horizontalOrigin || Cesium.HorizontalOrigin.CENTER, // * 标签的左右位置
          verticalOrigin:
            options.verticalOrigin || Cesium.VerticalOrigin.CENTER, // * 标签的垂直位置
          color: options.color || Cesium.Color.WHITE, // * 图像的色调颜色
          rotation: options.rotation || 0, // * 绕轴旋转
          alignedAxis: options.alignedAxis || Cesium.Cartesian3(0, 0, 0), // * 指定旋转轴
          sizeInMeters: options.sizeInMeters, // * 指定坐标轴是否以米来衡量
          width: options.width, // * 以像素为单位指定公告牌的宽度
          height: options.height // * 以像素为单位指定公告牌的高度
        }
      };
      break;
    case "box":
      entity = {
        name: options.name || "示例",
        position: Cesium.Cartesian3.fromDegrees(
          options.position[0],
          options.position[1]
        ),
        box: {
          show: options.show || true,
          dimensions: new Cesium.Cartesian3(
            options.dimensions[0],
            options.dimensions[1],
            options.dimensions[2]
          ), // * 长宽高
          fill: options.fill || true,
          material: options.material || Cesium.Color.WHITE,
          outline: options.outline || false,
          outlineColor: options.outlineColor || Cesium.Color.BLACK,
          outlineWidth: options.outlineWidth || 1.0
        }
      };
      break;
    case "corridor":
      entity = {
        name: options.name || "示例",
        corridor: {
          show: options.show || true,
          positions: new Cesium.Cartesian3.fromDegreesArray(options.position),
          height: options.height,
          width: options.width,
          extrudedHeight: options.extrudedHeight, // * 物体本身的高度
          cornerType: options.cornerType || Cesium.CornerType.ROUNDED, // * 拐角样式
          fill: options.fill || true,
          material: options.material || Cesium.Color.WHITE,
          outline: options.outline || false,
          outlineColor: options.outlineColor || Cesium.Color.BLACK,
          outlineWidth: options.outlineWidth || 1.0,
          classificationType:
            options.classificationType || Cesium.ClassificationType.BOTH,
          zIndex: options.zIndex || 0
        }
      };
      break;
    case "cylinder":
      entity = {
        name: options.name || "示例",
        position: Cesium.Cartesian3.fromDegrees(
          options.position[0],
          options.position[1],
          options.position[2]
        ),
        cylinder: {
          show: options.show || true,
          length: options.length,
          topRadius: options.topRadius, // * 圆柱体顶部半径
          bottomRadius: options.bottomRadius, // * 圆柱体底部半径
          fill: options.fill || true,
          material: options.material || Cesium.Color.WHITE,
          outline: options.outline || false,
          outlineColor: options.outlineColor || Cesium.Color.BLACK,
          outlineWidth: options.outlineWidth || 1.0
        }
      };
      break;
    case "ellipse":
      entity = {
        name: options.name || "示例",
        position: Cesium.Cartesian3.fromDegrees(
          options.position[0],
          options.position[1]
        ),
        ellipse: {
          show: options.show || true,
          semiMajorAxis: options.semiMajorAxis, // * 长半轴
          semiMinorAxis: options.semiMinorAxis, // * 短半轴
          height: options.height || 0,
          extrudedHeight: options.extrudedHeight, // * 物体本身的高度
          rotation: options.rotation || 0, // * 绕轴旋转 北方逆时针
          stRotation: options.stRotation || 0, // *纹理绕轴旋转 北方逆时针
          fill: options.fill || true,
          material: options.material || Cesium.Color.WHITE,
          outline: options.outline || false,
          outlineColor: options.outlineColor || Cesium.Color.BLACK,
          outlineWidth: options.outlineWidth || 1.0,
          classificationType:
            options.classificationType || Cesium.ClassificationType.BOTH,
          zIndex: options.zIndex || 0
        }
      };
      break;
    default:
      break;
  }
  return entity;
}

export default entity;
