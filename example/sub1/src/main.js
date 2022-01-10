__webpack_public_path__ = "http://localhost:8082/";
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

let app

export const bootstrap = (props) => {
  props.onGlobalStateChange((n,o)=>{
    console.log("子应用")
    console.log(n,o)
  })
  props.setGlobalState({user:"ccc"})
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
