import axios from "axios";

axios.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(error) {
    if (error.response) {
      return Promise.reject(error);
    }
  }
);

export default {
  get(url, config) {
    return axios({
      method: "get",
      url,
      ...config
    });
  },
  post(url, data, config) {
    return axios({
      method: "post",
      url,
      data,
      ...config
    });
  },
  put(url, data, config) {
    return axios({
      method: "put",
      url,
      data,
      ...config
    });
  },
  delete(url, config) {
    return axios({
      method: "delete",
      url,
      ...config
    });
  }
};
