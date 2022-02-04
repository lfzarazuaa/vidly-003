import { Component, Fragment } from "react";
import Formatter from "../utils/formatters";
import LikeIcon from "./common/likeIcon";
import {
  getMovies,
  deleteMovie,
  resetMovies,
  saveMovie,
} from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import {
  paginateCollection,
  calculteNumberOfItem,
  updatePageNumber,
} from "../utils/pagination";

class Movies extends Component {
  constructor(props) {
    super(props);
    const movies = getMovies();
    this.state = {
      movies,
      paginationInfo: {
        itemsCount: movies.length,
        pageSize: 9,
        selectedPage: 1,
      },
    };
  }

  handleOnReset = () => {
    let movies = resetMovies();
    this.setState({ movies: movies });
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
      this.setState({ movies, paginationInfo });
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

  generateMovieDto() {
    const { pageSize, selectedPage: pageNumber } = this.state.paginationInfo;
    const allMovies = this.state.movies;
    let moviesPaginated = paginateCollection(allMovies, pageNumber, pageSize);
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

  generateTable() {
    if (!this.state.movies || this.state.movies < 1) {
      return null;
    }
    const { itemsCount, pageSize, selectedPage } = this.state.paginationInfo;
    return (
      <Fragment>
        <div className="row">
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
