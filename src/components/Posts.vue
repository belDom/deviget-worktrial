<template>
  <v-container fluid grid-list-md pa-2>
    <v-layout>
      <v-flex x12 sm4>
        <side-bar :open-post="selectPost"></side-bar>
      </v-flex>
      <v-flex hidden-sm-and-down md8>
        <post :post="postSelected" v-if="hasPostSelected"></post>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Post from "./Posts/Post";
import SideBar from "./Posts/SideBar";

export default {
  name: "Posts",
  components: {
    Post,
    SideBar
  },
  data() {
    return {
      postSelected: undefined
    };
  },
  computed: {
    ...mapGetters("Posts", ["posts"]),
    hasPostSelected() {
      return !!this.postSelected;
    }
  },
  methods: {
    selectPost(post) {
      this.postSelected = post;
    }
  }
};
</script>

<style scoped></style>
