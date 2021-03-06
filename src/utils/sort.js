import _ from "lodash";
import { addCounterToItems, getObjectProperty } from "./objectFunctions";

function sortByProperty(
	items,
	sortColumn,
	addCounter,
	pathColumnProperty = "path",
	orderColumnProperty = "order"
) {
	const propertyName = getObjectProperty(sortColumn, pathColumnProperty);
	const sortby = (item) =>
		getObjectProperty(item, propertyName).toString().toLowerCase();
	const sorted = _.orderBy(
		items,
		[sortby],
		[getObjectProperty(sortColumn, orderColumnProperty)]
	);
	if (addCounter) {
		return addCounterToItems(sorted);
	}
	return sorted;
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
