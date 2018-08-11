export default {
  toggleLoading(state){
    state.loading = !state.loading
  },
  startLoading(state){
    state.loading = true
  },
  stopLoading(state){
    state.loading = false
  },

  setToken(state, token){
    window.localStorage.setItem('authtoken', String(token))
    state.authToken = window.localStorage.getItem('authtoken')
  },
  removeToken(state){
    window.localStorage.removeItem('authtoken')
    state.authToken = null
  },

  toggleAdminDialog(state, next){
    state.adminLoginDialog = !state.adminLoginDialog
    state.loginNext = next
  },
}
