import axios from 'axios'

const state = {
  paramPub: null,
  pubs: []
}

const getters = {
  paramPub: state => state.paramPub
}

const actions = {
  async getParamPub({ commit }, id) {
    const response = await axios.get(`/user/pub/${id}/get`)
    commit('SET_PARAM_PUB', response.data.data)
  },
  async createPub({ commit }, formData) {
    console.log(formData)
    let url = 'user/pub/create'
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    commit('CREATE_PUB', response.data.data)
  }
}

const mutations = {
  SET_PARAM_PUB: function(state, pub) {
    state.paramPub = pub
  },
  CREATE_PUB: function(state, pub) {
    state.pubs.unshift(pub)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
