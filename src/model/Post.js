export class Post {
  /**
   * Post
   * @param {String} title the post title
   * @param {String} author the name of the author
   * @param {Date} entryDate the entry date
   * @param {Number} numberOfComments the number of comments
   * @param {String} thumbnail the thumbnail URL
   * @param {String} picture the picture URL
   * @param {Boolean} archived if the post was archived
   * @param {Boolean} visited if the post was visited
   */
  constructor(
    title,
    author,
    entryDate,
    numberOfComments,
    thumbnail,
    picture,
    archived,
    visited
  ) {
    this._title = title;
    this._author = author;
    this._entryDate = entryDate;
    this._numberOfComments = numberOfComments;
    this._thumbnail = thumbnail;
    this._picture = picture;
    this._archived = archived;
    this._visited = visited;
    this._savedToGallery = false;
  }

  get title() {
    return this._title;
  }

  get author() {
    return this._author;
  }

  get entryDate() {
    return this._entryDate;
  }

  get numberOfComments() {
    return this._numberOfComments;
  }

  get thumbnail() {
    return this._thumbnail;
  }

  get picture() {
    return this._picture;
  }

  get archived() {
    return this._archived;
  }

  get visited() {
    return this._visited;
  }

  get savedToGallery() {
    return this._savedToGallery;
  }

  set archived(value) {
    this._archived = value;
  }

  set savedToGallery(value) {
    this._savedToGallery = value;
  }

  set visited(value) {
    this._visited = value;
  }

  hasThumbnail() {
    return !!this.thumbnail;
  }
}
