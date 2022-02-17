import React from "react";
import PropTypes from "prop-types";
import { getKeyValueObject } from "../../utils/objectFunctions";

const ListGroup = ({
	items = Array,
	selectedItem,
	uniqueKeyPropertyPath,
	contentPropertyPath,
	onItemSelect = Function,
}) => {
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
