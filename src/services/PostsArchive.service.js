const ARCHIVED_POSTS = "archived_posts";

const PostsArchiveService = {
  getPostsArchived() {
    let posts = localStorage.getItem(ARCHIVED_POSTS);
    if (posts) {
      return JSON.parse(posts);
    }

    return posts;
  },

  saveArchivedPosts(posts) {
    const postsTmp = JSON.stringify(posts);
    localStorage.setItem(ARCHIVED_POSTS, postsTmp);
  },

  /**
   * Is post archived
   * @param postId {String} the post ID
   * @returns {boolean}
   */
  isPostArchived(postId) {
    let posts = this.getPostsArchived();
    if (posts && posts.length > 0) {
      return posts.includes(postId);
    }

    return false;
  }
};

export { PostsArchiveService };
