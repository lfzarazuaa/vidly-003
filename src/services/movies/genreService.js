import http from "../http/httpService";
import enviroment from "../enviroment/enviromentService";
const genresEndpoint = `${enviroment.apiEndpoint}/genres`;

export async function getGenres() {
  const { data: genres } = await http.get(genresEndpoint);
  return genres;
}
