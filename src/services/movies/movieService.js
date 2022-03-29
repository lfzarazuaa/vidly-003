import config from "../../config.json";
import http from "../http/httpService";

const moviesEndpoint = `${config.apiEndpoint}/movies`;

function getMovieUrl(id) {
  return `${moviesEndpoint}/${id}`;
}

export function resetMovies() {
  return [];
}

export async function getMovies() {
  const { data: movies } = await http.get(moviesEndpoint);
  return movies;
}

export async function getMovie(id) {
  const { data: movie } = await http.get(getMovieUrl(id));
  return movie;
}

async function movieExist(id) {
  try {
    if (!id || id === "new") return { exist: false };
    const { data: movie } = await http.get(getMovieUrl(id));
    if (movie._id) return { exist: true, movie: movie };
    return { exist: false };
  } catch (error) {
    return { exist: false };
  }
}

export async function saveMovie(movie) {
  const result = await movieExist(movie._id);
  let movieInDb = {};
  if (result.exist) {
    movieInDb = result.movie;
    delete movieInDb.genre;
    delete movieInDb._id;
  }
  movieInDb.title = movie.title;
  movieInDb.genreId = movie.genre._id;
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;
  if (movie.hasOwnProperty("isLikeSelected"))
    movieInDb.isLikeSelected = movie.isLikeSelected;
  if (!movieInDb.hasOwnProperty("isLikeSelected"))
    movieInDb.isLikeSelected = false;
  // Save Movie
  if (result.exist)
    return (await http.put(getMovieUrl(movie._id), movieInDb)).data;
  // Add movie
  return (await http.post(moviesEndpoint, movieInDb)).data;
}

export async function deleteMovie(id) {
  const { data: movie } = await http.delete(getMovieUrl(id));
  return movie;
}
