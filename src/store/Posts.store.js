import RedditService from "../services/Reddit.service";
import { Post } from "../model/Post";

export default {
  namespaced: true,
  state: {
    posts: [],
    after: undefined,
    before: undefined,
    subrredit: "earthporn",
    limit: 5
  },
  getters: {
    posts(state) {
      return state.posts;
    },
    afterPosts(state) {
      return state.after;
    },
    beforePosts(state) {
      return state.before;
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = state.posts.concat(posts);
    },
    setAfterPosts(state, afterPointer) {
      state.after = afterPointer;
    },
    setBeforePosts(state, beforePointer) {
      state.before = beforePointer;
    }
  },
  actions: {
    getPosts(
      { state, commit },
      loadFrom = { before: undefined, after: undefined }
    ) {
      RedditService.getTopPosts(
        state.subrredit,
        state.limit,
        loadFrom.before,
        loadFrom.after
      )
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

          commit("setAfterPosts", response.data.after);
          commit("setBeforePosts", response.data.before);

          return response;
        })
        .catch(error => {
          return error;
        });
    }
  }
};
