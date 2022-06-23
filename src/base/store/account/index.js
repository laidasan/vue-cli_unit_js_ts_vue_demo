export default {
  namespaced: true,
  state: {
    ob: {
      num: 0
    }
  },
  mutations: {
    updateOb (state, ob) {
      state.ob = {
        ...state.ob,
        ...(ob || {})
      }
    }
  },
  actions: {
    updateOb (context, ob) {
      context.commit('updateOb', ob)
    }
  }
}
