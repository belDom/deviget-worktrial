const POSTS_VISITED = "posts_visited";

const PostsVisitedService = {
  getPostsVisited() {
    let posts = localStorage.getItem(POSTS_VISITED);
    if (posts) {
      return JSON.parse(posts);
    }

    return posts;
  },

  setPostsVisited(posts) {
    const stringifyPosts = JSON.stringify(posts);
    localStorage.setItem(POSTS_VISITED, stringifyPosts);
  },

  isPostVisited(postId) {
    let postsVisited = this.getPostsVisited();
    if (postsVisited && postsVisited.length > 0) {
      return postsVisited.includes(postId);
    }

    return false;
  }
};

export { PostsVisitedService };
