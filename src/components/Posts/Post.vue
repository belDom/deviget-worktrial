<template>
  <v-container fluid grid-list-md pa-2>
    <v-card>
      <v-img :lazy-src="post.thumbnail" :src="post.picture"></v-img>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ post.title }}</v-list-item-title>
          <v-list-item-subtitle
            >by {{ post.author }} &#8211;
            {{ post.entryDate | moment("from", "now") }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <v-card-actions>
        <v-icon v-if="post.visited">mdi-eye-check</v-icon>
        <v-icon v-else>mdi-eye</v-icon>
        &nbsp;
        {{ post.numberOfComments }} <v-icon>mdi-comment</v-icon>
        <v-spacer></v-spacer>
        <v-btn icon @click="saveToGallery" :disabled="post.savedToGallery">
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>
        <v-btn icon :disabled="post.archived" @click="archive">
          <v-icon>mdi-archive</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { PostsArchiveService } from "../../services/PostsArchive.service";
import { GalleryService } from "../../services/Gallery.service";
import { GalleryItem } from "../../model/GalleryItem";

export default {
  name: "Post",
  props: {
    post: Object
  },
  computed: {
    ...mapGetters("Posts", ["postsArchived"]),
    ...mapGetters("Gallery", ["pictures"])
  },
  methods: {
    ...mapMutations("Posts", [
      "archivePost",
      "flagPostAsArchived",
      "savePostToGallery"
    ]),
    ...mapMutations("Gallery", ["addPicture"]),
    archive() {
      if (!this.post.archived) {
        this.archivePost(this.post.id);
        this.flagPostAsArchived(this.post);
        PostsArchiveService.saveArchivedPosts(this.postsArchived);
      }
    },
    saveToGallery() {
      if (!this.post.savedToGallery) {
        this.savePostToGallery(this.post);
        let picture = new GalleryItem(
          this.post.id,
          this.post.thumbnail,
          this.post.picture
        );
        this.addPicture(picture);
        GalleryService.setGallery(this.pictures);
      }
    }
  }
};
</script>

<style scoped></style>
