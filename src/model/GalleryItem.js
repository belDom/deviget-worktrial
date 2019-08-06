export class GalleryItem {
  /**
   * Gallery item
   * @param thumbnail {String} the picture thumbnail URI
   * @param url {String} the picture URL
   */
  constructor(postId, thumbnail, url) {
    this.postId = postId;
    this.thumbnail = thumbnail;
    this.url = url;
  }
}
