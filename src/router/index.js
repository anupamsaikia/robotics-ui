import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { title: 'Robotics Club, CIT Kokrajhar' }
    },
    {
      path: '/join',
      name: 'Join',
      component: () => import('@/pages/JoinClub'),
      meta: { title: 'Registration' }
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
      component: () => import('@/pages/EditEvent'),
      meta: { title: 'Edit event', auth: true, }
    },
    {
      path: '/members',
      name: 'Members',
      component: () => import('@/pages/Members'),
      meta: { title: 'Members' }
    },
    {
      path: '/members/:_id',
      name: 'SingleMember',
      component: () => import('@/pages/SingleMember'),
      meta: { title: 'Members' }
    },
    {
      path: '/members/:_id/edit',
      name: 'EditMember',
      component: () => import('@/pages/EditMember'),
      meta: { title: 'Members', auth: true, }
    }
  ]
})
