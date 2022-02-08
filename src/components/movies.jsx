import { Component, Fragment } from "react";
import Formatter from "../utils/formatters";
import LikeIcon from "./common/likeIcon";
import {
  getMovies,
  deleteMovie,
  resetMovies,
  saveMovie,
} from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

import Pagination from "./common/pagination";
import {
  paginateCollection,
  calculteNumberOfItem,
  updatePageNumber,
} from "../utils/pagination";
import ListSelect from "./common/listSelect";

class Movies extends Component {
  constructor(props) {
    super(props);
    const movies = getMovies();
    const genresInfo = {
      genres: getGenres(),
      selectedGenre: -1,
    };
    this.state = {
      movies,
      moviesByGenre: movies,
      genresInfo,
      paginationInfo: {
        itemsCount: movies.length,
        pageSize: 9,
        selectedPage: 1,
      },
    };
  }

  handleOnReset = () => {
    let movies = resetMovies();
    const { paginationInfo } = this.state;
    paginationInfo.itemsCount = movies.length;
    paginationInfo.selectedPage = 1;
    this.setState({ movies: movies, paginationInfo });
  };

  generateMessage() {
    const length = this.state.movies.length;
    switch (length) {
      case 0:
        return (
          <div className="alert alert-warning">
            <p style={{ display: "inline" }}>There are no movies</p>
            <button
              className="ml-2 btn btn-success"
              onClick={this.handleOnReset}
            >
              Reset
            </button>
          </div>
        );
      case 1:
        return (
          <div className="alert alert-warning">
            <p>There is one movie</p>
          </div>
        );
      default:
        return (
          <div className="alert alert-info">
            <p>{`There are ${length} movies`}</p>
          </div>
        );
    }
  }

  handleOnLike = (movieId) => {
    let movieToChangeLike = this.state.movies.find(
      (movie) => movie._id === movieId
    );
    movieToChangeLike.isLikePressed = !movieToChangeLike.isLikePressed;
    movieToChangeLike = saveMovie(movieToChangeLike); // Save on Db
    this.setState({ movies: this.state.movies });
  };

  handleOnDelete = (movieId) => {
    try {
      const deletedMovie = deleteMovie(movieId);
      let { movies, paginationInfo } = this.state;
      movies = getMovies();
      paginationInfo.itemsCount = movies.length;
      const { itemsCount, pageSize, selectedPage } = paginationInfo;
      paginationInfo.selectedPage = updatePageNumber(
        itemsCount,
        pageSize,
        selectedPage
      );
      const moviesByGenre = this.getMoviesByGenre();
      this.setState({ movies, paginationInfo, moviesByGenre });
    } catch (error) {
      console.log(error);
    }
  };

  handleOnPageChanged = (pageNumber) => {
    // TODO: Logic for update table

    // Select the correct number
    const { paginationInfo } = this.state;
    if (paginationInfo.selectedPage === pageNumber) return;
    paginationInfo.selectedPage = pageNumber;
    this.setState({ paginationInfo });
  };

  handleOnDefaultElementSelected = () => {
    const { genresInfo, paginationInfo } = this.state;
    genresInfo.selectedGenre = -1;
    const moviesByGenre = this.getMoviesByGenre();
    paginationInfo.itemsCount = moviesByGenre.length;
    paginationInfo.selectedPage = 1;
    this.setState({ genresInfo, paginationInfo, moviesByGenre });
  };

  getMoviesByGenre = () => {
    const { genres, selectedGenre } = this.state.genresInfo;

    let moviesByGenre = this.state.movies;
    if (selectedGenre >= 0) {
      moviesByGenre = moviesByGenre.filter((movie) => {
        return movie.genre._id === genres[selectedGenre]._id;
      });
    }
    return moviesByGenre;
  };

  handleOnGenreSelected = (id) => {
    const { genresInfo } = this.state;
    let { moviesByGenre } = this.state;

    genresInfo.selectedGenre = genresInfo.genres.findIndex(
      (genre) => genre._id === id
    );

    const { paginationInfo } = this.state;

    moviesByGenre = this.getMoviesByGenre();

    paginationInfo.itemsCount = moviesByGenre.length;
    paginationInfo.selectedPage = 1;

    this.setState({ genresInfo, paginationInfo, moviesByGenre });
  };

  generateMovieDto() {
    const { moviesByGenre, paginationInfo } = this.state;

    const { genres, selectedGenre } = this.state.genresInfo;

    let moviesPaginated = paginateCollection(
      moviesByGenre,
      paginationInfo.selectedPage,
      paginationInfo.pageSize
    );

    return moviesPaginated.map((movie) => {
      return {
        title: movie.title,
        genre: movie.genre.name,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate,
        isLikePressed: (
          <LikeIcon
            isLikeSelected={movie.isLikePressed === true}
            onClickLike={() => this.handleOnLike(movie._id)}
          ></LikeIcon>
        ),
        deleteButton: (
          <button
            className="btn btn-danger"
            onClick={() => this.handleOnDelete(movie._id)}
          >
            Delete
          </button>
        ),
      };
    });
  }

  generateGenreDto() {
    return this.state.genresInfo.genres.map((genre) => {
      const { _id: id, name } = genre;
      return { id, name };
    });
  }

  generateTable() {
    if (!this.state.movies || this.state.movies < 1) {
      return null;
    }
    const { itemsCount, pageSize, selectedPage } = this.state.paginationInfo;
    return (
      <Fragment>
        <div className="row">
          <div className="col-12 col-md-4">
            <ListSelect
              mainMessage="All genres"
              selectedElement={this.state.genresInfo.selectedGenre}
              onDefaultElementSelected={() =>
                this.handleOnDefaultElementSelected()
              }
              onElementSelected={(id) => this.handleOnGenreSelected(id)}
              elements={this.generateGenreDto()}
            />
          </div>
          <div className="col-12 col-md-8">
            <table className="table ml-2">
              <thead>
                <tr>
                  <th key={1} scope="col">
                    #
                  </th>
                  <th key={2} scope="col">
                    Title
                  </th>
                  <th key={3} scope="col">
                    Genre
                  </th>
                  <th key={4} scope="col">
                    Stock
                  </th>
                  <th key={5} scope="col">
                    Rate
                  </th>
                  <th key={6} scope="col">
                    Like
                  </th>
                  <th key={7} scope="col">
                    {" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.generateMovieDto().map((movie, x) =>
                  Formatter.formatAsTableRow(
                    movie,
                    calculteNumberOfItem(x, pageSize, selectedPage)
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <Pagination
            itemsCount={itemsCount}
            pageSize={pageSize}
            selectedPage={selectedPage}
            onPageChanged={(pageNumber) => {
              this.handleOnPageChanged(pageNumber);
            }}
          ></Pagination>
        </div>
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        {this.generateMessage()}
        {this.generateTable()}
      </Fragment>
    );
  }
}

export default Movies;
