import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

function addIdToItems(items) {
	return items.map((item) => {
		item._id = uuidv4();
		return item;
	});
}

function addCounterToItems(items) {
	return items.map((item, counter) => {
		item.counter = counter + 1;
		return item;
	});
}

function getObjectProperty(item, propertyPath = String, defaultValue = String) {
	if (defaultValue) return _(item).get(propertyPath, defaultValue);
	return _(item).get(propertyPath);
}

function getKeyValueObject(
	item,
	keyPropertyPath = String,
	valuePropertyPath = String,
	otherProperties = Object
) {
	let keyValue = {
		_id: getObjectProperty(item, keyPropertyPath),
		value: getObjectProperty(item, valuePropertyPath),
	};
	if (otherProperties) keyValue = { ...keyValue, ...otherProperties };
	return keyValue;
}

function isEmptyObject(object) {
	for (const {} in object) return false;
	return true;
}
export {
	addIdToItems,
	addCounterToItems,
	getObjectProperty,
	getKeyValueObject,
	isEmptyObject,
};
