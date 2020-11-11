import axios from 'axios'

const state = {
  paramPub: null,
  myPubs: [],
  pubs: [],
  dishes: []
}

const getters = {
  paramPub: state => state.paramPub,
  myPubs: state => state.myPubs,
  pubs: state => state.pubs,
  dishes: state => state.dishes
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
    console.log(response)
    commit('CREATE_PUB', response.data.data)
  },
  async getAllPub({ commit }) {
    let url = '/user/pub/store'
    const response = await axios.get(url)
    commit('SET_ALL_PUB', response.data.data)
  },
  async getMyPub({ commit }) {
    let url = '/user/pub/store_my_pub'
    const response = await axios.get(url)
    commit('SET_MY_PUB', response.data.data)
  },
  async getDishes({ commit }, param) {
    let url = param.searchKey
      ? `/user/dish/store?category=${param.category}&search_key=${param.searchKey}`
      : `/user/dish/store?category=${param.category}`
    const response = await axios.get(url)
    commit('SET_DISH', response.data.data)
  },
  async createDish({ commit }, formData) {
    console.log(formData)
    let url = `/user/dish/create`
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    commit('CREATE_DISH', response.data.data)
  }
}

const mutations = {
  SET_PARAM_PUB: function(state, pub) {
    state.paramPub = pub
  },
  CREATE_PUB: function(state, pub) {
    state.pubs.unshift(pub)
  },
  SET_ALL_PUB: function(state, pubs) {
    state.pubs = pubs
  },
  SET_MY_PUB: function(state, pubs) {
    state.myPubs = pubs
  },
  SET_DISH: function(state, dishes) {
    state.dishes = dishes
  },
  CREATE_DISH: function(state, dish) {
    state.dishes.push(dish)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
