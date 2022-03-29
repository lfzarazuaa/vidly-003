const enviroment = process.env;

const apiEndpoint =
  enviroment.REACT_APP_API_ENDPOINT || "http://localhost:3900/api";

export default {
  apiEndpoint,
};
// apiEndpoint = enviroment.REACT_APP_API_URL.contains("localhost")?
