import axios from "axios";
import Config from "react-native-config";

axios.defaults.baseURL = Config.API_BASE_URL;

axios.interceptors.response.use(null, (error) => {

  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (error.response.status === 401) {
    // authStorage.logout();
  }

  if (!expectedError) {
    // console.log("Unexpected error: ", error);
  }

  return Promise.reject(error);
});

const http = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  put: axios.put,
  delete: axios.delete
};

export default http;
