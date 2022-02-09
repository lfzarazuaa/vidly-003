import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
import PropTypes from "prop-types";

const Table = (props) => {
	const { items, columns, sortColumn, onSort } = props;
	return (
		<table className="table">
			<TableHeader
				columns={columns} // Columns to render.
				sortColumn={sortColumn} // Column in wich will order.
				onSort={(updatedSortColumn) => onSort(updatedSortColumn)} // Sorting.
			/>
			<TableBody items={items} columns={columns} />
		</table>
	);
};

Table.proptype = {
	items: PropTypes.array.isRequired,
	sortColumn: PropTypes.shape({
		path: PropTypes.string.isRequired,
		order: PropTypes.string.isRequired,
	}),
	onSort: PropTypes.func.isRequired,
};

export default Table;
