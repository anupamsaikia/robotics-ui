export default {
  toggleLoading(state){
    state.loading = !state.loading
  },
  startLoading(state){
    state.loading = true
  },
  stopLoading(state){
    state.loading = false
  }
}
