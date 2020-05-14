<template>
	<div class="artMessage">
	<div class="artList" v-for="(item,index) in articleData" :key="index" @click="toDetail(index)">
	<div class="artTitle">
	{{item.title}}
	</div>
	<div class="artImg">
	<img :src="item.pic_img">
	</div>
	</div>
	</div>
</template>
<script>
import axios from 'axios'
export default{
  name:'artMessage',
	data(){
		return{
		articleData:{}
	}
	},
  mounted(){
    this.getMessage();
  },
  methods:{
    getMessage(){
     axios.get('http://localhost:8080'+'/static/information.json').then(response => {
     this.articleData= response.data;
      console.log(this.articleData);
      },response => {
        console.log('数据加载失败')
    })
    },
    toDetail(id){
      this.$router.push({path: '/article',query:{id}})
    }
  }
}
</script>

<style scoped>
	.artMessage{
    	 border-radius: 8px;
   		 background-color: #fff;
   		 width: 75%;
   		 margin: 0 auto;
   		 position: relative;
   		 bottom: 70px;
   		 z-index: 1500;
	}
	.artList{
		display:flex;
		height:270px;
		padding:10px;
	    transition: 0.8s;
	}
	.artList:hover{
    	box-shadow: 0 0 20px #888888;
    	border-radius:8px;
	}
	.artTitle{
		color:#000000;
	}
	.artTitle{
		flex:1;
		height:250px;
	}
	.artImg,.artImg img{
		width:500px;
		height:250px;
		border-radius:8px;
		transition: 0.8s;
	}
	.artImg img:hover{
		transform:scale(1.03,1.03);
	}
</style>
