const SearchBox = (props) => {
	const { value, label, name, OnChangedText, ...otherProps } = props;
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input
				{...otherProps}
				value={value}
				name={name}
				onChange={(e) => OnChangedText(e.target.value)}
				id={name}
				className="form-control"
			/>
		</div>
	);
};

export default SearchBox;
