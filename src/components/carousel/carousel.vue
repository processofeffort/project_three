<template>
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="(item,index) in carouselData" :key="index">
      <div class="carImg">
      <img :src="item.images">
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default{
    name:'carousel',
  data(){
    return{
    carouselData:[
      {images:require('../../assets/img/11.jpg')},
      {images:require('../../assets/img/12.jpg')},
      {images:require('../../assets/img/13.jpg')}
  ]
  }
  }
}
</script>
<style scope>
  .el-carousel__item h3{
    font-size: 18px;
    opacity: 0.75;
    padding:100px 200px;
  }
  
  .el-carousel__item img{
    width:1360px;
    height:300px;
    border-radius:5px;
  }

  .el-carousel__item {
    display:flex;
  }
</style>