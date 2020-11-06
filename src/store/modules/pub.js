import axios from 'axios'

const state = {
  paramPub: null
}

const getters = {
  paramPub: state => state.paramPub
}

const actions = {
  async getParamPub({ commit }, id) {
    const response = await axios.get(`/user/pub/${id}/get`)
    commit('SET_PARAM_POST', response.data.data)
  }
}

const mutations = {
  SET_PARAM_POST: function(state, pub) {
    state.paramPub = pub
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
