import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Auth/Login'
import Home from '@/components/Main/Home'
import Pub from '@/components/Pub/Pub'
import Profile from '@/components/Profile/Profile'
import Order from '@/components/Profile/Order'
import OrderList from '@/components/Profile/UserOrder'
import NewPub from '@/components/Pub/NewPub'
import AllPub from '@/components/Pub/AllPub'
import Noti from '@/components/Main/Noti'

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
      path: '/order',
      name: 'Order',
      component: Order,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/order_list',
      name: 'OrderList',
      component: OrderList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/notifications',
      name: 'Notification',
      component: Noti,
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
        requiresAuth: true,
        requiresPublican: true
      }
    }
  ]
})
