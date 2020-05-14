<template>
        <div id="login">
          <div id="bgd">
            <canvas id='myCanvas' :width='width' :height='height'></canvas>
          </div>
          <div id="loginBox">
            <h4>注册</h4>
            <el-form :model="user" :rules="rules" ref="loginForm" label-width="0px">
              <el-form-item label="" prop="name">
                <el-row>
                  <el-col :span='6'>
                    <span class="iconfont">用户名</span>
                  </el-col>
                  <el-col :span='16'>
                    <el-input class="inps" placeholder="用户名" v-model="user.name"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="" prop="pass">
                <el-row>
                  <el-col :span='6'>
                    <span class="iconfont">密码</span>
                  </el-col>
                  <el-col :span='16'>
                    <el-input class="inps" placeholder="密码" v-model="user.pass" type="password"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="" prop="nickName">
                <el-row>
                  <el-col :span='6'>
                    <span class="iconfont">昵称</span>
                  </el-col>
                  <el-col :span='16'>
                    <el-input class="inps" placeholder="昵称" v-model="user.nickName" type="name"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-download"  @click="register">注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
</template>

<script>
import $http from 'axios'
import {isNumber,isPassword,isName} from "../../utils/validate.js"
export default{
	name:'userRegister',
  data(){
    return{
       canvas: null,
        context: null,
        stars: [],
        shadowColorList: [
          "#39f",
          "#ec5707",
          "#b031d4",
          "#22e6c7",
          "#92d819",
          "#14d7f1",
          "#e23c66"
        ],
        directionList: [
          "leftTop", "leftBottom", "rightTop", "rightBottom"
        ],
        speed: 50,
        Ball: class Ball {
          constructor(radius) {
            this.x = 0;
            this.y = 0;
            this.radius = radius;
            this.color = "";
            this.shadowColor = "";
            this.direction = "";
          }
          draw(context) {
            context.save();
            context.translate(this.x, this.y);
            context.lineWidth = this.lineWidth;
            var my_gradient = context.createLinearGradient(0, 0, 0, 8);
            my_gradient.addColorStop(0, this.color);
            my_gradient.addColorStop(1, this.shadowColor);
            context.fillStyle = my_gradient;
            context.beginPath();
            context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
            context.closePath();
            context.shadowColor = this.shadowColor;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowBlur = 10;
            context.fill();
            context.restore()
          }
        },
        width: window.innerWidth,
        height: window.innerHeight,
           user: {},
                rules: {
                    name: [
                        {required: true, message: '请输入用户名',trigger: 'blur'},
                        {validator:isNumber,trigger: 'blur'}
                    ],
                    pass: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {validator:isPassword,trigger: 'blur'}
                    ],
                    nickName: [
                        {required: true, message: '请输入昵称', trigger: 'blur'},
                        {validator:isName,trigger: 'blur'}
                    ]
                    }
    }
  },
  methods:{
   register(){
    console.log(this.user);
    $http.post('/users/register',this.user).then((res) => {
     if (res.data.status==1000) {
          alert(res.data.message)
          this.$router.replace('/userLogin')
          }
     else{
          alert(res.data.message)
         }
   }).catch((err)=>{
        console.log(err)
   })
   },
   submitForm() {},
   //重复动画
   drawFrame() {
     let animation = requestAnimationFrame(this.drawFrame);
     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
     this.createStar(false);
     this.stars.forEach(this.moveStar);
   },
   //展示所有的星星
   createStar(params) {
     let now = new Date();
     if (params) {
       //初始化星星
       for (var i = 0; i < 50; i++) {
         const radius = Math.random() * 3 + 2;
         let star = new this.Ball(radius);
         star.x = Math.random() * this.canvas.width + 1;
         star.y = Math.random() * this.canvas.height + 1;
         star.color = "#ffffff";
         star.shadowColor = this.shadowColorList[
           Math.floor(Math.random() * this.shadowColorList.length)
         ];
         star.direction = this.directionList[
           Math.floor(Math.random() * this.directionList.length)
         ];
         this.stars.push(star);
       }
     } else if (!params && now - this.last_star_created_time > 3000) {
       //每隔3秒重绘修改颜色其中30个球阴影颜色
       for (var i = 0; i < 30; i++) {
         this.stars[i].shadowColor = this.shadowColorList[
           Math.floor(Math.random() * this.shadowColorList.length)
         ];
       }
       this.last_star_created_time = now;
     }
   },
   //移动
   moveStar(star, index) {
     if (star.y - this.canvas.height > 0) {
       //触底
       if (Math.floor(Math.random() * 2) === 1) {
         star.direction = "leftTop";
       } else {
         star.direction = "rightTop";
       }
     } else if (star.y < 2) {
       //触顶
       if (Math.floor(Math.random() * 2) === 1) {
         star.direction = "rightBottom";
       } else {
         star.direction = "leftBottom";
       }
     } else if (star.x < 2) {
       //左边
       if (Math.floor(Math.random() * 2) === 1) {
         star.direction = "rightTop";
       } else {
         star.direction = "rightBottom";
       }
     } else if (star.x - this.canvas.width > 0) {
       //右边
       if (Math.floor(Math.random() * 2) === 1) {
         star.direction = "leftBottom";
       } else {
         star.direction = "leftTop";
       }
     }
     if (star.direction === "leftTop") {
       star.y -= star.radius / this.speed;
       star.x -= star.radius / this.speed;
     } else if (star.direction === "rightBottom") {
       star.y += star.radius / this.speed;
       star.x += star.radius / this.speed;
     } else if (star.direction === "leftBottom") {
       star.y += star.radius / this.speed;
       star.x -= star.radius / this.speed;
     } else if (star.direction === "rightTop") {
       star.y -= star.radius / this.speed;
       star.x += star.radius / this.speed;
     }
     star.draw(this.context);
   }
   },
   mounted() {
     this.canvas = document.getElementById("myCanvas");
     this.context = this.canvas.getContext("2d");
     this.createStar(true);
     this.drawFrame();
   }
}
</script>

<style lang="less" scoped>
  #login {
    width: 100%;
    padding: 0;
    margin: 0;
    height: 100vh;
    font-size: 16px;
    background-repeat: no-repeat;
    background-position: left top;
    background-color: #242645;
    color: #fff;
    background:url('../../assets/img/user_bg.png');
    font-family: "Source Sans Pro";
    background-size: 100%;
    position: relative;
    #bgd {
      height: 100vh;
      width: 100%;
      overflow: hidden;
    }

    #loginBox {
      width: 240px;
      height: 280px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      padding: 50px 40px 40px 40px;
      box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
      opacity: 1;

      background: linear-gradient(230deg, rgba(53, 57, 74, 0) 0%, rgb(0, 0, 0) 100%);/deep/ .inps input {
        border: none;
        color: #fff;
        background-color: transparent;
        font-size: 12px;
      }

      .submitBtn {
        background-color: transparent;
        color: #39f;
        width: 200px;
      }

      .iconfont {
        color: #fff;
      }
    }
  }
</style>
