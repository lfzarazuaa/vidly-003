import { Component, Fragment } from "react";
import Formatter from "../../utils/formatters";
import LikeIcon from "../common/likeIcon";
import {
	getMovies,
	deleteMovie,
	resetMovies,
	saveMovie,
} from "../../services/fakeMovieService";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import ListGroup from "../common/listGroup";
import { getGenres } from "../../services/fakeGenreService";
import MoviesTable from "./moviesTable";

class Movies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: [],
			genres: [],
			selectedGenre: null,
			currentPage: 1,
			pageSize: 4,
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

	// Pagination
	handleOnPageChange = (page) => {
		this.setState({ currentPage: page });
	};

	// Filtering
	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};
	// Helpers to render.
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

	generateTable() {
		if (!this.state.movies || this.state.movies < 1) {
			return null;
		}
		const {
			pageSize,
			currentPage,
			movies: allMovies,
			genres,
			selectedGenre,
		} = this.state;

		const filteredMovies =
			selectedGenre && selectedGenre._id
				? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
				: allMovies;

		const count = filteredMovies.length;

		const movies = paginate(filteredMovies, currentPage, pageSize);

		const generateMovieDto = () => {
			return movies.map((movie) => {
				return {
					title: movie.title,
					genre: movie.genre.name,
					numberInStock: movie.numberInStock,
					dailyRentalRate: movie.dailyRentalRate,
					isLikePressed: (
						<LikeIcon
							isLikeSelected={movie.isLikePressed}
							onClickLike={() => this.handleOnLike(movie._id)}
						/>
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
		};

		return (
			<div className="row">
				<div className="col col-sm-3">
					<ListGroup
						items={genres}
						selectedItem={selectedGenre}
						onItemSelect={(genre) => this.handleGenreSelect(genre)}
					/>
				</div>
				<MoviesTable />
				<div className="col col-sm">
					<table className="table">
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
							{generateMovieDto().map((movie, counter) =>
								Formatter.formatAsTableRow(movie, counter)
							)}
						</tbody>
					</table>
					<Pagination
						itemsCount={count}
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
