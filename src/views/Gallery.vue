<template>
  <v-layout>
    <v-flex xs12 sm12>
      <v-card>
        <v-container grid-list-sm fluid>
          <v-layout wrap v-if="hasPictures">
            <v-flex
              v-for="(picture, index) in pictures"
              :key="index"
              xs12
              sm4
              d-flex
              child-flex
            >
              <v-card flat tile class="d-flex">
                <v-img
                  :src="picture.url"
                  :lazy-src="picture.thumbnail"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-layout fill-height align-center justify-center ma-0>
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-layout>
                  </template>
                </v-img>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout v-else>
            <v-flex class="text-center">
              <v-btn @click="navigateToPosts"
                >Go to your posts and add pictures</v-btn
              >
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { GalleryService } from "../services/Gallery.service";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Gallery",
  computed: {
    ...mapGetters("Gallery", ["pictures"]),
    hasPictures() {
      return this.pictures.length > 0;
    }
  },
  methods: {
    ...mapMutations("Gallery", ["setPictures"]),
    navigateToPosts() {
      this.$router.push("/");
    }
  },
  mounted() {
    const pictures = GalleryService.getGallery();
    this.setPictures(pictures);
  }
};
</script>

<style scoped></style>
