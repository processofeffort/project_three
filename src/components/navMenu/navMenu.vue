<template>
  <div id="navMenu">
 	<el-menu
 		:default-active="activeIndex"
 		class="el-menu-demo"
 		mode="horizontal"
 		@select="handleSelect"
 		background-color="#545c64"
  	text-color="#fff"
  	active-text-color="#ffffff"
 		router
 	>
 	<template v-for="item in navMenuData">
 		<el-menu-item :index="item.index">{{item.name}}</el-menu-item>
 	</template>
 	</el-menu>
  </div>
</template>
<script>
export default{
    name:'navMenu',
	data(){
		return{
		activeIndex:"home",
		navMenuData:[
			{index:"home",name:"Home"},
			{index:"userCenter",name:"User"}
	]
	};
	},
	methods:{
		handleSelect(key,keyPath){
			console.log(key,keyPath);
		}
	},
	mounted(){
		console.log(this.activeIndex)
		console.log(this.$route.path)
		this.activeIndex=this.$route.path.substring(1,this.$route.path.length);
	}
}
</script>

<style>
</style>
