<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
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
            <v-card @click="openPost(item)">
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
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn dark text color="primary" class="ml-2" v-on="on">
                {{ itemsPerPage }}
                <v-icon>mdi-keyboard_arrow_down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4 grey--text"
            >Page {{ page }} of {{ numberOfPages }}</span
          >
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
import { mapGetters } from "vuex";

export default {
  name: "SideBar",
  props: {
    openPost: Function
  },
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: "",
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name"
    };
  },
  computed: {
    ...mapGetters("Posts", ["posts"]),
    numberOfPages() {
      return Math.ceil(this.posts.length / this.itemsPerPage);
    }
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    }
  }
};
</script>
