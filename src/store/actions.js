export default {
  loading({ commit }, loadingState){
    var state = loadingState.toLowerCase().trim()
    switch(state){
      case 'start': commit('startLoading'); break;
      case 'stop' : commit('stopLoading'); break;
      default: commit('toggleLoading')
    }
  }
}
