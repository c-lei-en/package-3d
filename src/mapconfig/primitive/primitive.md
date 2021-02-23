# primitive

## box

```js
let geometry = createPrimitve("box", {
  dimensions: [400000.0, 300000.0, 500000.0],
  modelMatrix: [-105.0, 45.0]
});

appearance: new this.Cesium.PerInstanceColorAppearance({
  flat: true,
  translucent: false
})
```

![box](./displayPrimitive/box.JPG)

## boxoutline

```js
let geometry = createPrimitve("boxOutline", {
  dimensions: [400000.0, 300000.0, 500000.0],
  modelMatrix: [-105.0, 45.0]
});

appearance: new this.Cesium.PerInstanceColorAppearance({
  flat: true,
  translucent: false,
  renderState: {
    lineWidth: Math.min(
      6.0,
      window.viewer.scene.maximumAliasedLineWidth
    )
  }
})
```

![boxoutline](./displayPrimitive/boxoutline.JPG)

## circle

```js
let geometry = createPrimitve("circle", {
  center: [-75.59777, 40.03883],
  radius: 100000.0
});

appearance: new this.Cesium.EllipsoidSurfaceAppearance({
  material: this.Cesium.Material.fromType("Stripe")
})
```

![circle](./displayPrimitive/circle.JPG)

## circleoutline

```js
let geometry = createPrimitve("circleOutline", {
  center: [-75.59777, 40.03883],
  radius: 100000.0
});

appearance: new this.Cesium.PerInstanceColorAppearance({
  flat: true,
  translucent: false,
  renderState: {
    lineWidth: Math.min(
      6.0,
      window.viewer.scene.maximumAliasedLineWidth
    )
  }
})
```

![circleoutline](./displayPrimitive/circleoutline.JPG)

## coplanarPolygon

```js
let geometry = createPrimitve("coplanarPolygon", {
  polygonHierarchy: [
    -90.0,
    30.0,
    0.0,
    -90.0,
    30.0,
    300000.0,
    -80.0,
    30.0,
    300000.0,
    -80.0,
    30.0,
    0.0
  ]
});

appearance: new this.Cesium.EllipsoidSurfaceAppearance({
  material: this.Cesium.Material.fromType("Stripe")
})
```

![coplanarPolygon](./displayPrimitive/coplanarPolygon.JPG)

## coplanarPolygonOutline

```js
let geometry = createPrimitve("coplanarPolygonOutline", {
  polygonHierarchy: [
    -90.0,
    30.0,
    0.0,
    -90.0,
    30.0,
    300000.0,
    -80.0,
    30.0,
    300000.0,
    -80.0,
    30.0,
    0.0
  ]
});

appearance: new this.Cesium.PerInstanceColorAppearance({
  flat: true,
  translucent: false,
  renderState: {
    lineWidth: Math.min(
      6.0,
      window.viewer.scene.maximumAliasedLineWidth
    )
  }
})
```

![coplanarPolygonOutline](./displayPrimitive/coplanarPolygonOutline.JPG)

## corridor

```js
let geometry = createPrimitve("corridor", {
  positions: [-72.0, 40.0, -70.0, 35.0, -75.59777, 40.03883],
  width: 100000,
  extrudedHeight: 100000
});

appearance: new this.Cesium.PerInstanceColorAppearance({
  flat: true,
  translucent: false,
  renderState: {
    lineWidth: Math.min(
      6.0,
      window.viewer.scene.maximumAliasedLineWidth
    )
  }
})
```

![corridor](./displayPrimitive/corridor.JPG)

## corridorOutline

```js
let geometry = createPrimitve("corridorOutline", {
  positions: [-72.0, 40.0, -70.0, 35.0, -75.59777, 40.03883],
  width: 100000,
  extrudedHeight: 100000
});

appearance: new this.Cesium.PerInstanceColorAppearance({
  flat: true,
  translucent: false,
  renderState: {
    lineWidth: Math.min(
      6.0,
      window.viewer.scene.maximumAliasedLineWidth
    )
  }
})
```

![corridorOutline](./displayPrimitive/corridorOutline.JPG)

## cylinder

```js
let geometry = createPrimitve("cylinder", {
  length: 200000,
  topRadius: 80000,
  bottomRadius: 200000,
  modelMatrix: [-105.0, 45.0]
});

appearance: new this.Cesium.EllipsoidSurfaceAppearance({
  material: this.Cesium.Material.fromType("Stripe")
})
```

![cylinder](./displayPrimitive/cylinder.JPG)

## cylinderOutline

```js
let geometry = createPrimitve("cylinderOutline", {
  length: 200000,
  topRadius: 80000,
  bottomRadius: 200000,
  modelMatrix: [-105.0, 45.0]
});

appearance: new this.Cesium.PerInstanceColorAppearance({
  flat: true,
  translucent: false,
  renderState: {
    lineWidth: Math.min(
      6.0,
      window.viewer.scene.maximumAliasedLineWidth
    )
  }
})
```

![cylinderOutline](./displayPrimitive/cylinderOutline.JPG)

## ellipse

```js
let geometry = createPrimitve("ellipse", {
  center: [-75.59777, 40.03883],
  semiMajorAxis: 500000.0,
  semiMinorAxis: 300000.0,
  extrudedHeight: 100000
});

appearance: new this.Cesium.EllipsoidSurfaceAppearance({
  material: this.Cesium.Material.fromType("Stripe")
})
```

![ellipse](./displayPrimitive/ellipse.JPG)

## ellipseOutline

```js
let geometry = createPrimitve("ellipseOutline", {
  center: [-75.59777, 40.03883],
  semiMajorAxis: 500000.0,
  semiMinorAxis: 300000.0,
  extrudedHeight: 100000
});

appearance: new this.Cesium.PerInstanceColorAppearance({
  flat: true,
  translucent: false,
  renderState: {
    lineWidth: Math.min(
      6.0,
      window.viewer.scene.maximumAliasedLineWidth
    )
  }
})
```

![ellipseOutline](./displayPrimitive/ellipseOutline.JPG)

## ellipsoid

```js
let geometry = createPrimitve("ellipsoid", {
  radii: [1000000.0, 500000.0, 500000.0],
  modelMatrix: [-105.0, 45.0]
});

appearance: new this.Cesium.PerInstanceColorAppearance({
  flat: true,
  translucent: false,
  renderState: {
    lineWidth: Math.min(
      6.0,
      window.viewer.scene.maximumAliasedLineWidth
    )
  }
})
```

![ellipsoid](./displayPrimitive/ellipsoid.JPG)

## ellipsoidOutline

```js
let geometry = createPrimitve("ellipsoidOutline", {
  radii: [1000000.0, 500000.0, 500000.0],
  modelMatrix: [-105.0, 45.0]
});

appearance: new this.Cesium.PerInstanceColorAppearance({
  flat: true,
  translucent: false,
  renderState: {
    lineWidth: Math.min(
      6.0,
      window.viewer.scene.maximumAliasedLineWidth
    )
  }
})
```

![ellipsoidOutline](./displayPrimitive/ellipsoidOutline.JPG)

## frustum

```js
let geometry = createPrimitve("frustum", {
  origin: [-105.0, 45.0]
});

appearance: new this.Cesium.PerInstanceColorAppearance({
  flat: true,
  translucent: false,
  renderState: {
    lineWidth: Math.min(
      6.0,
      window.viewer.scene.maximumAliasedLineWidth
    )
  }
})
```

![frustum](./displayPrimitive/frustum.JPG)

## frustumOutline

```js
let geometry = createPrimitve("frustumOutline", {
  origin: [-105.0, 45.0]
});

appearance: new this.Cesium.PerInstanceColorAppearance({
  flat: true,
  translucent: false,
  renderState: {
    lineWidth: Math.min(
      6.0,
      window.viewer.scene.maximumAliasedLineWidth
    )
  }
})
```

![frustumOutline](./displayPrimitive/frustumOutline.JPG)
