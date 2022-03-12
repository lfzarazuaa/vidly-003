import { getGenres } from "../../../services/movies/genreService";
import * as movieService from "../../../services/movies/movieService";
const testMovies = async () => {
  // Get Genres
  const genres = await getGenres();
  console.log(genres);
  // Get Movies
  const movies = await movieService.getMovies();
  console.log(movies);
  // Get Movie by Id
  const movie = await movieService.getMovie(movies[0]._id);
  console.log(`movie`, movie);
  // Add a new movie
  const newMovie = await movieService.saveMovie({
    title: "A new movie",
    numberInStock: 8,
    dailyRentalRate: 7.9,
    isLikeSelected: true,
    genre: {
      _id: genres[0]._id,
    },
  });
  console.log(`newMovie`, newMovie);
  // Update an existing movie
  let updatedMovie = { ...newMovie };
  updatedMovie.title = "A new rock movie";
  updatedMovie.numberInStock = 8;
  updatedMovie.genre._id = genres[1]._id;
  updatedMovie = await movieService.saveMovie(updatedMovie);
  console.log(`updatedMovie`, updatedMovie);
  // Deleting an existing movie
  const deletedMovie = await movieService.deleteMovie(newMovie._id);
  console.log(`deletedMovie`, deletedMovie);
};

export default testMovies;
