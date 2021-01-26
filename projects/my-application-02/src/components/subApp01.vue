<template>
  <div >
      我是子应用的路由

      <button @click="back()">返回</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods:{
      back(){
          this.$router.push("/")
      }
  }
}
</script>

<style scoped>

</style>
