<template>
	<div class="detMessage">
	<div class="detList" v-html="dataes.content">
	</div>
         <div class="grid-content">
          <h4>评论区</h4>
          <div v-if="list.length===0">
          <span>暂无评论...</span>
          <div class="btn">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
          </div>
          <el-button type="success" round @click="sendMessage">发送</el-button>
          <el-button round @click="reload">取消</el-button>
          </div>
          <div v-else v-for="message in list">
          评论者：{{message.uname}}
          内容：{{message.ucontext}}
          评论时间：{{message.utime}}
          <el-button round @click="dlMessage()">删除</el-button>
          </div>
          <div class="btn">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
          </div>
          <el-button type="success" round @click="sendMessage">发送</el-button>
          <el-button round @click="reload">取消</el-button>
          </div>
	</div>
</template>

<script>
import $http from 'axios'
  export default{
    name:"Detail",
    data(){
      return{
        dataes:{},
        textarea:'',
        list:[]
      }
    },
    mounted() {
      this.showMessage();
      this.showArticleMessage();
    },
    computed: {
           user () {
               return this.$store.state.user
           }
    },
    methods:{
      showMessage(){
         let that = this;
         let iid = location.href.split("=")[1];
         console.log(iid);
         $http.get('http://localhost:8080'+'/static/information.json').then(response => {
         let datas = response.data;
         if(datas&&datas.length>0){
             that.dataes = datas[iid];
             console.log(that.dataes);
          }else{
            console.log("not found datas")
         }
          },response => {
            console.log('数据加载失败')
        })
      },
      showArticleMessage(){
          $http.get('/informations/showComment').then((response) => {
            this.list=response.data;
            console.log(this.list);
          },response =>{
            console.log('数据请求失败')
          })
      },
      reload(){
        this.textarea="";
      },
      sendMessage(){
          if(!this.user){
          alert("未登录不能进行评论！");
          this.$router.replace('/userLogin')
       }else{
            var y = new Date().getFullYear();
            var m = new Date().getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = new Date().getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = new Date().getHours();
            h=h < 10 ? ('0' + h) : h;
            var minute = new Date().getMinutes();
            minute = minute < 10 ? ('0' + minute) : minute;
            var second=new Date().getSeconds();
            second=second < 10 ? ('0' + second) : second;
            let params={
            uid:this.id,
            ucontext:this.textarea,
            uname:this.user.nickName,
            utime:y + '-' + m + '-' + d+' '+h+':'+minute+':'+second
            }
            $http.post('/informations/comment',params).then((res) => {
            if (res.data.status==1000) {
                 alert(res.data.message);
                 this.reload();
           }
           else{
              alert(res.data.message)
                }
          }).catch((err)=>{
             console.log(err)
          })
          }
          },
          dlMessage(){
          if(!this.user){
              alert("您无权限删除评论！");
          }
          else{
           let para={
            uname:this.user.nickName,
            ucontext:this.list[0].ucontext
            }
            $http.post('/informations/dComment',para).then((res) => {
            if (res.data) {
                 console.log(res);
                 console.log(res.data);
                 this.reload()
           }
           else{
              alert("您不是该用户!");
                }
          }).catch((err)=>{
             console.log(err)
          })
          }
          }
    }
  }
</script>

<style scoped>
  .detMessage{
    	 border-radius: 8px;
   		 background-color: #fff;
   		 width: 75%;
   		 margin: 10px auto;
   		 position: relative;
   		 z-index: 1500;
	}
	.detList{
      min-height:200px;
      max-height:3000px;
      padding:10px;
      transition: 0.8s;
	}
	.detList:hover{
    	box-shadow: 0 0 20px #888888;
    	border-radius:8px;
	}
  .btn{
  margin:10px 0;
  }
</style>
