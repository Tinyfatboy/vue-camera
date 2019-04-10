import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // description: "",
    successUrl: ""
  },
  // getters: {
  //   desc: state => {
  //     return state.description.split('\n')
  //   }
  // },
  mutations: {
    // login(state, data) {
    //   state.description = data
    // },
    successLogin(state, data) {
      state.successUrl = data
    }
  },
  actions: {

  }
})
