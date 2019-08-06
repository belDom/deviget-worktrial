const GALLERY = "gallery";

const GalleryService = {
  getGallery() {
    let pictures = localStorage.getItem(GALLERY);
    if (pictures) {
      return JSON.parse(pictures);
    }

    return [];
  },

  setGallery(pictures) {
    const picturesTmp = JSON.stringify(pictures);
    localStorage.setItem(GALLERY, picturesTmp);
  },

  isPictureSaved(postId) {
    const pictures = this.getGallery();
    if (pictures.length > 0) {
      const picture = pictures.filter(p => p.postId === postId);
      return picture.length > 0;
    }

    return false;
  }
};

export { GalleryService };
