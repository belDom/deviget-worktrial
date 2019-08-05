<template>
  <v-layout id="login-view" fill-height justify-center>
    <v-flex xs12 sm8 md4 align-self-center>
      <router-view></router-view>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Login"
};
</script>