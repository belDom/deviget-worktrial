<template>
  <v-container fluid grid-list-md pa-2>
    <v-card>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline">{{
            post.title
          }}</v-list-item-title>
          <v-list-item-subtitle
            >by {{ post.author }} &#8211;
            {{ post.entryDate | moment("from", "now") }}</v-list-item-subtitle
          >
        </v-list-item-content>
        <v-spacer></v-spacer>
        <v-badge overlap>
          <template v-slot:badge>{{ post.numberOfComments }}</template>
          <v-icon>mdi-comment</v-icon>
        </v-badge>
      </v-list-item>

      <v-img :lazy-src="post.thumbnail" :src="post.picture"></v-img>

      <v-card-text>
       {{post.title}}
      </v-card-text>

      <v-card-actions>
        <v-btn icon disabled>
          <v-icon>mdi-eye</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>
        <v-btn icon :disabled="post.archived">
          <v-icon>mdi-archive</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Post",
  props: {
    post: Object
  },
  computed: {
    ...mapGetters("Application", ["layoutSplitActive"])
  }
};
</script>

<style scoped></style>
