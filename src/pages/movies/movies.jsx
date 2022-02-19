import { Component, Fragment } from "react";
import {
	getMovies,
	deleteMovie,
	resetMovies,
	saveMovie,
} from "../../services/fakeMovieService";
import { paginate } from "../../utils/paginate";
import ListGroup from "../../components/common/listGroup";
import MoviesTable from "../../components/movies/moviesTable";
import Pagination from "../../components/common/pagination";
import { getGenres } from "../../services/fakeGenreService";
import { sortByProperty } from "../../utils/sort";
import { Link } from "react-router-dom";
import SearchBox from "./../../components/common/searchBox";

class Movies extends Component {
	constructor(props) {
		super(props);
		this.queryTextDefaultValue = "";
		this.state = {
			movies: [],
			genres: [],
			selectedGenre: null,
			currentPage: 1,
			pageSize: 4,
			sortColumn: { path: "title", order: "asc" },
			queryText: this.queryTextDefaultValue,
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

	// Filtering by Text
	handleOnSearchText = (queryText) => {
		const selectedGenre = this.state.genres[0];
		this.setState({ queryText, selectedGenre, currentPage: 1 });
	};

	// Filtering by Genre
	handleGenreSelect = (genre) => {
		this.setState({
			selectedGenre: genre,
			queryText: this.queryTextDefaultValue,
			currentPage: 1,
		});
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
	getProcessedMovies() {
		const {
			pageSize,
			currentPage,
			movies: allMovies,
			selectedGenre,
			sortColumn,
			queryText,
		} = this.state;

		let filteredMovies;

		if (queryText === this.queryTextDefaultValue) {
			filteredMovies =
				selectedGenre && selectedGenre._id
					? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
					: allMovies;
		} else {
			filteredMovies = allMovies.filter((movie) =>
				movie.title.toLowerCase().includes(queryText.toString().toLowerCase())
			);
		}

		const totalCount = filteredMovies.length;

		const sortedMovies = sortByProperty(filteredMovies, sortColumn, true);

		const movies = paginate(sortedMovies, currentPage, pageSize);
		return { movies, totalCount };
	}

	// Helpers to render.
	generateMessage() {
		const length = this.state.movies.length;
		const newMovie = (
			<Link to="/movies/new" className="btn btn-primary">
				New Movie
			</Link>
		);
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
						{newMovie}
					</div>
				);
			default:
				return (
					<div className="alert alert-info m-2">
						<p>{`There are ${length} movies`}</p>
						{newMovie}
					</div>
				);
		}
	}

	generateTable() {
		if (!this.state.movies || this.state.movies < 1) {
			return null;
		}
		const {
			pageSize,
			currentPage,
			genres,
			selectedGenre,
			sortColumn,
			queryText,
		} = this.state;

		const { movies, totalCount } = this.getProcessedMovies();

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
					<SearchBox
						value={queryText}
						label={"Search by Title"}
						placeholder={"Enter the title"}
						name={"searchByTitle"}
						OnChangedText={(newValue) => this.handleOnSearchText(newValue)}
					/>
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
