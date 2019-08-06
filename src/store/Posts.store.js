import RedditService from "../services/Reddit.service";
import { Post } from "../model/Post";
import { PostsVisitedService } from "../services/PostsVisited.service";

export default {
  namespaced: true,
  state: {
    posts: [],
    after: undefined,
    before: undefined,
    subrredit: "earthporn",
    postsVisited: undefined,
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
    },
    postsVisited(state) {
      return state.postsVisited;
    }
  },
  mutations: {
    addPostVisited(state, post) {
      state.postsVisited.push(post);
    },
    setPostsVisited(state, posts) {
      state.postsVisited = posts ? posts : [];
    },
    setPosts(state, posts) {
      state.posts = state.posts.concat(posts);
    },
    setAfterPosts(state, afterPointer) {
      state.after = afterPointer;
    },
    setBeforePosts(state, beforePointer) {
      state.before = beforePointer;
    },
    flagPostAsVisited(state, post) {
      post.visited = true;
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
            let postsVisited = PostsVisitedService.getPostsVisited() || [];
            commit("setPostsVisited", postsVisited);

            let posts = response.data.children.map(entry => {
              let post = entry.data;
              const isPostVisited = PostsVisitedService.isPostVisited(post.id);
              return new Post(
                post.id,
                post.title,
                post["author_fullname"],
                post.created,
                post["num_comments"],
                post.thumbnail,
                post.url,
                post.archived,
                isPostVisited
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
