import Vue from "vue";
import App from "./App.vue";
import { registerMicroApps, start } from "../../../src";
import VueRouter from 'vue-router'
Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
  render: (h) => h(App),
}).$mount("#app");

const appList = [
  {
    name: "vue1",
    activeRule: "/sub1",
    container: "#micro-container",
    entry: "http://localhost:8081",
  },
  {
    name: "vue2",
    activeRule: "/sub2",
    container: "#micro-container",
    entry: "http://localhost:8082",
  },
];

registerMicroApps(appList);

start();
