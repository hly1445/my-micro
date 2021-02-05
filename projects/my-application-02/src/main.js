__webpack_public_path__ = "http://localhost:8082/";

import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "./router";

Vue.use(VueRouter);

Vue.config.productionTip = false;

let instance = null;
let router = null;

export async function mount(actions) {
  router = new VueRouter({
    mode: "history",
    base: "/subApp",
    routes,
  });

  Vue.prototype.$actions=actions

  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount("#my-application");
}

export async function unmount() {
  if (instance) {
    instance.$destroy();
    instance = null;
    router = null;
  }
}
