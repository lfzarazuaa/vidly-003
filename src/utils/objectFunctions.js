import _ from "lodash";
import { any } from "prop-types";

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
export { getObjectProperty, getKeyValueObject };
