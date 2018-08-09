import url from './url'

export default {
  loading({ commit }, loadingState){
    var state = loadingState.toLowerCase().trim()
    switch(state){
      case 'start': commit('startLoading'); break;
      case 'stop' : commit('stopLoading'); break;
      default: commit('toggleLoading')
    }
  },

  login({ commit }, { phone, password }){
    commit('startLoading')
    fetch(url + '/getToken', {
      method: 'POST',
      body: {
        phone, password,
      }
    })
    .then(response => {
      commit('stopLoading')
      if (response.ok){
        commit('setToken', response.text)
      }
      else
        return Promise.reject(response);
    })
    .catch(err => {
      commit('stopLoading')
      alert('Login failed')
    })
  },

  logout({ commit }){
    commit('removeToken')
  }
}
