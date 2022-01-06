__webpack_public_path__ = "http://localhost:8082/";
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

let app

export const bootstrap = () => {
  app = new Vue({
    render: (h) => h(App),
  })
}

export const mount = () => {
  app.$mount('#micro-container')
}

export const unmount = () => {
  app.$destroy()
}
