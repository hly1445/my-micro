<template>
  <div id="my-application">
    <router-view />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  data() {
    return {
      name: "我是一个子应用",
    };
  },
  components: {
    HelloWorld,
  },
  mounted() {
    this.$actions.setAction({
      name: "hly1",
    });
  },
};
</script>
