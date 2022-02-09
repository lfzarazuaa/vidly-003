import { Component, Fragment } from "react";
import {
	getMovies,
	deleteMovie,
	resetMovies,
	saveMovie,
} from "../../services/fakeMovieService";
import { paginate } from "../../utils/paginate";
import ListGroup from "../common/listGroup";
import MoviesTable from "./moviesTable";
import Pagination from "../common/pagination";
import { getGenres } from "../../services/fakeGenreService";
import { sortByProperty } from "../../utils/sort";

class Movies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: [],
			genres: [],
			selectedGenre: null,
			currentPage: 1,
			pageSize: 4,
			sortColumn: { path: "title", order: "asc" },
		};
	}

	// Lifecycle
	componentDidMount() {
		// For loading components.
		const genres = [{ _id: "", name: "All Genres" }].concat(getGenres());
		this.setState({
			movies: getMovies(),
			genres,
			selectedGenre: genres[0],
		});
	}

	// Movie own handlers.
	handleOnLike = (movieId) => {
		let movieToChangeLike = this.state.movies.find(
			(movie) => movie._id === movieId
		);
		movieToChangeLike.isLikePressed = !movieToChangeLike.isLikePressed;
		const movieInDb = saveMovie(movieToChangeLike); // Save on Db
		console.log(movieInDb);
		this.setState({ movies: getMovies() });
	};

	// Table handlers.
	handleOnReset = () => {
		let movies = resetMovies();
		this.setState({ movies: movies });
	};

	handleOnDelete = (movieId) => {
		try {
			deleteMovie(movieId);
			this.setState({ movies: getMovies() });
		} catch (error) {
			console.log(error);
		}
	};

	// Filtering
	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	// Sorting
	handleOnSort = (sortColumn) => {
		// New state calculated on the component.
		this.setState({ sortColumn });
	};

	// Pagination
	handleOnPageChange = (page) => {
		this.setState({ currentPage: page });
	};

	// Do Filtering, Order and Pagination operations
	getProccessedMovies() {
		const {
			pageSize,
			currentPage,
			movies: allMovies,
			selectedGenre,
			sortColumn,
		} = this.state;

		const filteredMovies =
			selectedGenre && selectedGenre._id
				? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
				: allMovies;

		const totalCount = filteredMovies.length;

		const sortedMovies = sortByProperty(filteredMovies, sortColumn, true);

		const movies = paginate(sortedMovies, currentPage, pageSize);
		return { movies, totalCount };
	}

	// Helpers to render.
	generateMessage() {
		const length = this.state.movies.length;
		switch (length) {
			case 0:
				return (
					<div className="alert alert-warning m-2">
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
					<div className="alert alert-warning m-2">
						<p>There is one movie</p>
					</div>
				);
			default:
				return (
					<div className="alert alert-info m-2">
						<p>{`There are ${length} movies`}</p>
					</div>
				);
		}
	}

	generateTable() {
		if (!this.state.movies || this.state.movies < 1) {
			return null;
		}
		const { pageSize, currentPage, genres, selectedGenre, sortColumn } =
			this.state;

		const { movies, totalCount } = this.getProccessedMovies();

		return (
			<div className="row">
				<div className="col col-sm-3">
					<ListGroup
						items={genres}
						selectedItem={selectedGenre}
						onItemSelect={(genre) => this.handleGenreSelect(genre)}
					/>
				</div>
				<div className="col col-sm">
					<MoviesTable
						movies={movies}
						sortColumn={sortColumn}
						onLike={(movieId) => this.handleOnLike(movieId)}
						onDelete={(movieId) => this.handleOnDelete(movieId)}
						onSort={(sortColumn) => this.handleOnSort(sortColumn)}
					/>
					<Pagination
						itemsCount={totalCount}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={(page) => this.handleOnPageChange(page)}
					/>
				</div>
			</div>
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
