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

  login({ commit }, { phone, password, cb }){
    commit('startLoading')
    fetch(url + '/api/getToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, password }),
    })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      return Promise.reject(response);
    })
    .then((response) => {
      return response.text();
    })
    .then(response => {
      commit('stopLoading')
      commit('setToken', response)
      cb(true, 'Login succesful')
    })
    .catch(err => {
      commit('stopLoading')
      console.log(err)
      err.text().then(e => {
        cb(false, e)
      })
      .catch(e => {
        alert('saf')
        cb(false, "Network Failure")
      })
    })
  },

  logout({ commit }){
    commit('removeToken')
  },

  toggleLoginForm({ commit }, next){
    commit('toggleAdminDialog', next)
  },
}
