import axios from "axios";
import { toast } from "react-toastify";
import logger from "../logger/logService";

axios.interceptors.response.use(null, (error) => {
  const isExpectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!isExpectedError) {
    // Log on unexpected error.
    logger.log(error);
    toast.error("An unexpected error ocurred.");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt,
};
