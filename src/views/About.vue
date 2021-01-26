<template>
  <div class="about">
    我是基座应用
    <button @click="jump0()">跳转0</button>
    <button @click="jump1()">跳转1</button>
  </div>
</template>
<script>
export default {
    methods:{
        jump0(){
             window.history.pushState({}, null, '/subApp');
        },
        jump1(){
            window.history.pushState({}, null, '/myApp');
        }
    }
}
</script>
