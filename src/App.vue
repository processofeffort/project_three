<template>
  <div id="app">
      <navMenu/>
      <router-view v-if="showView"></router-view> <!--路由出口 -->
  </div>
</template>


<script>
import navMenu from './components/navMenu/navMenu.vue'
export default {
  name: 'App',
  components:{
    navMenu
  },
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      showView:true
    }
  },
  methods:{
    reload () {
    this.showView = false // 通过v-if移除router-view节点
    this.$nextTick(() => {
       this.showView = true // DOM更新后再通过v-if添加router-view节点
      })
    }
  }
};
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
