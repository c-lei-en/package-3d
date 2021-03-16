import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
let Cesium = require("cesium/Cesium");
let widgets = require("cesium/Widgets/widgets.css");
import "./mapconfig/cesiumWallBillboard/cesiumWallBillboard";

Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3MTNiMzk1My0zZmRlLTRmYjQtYTBlZC0wMTdhYjAzMTFiMTAiLCJpZCI6MTQ3NjQsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NjYzMDc3NjZ9.ddc1YqTozjcAmoYQBE2Na5gr8RClBNKeB8QfkAwyPqk";

Vue.prototype.Cesium = Cesium;
Vue.prototype.widgets = widgets;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
