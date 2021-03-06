import enviroment from "../enviroment/enviromentService";
import http from "../http/httpService";

const usersEndpoint = `${enviroment.apiEndpoint}/users`;

function getUserUrl(id) {
  return `${usersEndpoint}/${id}`;
}

export async function register(user) {
  const postUser = {
    email: user.username,
    password: user.password,
    name: user.fullname,
  };
  return (await http.post(usersEndpoint, postUser)).headers["x-auth-token"];
}
