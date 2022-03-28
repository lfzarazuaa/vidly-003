import config from "../../config.json";
import http from "../http/httpService";

const authEndpoint = `${config.apiEndpoint}/auth`;

export async function login(email, password) {
  return await http.post(authEndpoint, { email, password });
}
