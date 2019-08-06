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
        <v-icon>mdi-eye</v-icon>
        &nbsp;
        {{ post.numberOfComments }} <v-icon>mdi-comment</v-icon>
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
export default {
  name: "Post",
  props: {
    post: Object
  }
};
</script>

<style scoped></style>
