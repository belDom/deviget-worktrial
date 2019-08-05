<template>
  <v-card max-width="344" class="mx-auto">
    <v-img class="white--text" height="200px" src="@/assets/redditLogo.png"></v-img>
    <v-card-title class="align-end fill-height">Grant access to Reddit</v-card-title>
    <v-card-text>In order for this application to work you must grant access</v-card-text>
    <v-card-actions>
      <v-btn outlined block color="red darken-1" @click="grantAccess">Grant access</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import RedditService from "@/services/Reddit.service";

export default {
  name: "LoginHome",
  methods: {
    grantAccess() {
      window.location = RedditService.retrieveAccessURI();
    }
  }
};
</script>
