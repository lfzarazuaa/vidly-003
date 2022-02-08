import _ from "lodash";

function paginate(items, pageNumber, pageSize) {
	const startIndex = (pageNumber - 1) * pageSize;
	return _(items) // To lodash object.
		.slice(startIndex) //Begining index.
		.take(pageSize) // Take elements.
		.value(); // Original value without lodash container.
}

export { paginate };
