import Vue from "vue";
import Router from "vue-router";
import { TokenService } from "./services/Token.service";
import RedditService from "./services/Reddit.service";
import Home from "./views/Home";
import Login from "./views/Login";
import LoginHome from "./views/Login/LoginHome";
import LoginCallback from "./views/Login/LoginCallback";
import Gallery from "./views/Gallery";

const moment = require("moment");

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        public: false
      }
    },
    {
      path: "/gallery",
      name: "gallery",
      component: Gallery,
      meta: {
        public: true
      }
    },
    {
      path: "/login",
      component: Login,
      meta: {
        public: true,
        onlyWhenLoggedOut: true
      },
      children: [
        {
          path: "",
          name: "login-home",
          component: LoginHome
        },
        {
          path: "/login-callback",
          name: "login-callback",
          component: LoginCallback
        }
      ]
    }
  ]
});

// Verify access before navigating to each route
router.beforeEach((to, from, next) => {
  return new Promise(resolve => {
    const isPublic = to.matched.some(record => record.meta.public);
    const onlyWhenLoggedOut = to.matched.some(
      record => record.meta.onlyWhenLoggedOut
    );
    const loggedIn = !!TokenService.getToken();

    if (!isPublic && !loggedIn) {
      next({
        path: "/login"
      });
      resolve();
    }

    // Do not allow user to visit login page or register page if they are logged in
    if (loggedIn && onlyWhenLoggedOut) {
      next("/");
      resolve();
    }

    // Check if the token is about to expire
    const tokenExpiresAt = TokenService.getTokenExpiracy();
    if (moment().isAfter(tokenExpiresAt)) {
      const refreshToken = TokenService.getRefreshToken();
      RedditService.refreshToken(refreshToken)
        .then(response => {
          TokenService.saveToken(response.access_token);
          TokenService.saveTokenExpiracy(response.expires_in);
          next();
          resolve();
        })
        .catch(() => {
          next("/login");
          resolve();
        });
    }

    next();
    resolve();
  });
});

export default router;
