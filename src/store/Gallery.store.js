export default {
  namespaced: true,
  state: {
    pictures: []
  },
  getters: {
    pictures(state) {
      return state.pictures;
    }
  },
  mutations: {
    setPictures(state, pictures) {
      state.pictures = pictures;
    },
    addPicture(state, picture) {
      state.pictures.push(picture);
    }
  }
};
