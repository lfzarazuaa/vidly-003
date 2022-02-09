import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Formatter from "../../utils/formatters";
import LikeIcon from "../common/likeIcon";
import SortIcon from "../common/sortIcon";
import { updateSortColumn } from "../../utils/sort";

class MoviesTable extends Component {
	render() {
		const { movies, sortColumn, onLike, onDelete, onSort } = this.props;

		const raiseSort = (propertyPath) => {
			// Doing the logic that belongs to the component.
			onSort(updateSortColumn(sortColumn, propertyPath)); // Pass the new state to the caller component
		};

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
							onClickLike={() => onLike(movie._id)}
						/>
					),
					deleteButton: (
						<button
							className="btn btn-danger"
							onClick={() => onDelete(movie._id)}
						>
							Delete
						</button>
					),
				};
			});
		};

		return (
			<table className="table">
				<thead>
					<tr>
						<th key={1} scope="col">
							#
						</th>
						<th onClick={() => raiseSort("title")} key={2} scope="col">
							<span>Title </span>
							<SortIcon isAscSort={true} isSorting={true} />
						</th>
						<th onClick={() => raiseSort("genre.name")} key={3} scope="col">
							<span>Genre </span>
							<SortIcon isAscSort={true} />
						</th>
						<th onClick={() => raiseSort("numberInStock")} key={4} scope="col">
							<span>Stock </span>
							<SortIcon isAscSort={true} />
						</th>
						<th
							onClick={() => raiseSort("dailyRentalRate")}
							key={5}
							scope="col"
						>
							<span>Rate </span>
							<SortIcon isAscSort={true} />
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
		);
	}
}

MoviesTable.proptype = {
	movies: PropTypes.array.isRequired,
	sortColumn: PropTypes.shape({
		path: PropTypes.string.isRequired,
		order: PropTypes.string.isRequired,
	}),
	onLike: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	onSort: PropTypes.func.isRequired,
};

export default MoviesTable;
