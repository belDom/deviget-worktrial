import RedditService from "../services/Reddit.service";
import { Post } from "../model/Post";

export default {
  namespaced: true,
  state: {
    posts: []
  },
  getters: {
    posts(state) {
      return state.posts;
    }
  },
  mutations: {
    flagPostAsSeen() {
      // TODO
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
    dismissPost() {
      // TODO
    }
  },
  actions: {
    getPosts({ commit }) {
      RedditService.getTopPosts()
        .then(response => {
          if (response.data.children.length > 0) {
            let posts = response.data.children.map(entry => {
              let post = entry.data;
              return new Post(
                post.title,
                post["author_fullname"],
                post.created,
                post["num_comments"],
                post.thumbnail,
                post.url,
                post.archived,
                post.visited
              );
            });

            commit("setPosts", posts);
          }

          return response;
        })
        .catch(error => {
          return error;
        });
    }
  }
};
