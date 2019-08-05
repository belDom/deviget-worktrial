export default {
  namespaced: true,
  state: {
    layoutSplitActive: false
  },
  getters: {
    layoutSplitActive(state) {
      return state.layoutSplitActive;
    }
  },
  mutations: {
    setLayoutSplit(state, value) {
      state.layoutSplitActive = value;
    }
  },
  actions: {}
};
