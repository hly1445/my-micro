<template>
  <div id="app">
    <ul>
      <li @click="jump('/sub1')">sub1</li>
      <li @click="jump('/sub2')">sub2</li>
    </ul>
    <div id="micro-container" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  methods:{
    jump(url){
     window.history.pushState({},'',url)
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
