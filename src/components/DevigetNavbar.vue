<template>
  <v-navigation-drawer
    app
    permanent
    :expand-on-hover="expandOnHover"
    bottom
    absolute
  >
    <v-list dense nav class="py-0">
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="./../assets/logo.png" alt="Deviget Logo" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Belen Dominguez</v-list-item-title>
          <v-list-item-subtitle>Work trial</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item @click="navigateToPosts">
        <v-list-item-icon>
          <v-icon>mdi-file-document</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Posts</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="navigateToGallery">
        <v-list-item-icon>
          <v-icon>mdi-image</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>My Gallery</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "DevigetNavbar",
  data() {
    return {
      expandOnHover: true
    };
  },
  methods: {
    navigateToGallery() {
      this.$router.push("/gallery");
    },
    navigateToPosts() {
      this.$router.push("/");
    }
  }
};
</script>
