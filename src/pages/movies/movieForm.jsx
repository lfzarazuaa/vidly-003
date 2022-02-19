import React from "react";
import Joi from "joi-browser";
import Form from "../../components/common/form";
import { getMovie, saveMovie } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";
import { isEmptyObject } from "../../utils/objectFunctions";

class MovieForm extends Form {
	constructor(props) {
		super(props);
		const { id: _id } = props.match.params;
		this._id = _id;
		this.componentsProps = {
			title: {
				name: "title",
				label: "Title",
			},
			genre: {
				name: "genre",
				label: "Genre",
				type: "list",
			},
			numberInStock: {
				name: "numberInStock",
				label: "Number in Stock",
				type: "number",
			},
			rate: {
				name: "dailyRentalRate",
				label: "Rate",
				type: "number",
			},
		};
		const { title, genre, numberInStock, rate } = this.componentsProps;
		this.schema = {
			[title.name]: Joi.string().required().label(title.label),
			[genre.name]: Joi.string().required().label(genre.label),
			[numberInStock.name]: Joi.number()
				.min(0)
				.required()
				.label(numberInStock.label),
			[rate.name]: Joi.number().min(0).max(10).required().label(rate.label),
		};

		this.state = {
			data: {
				[title.name]: "",
				[genre.name]: "",
				[numberInStock.name]: "",
				[rate.name]: "",
			},
			errors: {},
		};
	}

	componentDidMount() {
		let data, movie;
		const { _id, componentsProps, state, props } = this;
		const { genre } = componentsProps;
		this.genres = getGenres();
		if (_id === "new") {
			data = state.data;
			data[genre.name] = this.genres[0]._id;
		} else {
			movie = getMovie(_id);
			if (isEmptyObject(movie)) return this.props.history.replace("/not-found");
			data = this.toViewModel(movie);
		}
		this.setState({
			data,
		});
	}

	doSubmit = () => {
		const { data } = this.state;
		const movie = this.toModel(data);
		saveMovie(movie);
	};

	toViewModel(movie) {
		const { title, genre, numberInStock, rate } = this.componentsProps;
		const movieViewModel = {
			[title.name]: movie.title,
			[genre.name]: movie.genre._id,
			[numberInStock.name]: movie.numberInStock,
			[rate.name]: movie.dailyRentalRate,
		};
		return movieViewModel;
	}

	toModel(movieViewModel) {
		const { title, genre, numberInStock, rate } = this.componentsProps;
		return {
			_id: this._id,
			[title.name]: movieViewModel[title.name],
			[genre.name]: { _id: movieViewModel[genre.name] },
			[numberInStock.name]: movieViewModel[numberInStock.name].toString(),
			[rate.name]: movieViewModel[rate.name].toString(),
		};
	}

	render() {
		const { handleOnSubmit, componentsProps, genres } = this;
		const { title, genre, numberInStock, rate } = componentsProps;
		return (
			<form onSubmit={(e) => handleOnSubmit(e, "/movies")}>
				{this.renderInput(title)}
				{this.renderSelect(genre, genres)}
				{this.renderInput(numberInStock)}
				{this.renderInput(rate)}
				{this.renderReturnButton("/movies")}
				{this.renderSubmitButton("Submit")}
			</form>
		);
	}
}

export default MovieForm;
