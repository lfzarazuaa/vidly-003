import http from "../http/httpService";
import config from "../../config.json";
const genresEndpoint = `${config.apiEndpoint}/genres`;

export async function getGenres() {
  const { data: genres } = await http.get(genresEndpoint);
  return genres;
}
