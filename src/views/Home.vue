<template>
  <div id="cesiumContainer"></div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    let viewer = new this.Cesium.Viewer("cesiumContainer");
  }
};
</script>
