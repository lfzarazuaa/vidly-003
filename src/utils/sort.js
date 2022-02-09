import _ from "lodash";
import { getObjectProperty } from "./objectFunctions";

function sortByProperty(
	items,
	sortColumn,
	pathColumnProperty = "path",
	orderColumnProperty = "order"
) {
	return _.orderBy(
		items,
		[getObjectProperty(sortColumn, pathColumnProperty)],
		[getObjectProperty(sortColumn, orderColumnProperty)]
	);
}

function updateSortColumn(
	sortColumn,
	propertyPathToOrder,
	pathColumnProperty = "path",
	orderColumnProperty = "order"
) {
	let [path, order] = [
		getObjectProperty(sortColumn, pathColumnProperty), // sortColumn.path
		getObjectProperty(sortColumn, orderColumnProperty), //sortColumn.order
	];
	if (propertyPathToOrder === path) order = order === "asc" ? "desc" : "asc";
	else [path, order] = [propertyPathToOrder, "asc"];
	return { [pathColumnProperty]: path, [orderColumnProperty]: order };
}

export { sortByProperty, updateSortColumn };
