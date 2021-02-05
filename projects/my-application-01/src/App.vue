<template>
  <div id="my-application">
     <router-view/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
      return{
          name:"我是一个子应用01"
      }
  },
  components: {
    HelloWorld
  },
  mounted(){
      console.log(this.$actions.getAction())
  }
}
</script>
