// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store'

import MyError from '@/components/error'

Vue.use(Vuetify)

router.beforeEach((to, from, next) => {
  to.meta.title && (document.title = to.meta.title + ' | Robotics Club, CIT Kokrajhar')
  next()
})

//global components 
Vue.component('my-error', MyError)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: {
    App,
  },
  template: '<App/>'
})
