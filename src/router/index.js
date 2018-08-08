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
      meta: { title: 'Robotics Club, CIT Kokrajhar' }
    },
    {
      path: '/events',
      name: 'Events',
      component: () => import('@/pages/Events'),
      meta: { title: 'Events' }
    },
    {
      path: '/events/:_id',
      name: 'SingleEvent',
      component: () => import('@/pages/SingleEvent'),
      meta: { title: 'Event' }
    },
    {
      path: '/events/:_id/edit',
      name: 'EditEvent',
      component: () => import('@/components/editEvent'),
      meta: { title: 'Edit event' }
    },
    {
      path: '/members',
      name: 'Members',
      component: () => import('@/pages/Members'),
      meta: { title: 'Members' }
    }
  ]
})
