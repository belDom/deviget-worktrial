import Vue from "vue";
import Vuex from "vuex";

import Application from "./store/App.store";
import Posts from "./store/Posts.store";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    Application,
    Posts
  }
});
