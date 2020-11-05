import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Auth/Login'
import Home from '@/components/Main/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/register',
      name: 'Register'
    },
    {
      path: '/pub/:id',
      name: 'Pub'
    }
  ]
})
