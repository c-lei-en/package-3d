import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
let Cesium = require("cesium/Cesium");
let widgets = require("cesium/Widgets/widgets.css");

Vue.prototype.Cesium = Cesium;
Vue.prototype.widgets = widgets;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
