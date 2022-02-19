import React from "react";
import PropTypes from "prop-types";

const TableBody = (props) => {
	const { items, columns } = props;
	const renderCell = (item, column) => column.cellContent(item);
	return (
		<tbody>
			{items.map((item) => (
				<tr key={item._id}>
					{columns.map((column) => (
						<td key={column._id}>{renderCell(item, column)}</td>
					))}
				</tr>
			))}
		</tbody>
	);
};

TableBody.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({ _id: PropTypes.string.isRequired })
	),
	columns: PropTypes.arrayOf(
		PropTypes.shape({ cellContent: PropTypes.func.isRequired })
	),
};

export default TableBody;
