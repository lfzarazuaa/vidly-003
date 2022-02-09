import React from "react";
import PropTypes, { arrayOf } from "prop-types";
import _ from "lodash";
import {
	getKeyValueObject,
	getObjectProperty,
} from "../../utils/objectFunctions";

const ListGroup = ({
	items = Array,
	selectedItem,
	uniqueKeyPropertyPath,
	contentPropertyPath,
	onItemSelect = Function,
}) => {
	// const { items= } = props;
	const listItems = items.map((item) =>
		getKeyValueObject(item, uniqueKeyPropertyPath, contentPropertyPath)
	);
	return (
		<ul className="list-group">
			{items.map((item) => {
				const listItem = getKeyValueObject(
					item,
					uniqueKeyPropertyPath,
					contentPropertyPath,
					{
						class:
							item === selectedItem
								? "btn list-group-item active"
								: "btn list-group-item",
					}
				);
				return (
					<li
						key={listItem._id}
						className={listItem.class}
						onClick={() => onItemSelect(item)}
					>
						{listItem.value}
					</li>
				);
			})}
		</ul>
	);
};

ListGroup.defaultProps = {
	uniqueKeyPropertyPath: "_id",
	contentPropertyPath: "name",
};

ListGroup.propTypes = {
	items: PropTypes.array.isRequired,
};

export default ListGroup;
