import React, { Component } from "react";
import { getMovie } from "../../services/fakeMovieService";
class MovieForm extends Component {
	handleOnSave = () => {
		this.props.history.push("/movies");
	};

	constructor(props) {
		super(props);
		const { id } = props.match.params;
		console.log(id);
		const movie = getMovie(id);
		console.log(movie);
		this.state = {
			movie: movie,
		};
	}

	render() {
		const { movie } = this.state;
		return (
			<div>
				<h1>
					Movie Form {movie._id} {movie.title}
				</h1>
				<button className="btn btn-success" onClick={this.handleOnSave}>
					Return
				</button>
			</div>
		);
	}
}

export default MovieForm;
