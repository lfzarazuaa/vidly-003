import { updateSortColumn } from "../../utils/sort";
import PropTypes from "prop-types";
import SortIcon from "../common/sortIcon";
// Interface
// columns: array of strings
// sortColumn: object
// onSort: function
const TableHeader = (props) => {
	const { columns, sortColumn, onSort } = props;
	const raiseSort = (propertyPath) => {
		// Doing the logic that belongs to the component.
		onSort(updateSortColumn(sortColumn, propertyPath)); // Pass the new state to the caller component
	};
	const calculateSortIconValues = (column) => {
		let [isAscSort, isSorting] = [true, false];
		if (column.path === sortColumn.path) {
			isAscSort = sortColumn.order === "asc";
			isSorting = true;
		}
		return { isAscSort, isSorting };
	};
	const getColumnHeader = (column) => {
		if (column.path) {
			const { isAscSort, isSorting } = calculateSortIconValues(column);
			return (
				<th
					className="click-enabled"
					key={column._id}
					onClick={() => raiseSort(column.path)}
				>
					{column.headerContent}{" "}
					<SortIcon isAscSort={isAscSort} isSorting={isSorting} />
				</th>
			);
		}
		return <th key={column._id}>{column.headerContent}</th>;
	};
	return (
		<thead>
			<tr>{columns.map(getColumnHeader)}</tr>
		</thead>
	);
};

TableHeader.propTypes = {
	columns: PropTypes.arrayOf(
		PropTypes.shape({ cellContent: PropTypes.func.isRequired })
	),
	sortColumn: PropTypes.shape({
		path: PropTypes.string.isRequired,
		order: PropTypes.string.isRequired,
	}),
};

export default TableHeader;
