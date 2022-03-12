import React, { Component } from "react";
import PropTypes from "prop-types";
import LikeIcon from "../common/likeIcon";
import { addIdToItems } from "../../utils/objectFunctions";
import Table from "../common/table";
import { Link } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";

class MoviesTable extends Component {
  columns = [
    {
      headerContent: <span className="fa fa-list-ol" aria-hidden="true"></span>,
      cellContent: (movie) => (
        <div>
          <span className="fa fa-id-card" aria-hidden="true"></span>
          <span> {movie.counter}</span>
        </div>
      ),
    }, // Not able to sort.
    {
      path: "title", // Path for sorting.
      headerContent: "Title",
      cellContent: (movie) => (
        <Link
          className="btn btn-outline-info"
          to={this.generateMovieLink(movie)}
        >
          {movie.title}
        </Link>
      ),
    },
    {
      path: "genre.name", // Path for sorting.
      headerContent: "Genre",
      cellContent: (movie) => movie.genre.name,
    },
    {
      path: "numberInStock", // Path for sorting.
      headerContent: "Stock",
      cellContent: (movie) => movie.numberInStock,
    },
    {
      path: "dailyRentalRate", // Path for sorting.
      headerContent: "Rate",
      cellContent: (movie) => movie.dailyRentalRate,
    },
    {
      headerContent: (
        <span className="fa fa-heartbeat" aria-hidden="true"></span>
      ),
      cellContent: (movie) => (
        <LikeIcon
          isLikeSelected={movie.isLikeSelected}
          onClickLike={() => this.props.onLike(movie._id)}
        />
      ),
    }, // Not able to sort.
    {
      headerContent: (
        <span className="fa fa-window-close" aria-hidden="true"></span>
      ),
      cellContent: (movie) => (
        <button
          className="btn btn-danger"
          onClick={() => this.props.onDelete(movie._id)}
        >
          Delete
        </button>
      ),
    }, // Not able to sort.
  ];

  constructor(props) {
    super(props);
    this.columns = addIdToItems(this.columns);
  }

  generateMovieLink = (movie) => {
    return `movies/${movie._id}`;
  };
  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Fragment>
        <Table
          items={movies} // Data to pass
          columns={this.columns} // Columns distribution
          sortColumn={sortColumn} // Column in wich will order.
          onSort={(updatedSortColumn) => onSort(updatedSortColumn)} // Sorting
        />
      </Fragment>
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
