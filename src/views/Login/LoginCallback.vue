<template>
  <div id="login-callback" class="text-center">
    <v-progress-circular :size="50" indeterminate rotate color="light-blue"></v-progress-circular>
  </div>
</template>
<script>
import RedditService from "@/services/Reddit.service";
import { TokenService } from "@/services/Token.service";

export default {
  name: "LoginCallback",
  mounted() {
    const queryParams = this.$route.query;
    if (!queryParams.code) {
      this.$router.push("/login");
    } else {
      RedditService.generateToken(queryParams.code)
        .then(response => {
          TokenService.saveToken(response.access_token);
          TokenService.saveRefreshToken(response.refresh_token);
          TokenService.saveTokenExpiracy(response.expires_in);
          this.$router.push("/");
        })
        .catch(() => {
          this.$router.push("/login");
        });
    }
  }
};
</script>

