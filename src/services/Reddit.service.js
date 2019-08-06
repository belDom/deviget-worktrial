import Request from "./Request";
import { TokenService } from "./Token.service";

const PATHS = {
  BASE_URL: "https://www.reddit.com/api/v1/",
  AUTHORIZE: "authorize",
  ACCESS_TOKEN: "access_token/",
  POSTS_BASE_URL: "https://oauth.reddit.com/r/",
  POSTS_TOP: "top"
};

/**
 * Generate Reddit access URI
 */
const _retrieveAccessURI = () => {
  const CLIENT_ID = process.env.VUE_APP_REDDIT_USERNAME;
  const REDIRECT_URI = process.env.VUE_APP_REDDIT_REDIRECT_URL;

  return (
    PATHS.BASE_URL +
    PATHS.AUTHORIZE +
    "?client_id=" +
    CLIENT_ID +
    "&response_type=code" +
    "&state=bDominguezWorkTrial" +
    "&redirect_uri=" +
    REDIRECT_URI +
    "&duration=permanent" +
    "&scope=read"
  );
};

/**
 * Create auth configuration
 * @return {Object}
 */
const _retrieveAuthConfig = () => {
  return {
    headers: {
      Authorization: "Basic"
    },
    auth: {
      username: process.env.VUE_APP_REDDIT_USERNAME,
      password: process.env.VUE_APP_REDDIT_SECRET_KEY
    }
  };
};

/**
 * Get access token
 * @param {String} code the code returns in the URL by reddit
 */
const _getAccessToken = code => {
  const config = _retrieveAuthConfig();
  const formData = new FormData();
  formData.append("grant_type", "authorization_code");
  formData.append("code", code);
  formData.append("redirect_uri", process.env.VUE_APP_REDDIT_REDIRECT_URL);

  return Request.post(PATHS.BASE_URL + PATHS.ACCESS_TOKEN, formData, config);
};

/**
 * Refresh token
 * @param {String} refreshToken the refresh token
 */
const _refreshToken = refreshToken => {
  const config = _retrieveAuthConfig();
  const formData = new FormData();
  formData.append("grant_type", "refresh_token");
  formData.append("refresh_token", refreshToken);

  return Request.post(PATHS.BASE_URL + PATHS.ACCESS_TOKEN, formData, config);
};

/**
 * Get Subrredit Top Posts
 * @param {String} subrredit the name of the subrredit that wants to be loaded
 * @param {Number} limit the number of posts to be retrieved
 * @param {String} before the before posts pointer
 * @param {String} after the after pointer
 */
const _getTopPosts = (
  subrredit = "earthporn",
  limit = 15,
  before = undefined,
  after = undefined
) => {
  const token = TokenService.getToken();
  const config = {
    headers: { Authorization: "bearer " + token }
  };
  let URL =
    PATHS.POSTS_BASE_URL +
    subrredit +
    "/" +
    PATHS.POSTS_TOP +
    "?limit=" +
    limit;

  if (after) {
    URL = URL + "&after=" + after;
  }

  if (before) {
    URL = URL + "&before=" + before;
  }

  return Request.get(URL, config);
};

export default {
  generateToken: _getAccessToken,
  getTopPosts: _getTopPosts,
  refreshToken: _refreshToken,
  retrieveAccessURI: _retrieveAccessURI
};
