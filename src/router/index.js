import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Auth/Login'
import Home from '@/components/Main/Home'
import Pub from '@/components/Pub/Pub'
import Profile from '@/components/Profile/Profile'
import NewPub from '@/components/Pub/NewPub'
import AllPub from '@/components/Pub/AllPub'

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
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/category',
      name: 'AllPub',
      component: AllPub
    },
    {
      path: '/pub/:id',
      name: 'Pub',
      component: Pub
    },
    {
      path: '/new/pub',
      name: 'NewPub',
      component: NewPub,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
