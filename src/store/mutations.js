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
    state.authToken = String(token)
  },
  removeToken(state){
    window.localStorage.removeItem('authtoken')
    state.authToken = null
  }
}
