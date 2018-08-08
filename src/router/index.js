import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/events',
      name: 'Events',
      component: () => import('@/pages/Events')
    },
    {
      path: '/events/:_id',
      name: 'SingleEvent',
      component: () => import('@/pages/SingleEvent')
    },
    {
      path: '/events/:_id/edit',
      name: 'EditEvent',
      component: () => import('@/components/editEvent')
    },
    {
      path: '/members',
      name: 'Members',
      component: () => import('@/pages/Members')
    }
  ]
})
