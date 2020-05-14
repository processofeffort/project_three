<template>
	<div>
      <div class="comment" v-if="user">
       <ul v-for="cont in list">
       <li>内容：{{cont.ucontext}}</li>
       <li>时间：{{cont.utime}}</li>
       </ul>
      </div>
      <div class="nocomment" v-else>
       <span>用户还未评论过</span>
      </div>
	</div>
</template>

<script>
import $http from 'axios'
export default{
  name:'userComment',
  data(){
  	return{
  		list:[]
  	}
  },
  mounted(){
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
        ucontext:this.textarea,
        uname:this.user.name,
        utime:y + '-' + m + '-' + d+' '+h+':'+minute+':'+second
        }
       $http.post('/informations/mComment',params).then((res) => {
        this.list=res.data;
        console.log(this.list);
        })
  },
    computed: {
       user () {
           return this.$store.state.user
        }
        }
        }
</script>

<style scoped>
ul,li{
 list-style-type: none;
}
</style>
