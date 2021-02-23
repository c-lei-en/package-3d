const Cesium = require("cesium/Cesium");

function primitive(type, options = {}) {
  let geometry = null,
    instance = null;

  switch (type) {
    case "box":
      geometry = Cesium.BoxGeometry.fromDimensions({
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
        dimensions: new Cesium.Cartesian3(
          options.dimensions[0],
          options.dimensions[1],
          options.dimensions[2]
        )
      });
      instance = new Cesium.GeometryInstance({
        geometry: geometry,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(
          Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(
              options.modelMatrix[0],
              options.modelMatrix[1]
            )
          ),
          new Cesium.Cartesian3(0.0, 0.0, 0),
          new Cesium.Matrix4()
        ),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.RED.withAlpha(0.5)
          )
        },
        id: options.id || "box"
      });
      break;
    case "boxOutline":
      geometry = Cesium.BoxOutlineGeometry.fromDimensions({
        dimensions: new Cesium.Cartesian3(
          options.dimensions[0],
          options.dimensions[1],
          options.dimensions[2]
        )
      });
      instance = new Cesium.GeometryInstance({
        geometry: geometry,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(
          Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(
              options.modelMatrix[0],
              options.modelMatrix[1]
            )
          ),
          new Cesium.Cartesian3(0.0, 0.0, 0),
          new Cesium.Matrix4()
        ),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.YELLOW
          )
        },
        id: options.id || "boxoutline"
      });
      break;
    case "circle":
      geometry = Cesium.CircleGeometry.createGeometry(
        new Cesium.CircleGeometry({
          center: Cesium.Cartesian3.fromDegrees(
            options.center[0],
            options.center[1]
          ),
          radius: options.radius
        })
      );
      instance = new Cesium.GeometryInstance({
        geometry: geometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.YELLOW
          )
        },
        id: options.id || "circle"
      });
      break;
    case "circleOutline":
      geometry = Cesium.CircleOutlineGeometry.createGeometry(
        new Cesium.CircleOutlineGeometry({
          center: Cesium.Cartesian3.fromDegrees(
            options.center[0],
            options.center[1]
          ),
          radius: options.radius
        })
      );
      instance = new Cesium.GeometryInstance({
        geometry: geometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.YELLOW
          )
        },
        id: options.id || "circleoutline"
      });
      break;
    case "coplanarPolygon":
      geometry = Cesium.CoplanarPolygonGeometry.createGeometry(
        new Cesium.CoplanarPolygonGeometry({
          polygonHierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArrayHeights(options.polygonHierarchy)
          )
        })
      );
      instance = new Cesium.GeometryInstance({
        geometry: geometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.YELLOW
          )
        },
        id: options.id || "coplanarPolygon"
      });
      break;
    case "coplanarPolygonOutline":
      geometry = Cesium.CoplanarPolygonOutlineGeometry.createGeometry(
        new Cesium.CoplanarPolygonOutlineGeometry({
          polygonHierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArrayHeights(options.polygonHierarchy)
          )
        })
      );
      instance = new Cesium.GeometryInstance({
        geometry: geometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.YELLOW
          )
        },
        id: options.id || "coplanarPolygonOutline"
      });
      break;
    case "corridor":
      geometry = Cesium.CorridorGeometry.createGeometry(
        new Cesium.CorridorGeometry({
          vertexFormat:
            options.vertexFormat || Cesium.VertexFormat.POSITION_ONLY,
          positions: Cesium.Cartesian3.fromDegreesArray(options.positions),
          width: options.width,
          extrudedHeight: options.extrudedHeight || 0
        })
      );
      instance = new Cesium.GeometryInstance({
        geometry: geometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.YELLOW
          )
        },
        id: options.id || "corridor"
      });
      break;
    case "corridorOutline":
      geometry = Cesium.CorridorOutlineGeometry.createGeometry(
        new Cesium.CorridorOutlineGeometry({
          positions: Cesium.Cartesian3.fromDegreesArray(options.positions),
          width: options.width,
          extrudedHeight: options.extrudedHeight || 0
        })
      );
      instance = new Cesium.GeometryInstance({
        geometry: geometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.YELLOW
          )
        },
        id: options.id || "corridorOutline"
      });
      break;
    case "cylinder":
      geometry = Cesium.CylinderGeometry.createGeometry(
        new Cesium.CylinderGeometry({
          length: options.length,
          topRadius: options.topRadius,
          bottomRadius: options.bottomRadius
        })
      );
      instance = new Cesium.GeometryInstance({
        geometry: geometry,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(
          Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(
              options.modelMatrix[0],
              options.modelMatrix[1]
            )
          ),
          new Cesium.Cartesian3(0.0, 0.0, 0),
          new Cesium.Matrix4()
        ),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.YELLOW
          )
        },
        id: options.id || "cylinder"
      });
      break;
    case "cylinderOutline":
      geometry = Cesium.CylinderOutlineGeometry.createGeometry(
        new Cesium.CylinderOutlineGeometry({
          length: options.length,
          topRadius: options.topRadius,
          bottomRadius: options.bottomRadius
        })
      );
      instance = new Cesium.GeometryInstance({
        geometry: geometry,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(
          Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(
              options.modelMatrix[0],
              options.modelMatrix[1]
            )
          ),
          new Cesium.Cartesian3(0.0, 0.0, 0),
          new Cesium.Matrix4()
        ),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.YELLOW
          )
        },
        id: options.id || "cylinderOutline"
      });
      break;
    case "ellipse":
      geometry = Cesium.EllipseGeometry.createGeometry(
        new Cesium.EllipseGeometry({
          center: Cesium.Cartesian3.fromDegrees(
            options.center[0],
            options.center[1]
          ),
          semiMajorAxis: options.semiMajorAxis,
          semiMinorAxis: options.semiMinorAxis,
          extrudedHeight: options.extrudedHeight || 0
        })
      );
      instance = new Cesium.GeometryInstance({
        geometry: geometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.YELLOW
          )
        },
        id: options.id || "ellipse"
      });
      break;
    case "ellipseOutline":
      geometry = Cesium.EllipseOutlineGeometry.createGeometry(
        new Cesium.EllipseOutlineGeometry({
          center: Cesium.Cartesian3.fromDegrees(
            options.center[0],
            options.center[1]
          ),
          semiMajorAxis: options.semiMajorAxis,
          semiMinorAxis: options.semiMinorAxis,
          extrudedHeight: options.extrudedHeight || 0
        })
      );
      instance = new Cesium.GeometryInstance({
        geometry: geometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.YELLOW
          )
        },
        id: options.id || "ellipseOutline"
      });
      break;
    case "ellipsoid":
      geometry = Cesium.EllipsoidGeometry.createGeometry(
        new Cesium.EllipsoidGeometry({
          vertexFormat:
            options.vertexFormat || Cesium.VertexFormat.POSITION_ONLY,
          radii: new Cesium.Cartesian3(
            options.radii[0],
            options.radii[1],
            options.radii[2]
          )
        })
      );
      instance = new Cesium.GeometryInstance({
        geometry: geometry,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(
          Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(
              options.modelMatrix[0],
              options.modelMatrix[1]
            )
          ),
          new Cesium.Cartesian3(0.0, 0.0, 0),
          new Cesium.Matrix4()
        ),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.YELLOW
          )
        },
        id: options.id || "ellipsoid"
      });
      break;
    case "ellipsoidOutline":
      geometry = Cesium.EllipsoidOutlineGeometry.createGeometry(
        new Cesium.EllipsoidOutlineGeometry({
          vertexFormat:
            options.vertexFormat || Cesium.VertexFormat.POSITION_ONLY,
          radii: new Cesium.Cartesian3(
            options.radii[0],
            options.radii[1],
            options.radii[2]
          )
        })
      );
      instance = new Cesium.GeometryInstance({
        geometry: geometry,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(
          Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(
              options.modelMatrix[0],
              options.modelMatrix[1]
            )
          ),
          new Cesium.Cartesian3(0.0, 0.0, 0),
          new Cesium.Matrix4()
        ),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.YELLOW
          )
        },
        id: options.id || "ellipsoidOutline"
      });
      break;
    case "frustum":
      geometry = Cesium.FrustumGeometry.createGeometry(
        new Cesium.FrustumGeometry({
          frustum: new Cesium.PerspectiveFrustum({
            fov: Cesium.Math.PI_OVER_THREE,
            aspectRatio:
              window.viewer.scene.canvas.clientWidth /
              window.viewer.scene.canvas.clientHeight,
            near: 10000.0,
            far: 1000000.0
          }),
          origin: Cesium.Cartesian3.fromDegrees(
            options.origin[0],
            options.origin[1]
          ),
          orientation: Cesium.Quaternion.fromAxisAngle(
            Cesium.Cartesian3.fromDegrees(options.origin[0], options.origin[1]),
            45.0
          ),
          vertexFormat: Cesium.VertexFormat.POSITION_ONLY
        })
      );
      instance = new Cesium.GeometryInstance({
        geometry: geometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.YELLOW
          )
        },
        id: options.id || "frustum"
      });
      break;
    case "frustumOutline":
      geometry = Cesium.FrustumOutlineGeometry.createGeometry(
        new Cesium.FrustumOutlineGeometry({
          frustum: new Cesium.PerspectiveFrustum({
            fov: Cesium.Math.PI_OVER_THREE,
            aspectRatio:
              window.viewer.scene.canvas.clientWidth /
              window.viewer.scene.canvas.clientHeight,
            near: 10000.0,
            far: 1000000.0
          }),
          origin: Cesium.Cartesian3.fromDegrees(
            options.origin[0],
            options.origin[1]
          ),
          orientation: Cesium.Quaternion.fromAxisAngle(
            Cesium.Cartesian3.fromDegrees(options.origin[0], options.origin[1]),
            45.0
          )
        })
      );
      instance = new Cesium.GeometryInstance({
        geometry: geometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.YELLOW
          )
        },
        id: options.id || "frustumOutline"
      });
      break;
    case "plane":
      geometry = Cesium.EllipsoidOutlineGeometry.createGeometry(
        new Cesium.EllipsoidOutlineGeometry({
          vertexFormat:
            options.vertexFormat || Cesium.VertexFormat.POSITION_ONLY,
          radii: new Cesium.Cartesian3(
            options.radii[0],
            options.radii[1],
            options.radii[2]
          )
        })
      );
      instance = new Cesium.GeometryInstance({
        geometry: geometry,
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(
          Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(
              options.modelMatrix[0],
              options.modelMatrix[1]
            )
          ),
          new Cesium.Cartesian3(0.0, 0.0, 0),
          new Cesium.Matrix4()
        ),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.YELLOW
          )
        },
        id: options.id || "plane"
      });
      break;
    default:
      break;
  }
  return instance;
}

export default primitive;
