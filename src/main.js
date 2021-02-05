import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { registerApps } from "../micro";
import actions from '../micro/store'
Vue.config.productionTip = false;

function portal() {
  new Vue({
    router,
    render: (h) => h(App),
  }).$mount("#app");
}
portal();

const miroApps = [
  {
    name: "subApp",
    entry: "http://localhost:8082",
  },
  {
    name: "myApp",
    entry: "http://localhost:8081",
  },
];

actions.setAction({
    name:"hly"
})

registerApps(miroApps);
