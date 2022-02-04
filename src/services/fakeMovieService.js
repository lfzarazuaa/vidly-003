import * as genresAPI from "./fakeGenreService";

import { movies } from "./getFakeMovies";

const moviesClone = [...movies];

export function resetMovies() {
  moviesClone.forEach((movie) => movies.push(movie));
  return movies;
}

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find((m) => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find((m) => m._id === movie._id) || {};
  movieInDb.title = movie.title;
  movieInDb.genre = genresAPI.genres.find((g) => g._id === movie.genre._id);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;
  movieInDb.isLikePressed = movie.isLikePressed;

  if (!movieInDb._id) {
    movieInDb._id = Date.now();
    movies.push(movieInDb);
  }

  return movieInDb;
}

export function deleteMovie(id) {
  let movieInDb = movies.find((m) => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  return movieInDb;
}
