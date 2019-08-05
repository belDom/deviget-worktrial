<template>
  <v-app>
    <deviget-navbar v-if="!isLoginPage"></deviget-navbar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <v-spacer></v-spacer>
      <div>Belen Dominguez Work Trial; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import DevigetNavbar from "./components/DevigetNavbar";

export default {
  name: "App",
  components: { DevigetNavbar },
  computed: {
    isLoginPage: function() {
      return (
        this.$route.name === "login-home" ||
        this.$route.name === "login-callback"
      );
    }
  }
};
</script>
