<template>
    <div class="user-center">
      <div class="user-left">
        <div v-if="user">
        <div class="left-top">
        <span>用户名：{{user.nickName}}</span>
        </div>
        <div class="left-center">
        <span @click="myComment">我的评论</span>
        </div>
        <div class="left-bottom">
        <el-button type="warning"  @click="logout">退出</el-button>
        </div>
        </div>
        <div v-else>
          <router-link to='/userLogin'><a href="/userLogin">请先登陆!</a></router-link>
        </div>
      </div>
      <div class="user-right"></div>
    </div>
</template>

<script>
export default{
  name:'user',
   methods: {
            login () {
                this.$router.replace('/userLogin')
            },
            logout () {
                this.$store.dispatch('logout').then(() => {
                    this.$router.replace('/userCenter')
                })
            },
            myComment(){
               this.$router.replace('/userComment')
            }
            },
   computed: {
            user () {
                return this.$store.state.user
            }
        }
        }
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    list-style: none;
  }
 .el-button{
   padding:5px;
 }
</style>
