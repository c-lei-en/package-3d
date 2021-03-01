# ParticleSystem

```js
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
```

## basicParticle

```js
let entity = createEntity("model", {
  positions: [-107.0, 43.0, 0],
  uri: "http://localhost:8091/SampleData/models/CesiumAir/Cesium_Air.glb"
});
let enti = window.viewer.entities.add(entity);
window.viewer.zoomTo(enti);

let particleSystem = createParticleSystem({
  image: require("../assets/cat.jpg"),
  imageSize: new this.Cesium.Cartesian2(20, 20),
  startScale: 0.001,
  endScale: 4.0,
  particleLife: 1.0,
  speed: 5.0,
  emitter: new this.Cesium.CircleEmitter(20),
  emissionRate: 5.0,
  emitterModelMatrix: computeEmitterModelMatrix(),
  modelMatrix: enti.computeModelMatrix(
    window.viewer.clock.startTime,
    new this.Cesium.Matrix4()
  )
});
window.viewer.scene.primitives.add(particleSystem);
```

![basicParticle](./displayParticleSystem/basicParticle.JPG)

## followModel

```js
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
```

![followModel](./displayParticleSystem/followModel.JPG)
