const moment = require("moment");

const TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const TOKEN_EXPIRY = "token_expires_at";

/**
 * Service responsible for managing tokens in the local storage
 */
const TokenService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveToken(accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  saveRefreshToken(refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  getTokenExpiracy() {
    return moment(localStorage.getItem(TOKEN_EXPIRY));
  },

  saveTokenExpiracy(expiracy) {
    const DATE_RFC2822 = "ddd, DD MMM YYYY HH:mm:ss ZZ";
    let dt = moment();
    dt.add(expiracy, "seconds");
    localStorage.setItem(TOKEN_EXPIRY, dt.format(DATE_RFC2822));
  },

  removeTokenExpiracy() {
    localStorage.remove(TOKEN_EXPIRY);
  }
};

export { TokenService };
