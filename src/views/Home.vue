<template>
  <div id="home">
    <search-posts></search-posts>
    <posts></posts>
  </div>
</template>

<script>
import SearchPosts from "../components/SearchPosts";
import Posts from "../components/Posts";

export default {
  name: "Home",
  components: {
    Posts,
    SearchPosts
  }
};
</script>
