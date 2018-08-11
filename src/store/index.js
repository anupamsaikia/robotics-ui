import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import url from './url'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    url,
    authToken: window.localStorage.getItem('authtoken'),
    adminLoginDialog: false,
    loginNext: null,
  },
  actions,
  mutations,
})
