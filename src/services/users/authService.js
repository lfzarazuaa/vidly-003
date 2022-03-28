import config from "../../config.json";
import http from "../http/httpService";
import jwtDecode from "jwt-decode";
const authEndpoint = `${config.apiEndpoint}/auth`;
const tokenKey = "token";

export async function login(email, password) {
  const { data: jwt } = await http.post(authEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export async function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
};
