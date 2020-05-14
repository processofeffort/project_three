import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/Home'
import Article from '@/views/article/Article'
import UserCenter from '@/views/user/userCenter'
import UserLogin from '@/views/user/userLogin'
import UserRegister from '@/views/user/userRegister'
import UserComment from '@/views/user/userComment'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '',
      name:'home',
      redirect:'/home'
    },
    /*
    {
    path:'/home',
    name:'home',
    component:home
    }
     */
    {
      path:'/home',
      component:()=>import('@/views/home/Home')
    },
    {
      path:'/article',
      component:()=>import('@/views/article/Article')
    },
    {
      path:'/userCenter',
      component:()=>import('@/views/user/userCenter')
    },
    {
      path:'/userLogin',
      component:()=>import('@/views/user/userLogin')
    },
    {
      path:'/userRegister',
      component:()=>import('@/views/user/userRegister')
    },
    {
      path:'/userComment',
      component:()=>import('@/views/user/userComment')
    }
  ]
})

