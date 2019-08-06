<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      :loading="isLoading"
      :items="posts"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar dark color="blue darken-3">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-search"
            label="Search"
          ></v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-layout column>
          <v-flex v-for="item in props.items" :key="item.name" xs12>
            <v-card @click="selectPost(item)">
              <v-list-item three-line>
                <v-list-item-content class="align-self-start">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>

                  <v-list-item-subtitle>
                    By {{ item.author }} - Created
                    {{ item.entryDate | moment("from", "now") }}
                  </v-list-item-subtitle>

                  <v-list-item-subtitle>
                    <v-icon small v-if="item.visited">mdi-eye-check</v-icon>
                    <v-icon small v-else>mdi-eye</v-icon>
                    <v-icon small v-if="item.savedToGallery"
                      >mdi-bookmark-check</v-icon
                    >
                    <v-icon small v-else>mdi-bookmark</v-icon>
                    {{ item.numberOfComments }}
                    <v-icon small>mdi-comment</v-icon>

                    <v-icon small v-if="item.archived">mdi-package-up</v-icon>
                    <v-icon small v-else>mdi-archive</v-icon>
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar size="125" tile v-if="item.hasThumbnail()">
                  <v-img :src="item.thumbnail"></v-img>
                </v-list-item-avatar>
              </v-list-item>
            </v-card>
          </v-flex>
        </v-layout>
      </template>

      <template v-slot:footer>
        <v-layout mt-2 wrap align-center justify-center>
          <v-spacer></v-spacer>

          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-arrow-left-bold</v-icon>
          </v-btn>
          <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
            <v-icon>mdi-arrow-right-bold</v-icon>
          </v-btn>
        </v-layout>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { PostsVisitedService } from "../../services/PostsVisited.service";

export default {
  name: "SideBar",
  props: {
    openPost: Function
  },
  data() {
    return {
      search: "",
      sortDesc: false,
      page: 1,
      itemsPerPage: 5,
      sortBy: "name",
      isLoading: false
    };
  },
  computed: {
    ...mapGetters("Posts", [
      "posts",
      "afterPosts",
      "beforePosts",
      "postsVisited"
    ]),
    numberOfPages() {
      return Math.ceil(this.posts.length / this.itemsPerPage);
    }
  },
  methods: {
    ...mapMutations("Posts", ["addPostVisited", "flagPostAsVisited"]),
    ...mapActions("Posts", ["getPosts"]),
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) {
        this.page += 1;
      } else if (this.afterPosts) {
        this.isLoading = true;
        this.getPosts({ after: this.afterPosts }).finally(() => {
          this.page += 1;
          this.isLoading = false;
        });
      }
    },
    formerPage() {
      if (this.page - 1 >= 1) {
        this.page -= 1;
      }
    },
    selectPost(post) {
      if (!this.postsVisited.includes(post.id)) {
        this.flagPostAsVisited(post);
        this.addPostVisited(post.id);
        PostsVisitedService.setPostsVisited(this.postsVisited);
      }

      this.openPost(post);
    }
  },
  mounted() {
    this.isLoading = true;
    this.getPosts().finally(() => {
      this.isLoading = false;
    });
  }
};
</script>
