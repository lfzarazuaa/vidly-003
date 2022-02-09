const SortIcon = (props) => {
	const { isAscSort, isSorting } = props;
	const color = isSorting ? "icon-enabled" : "icon-disabled";
	const ascSortIcon = isAscSort ? "asc" : "desc";
	return (
		<span
			className={`btn fa fa-sort-amount-${ascSortIcon} ${color}`}
			aria-hidden="true"
		></span>
	);
};

export default SortIcon;
