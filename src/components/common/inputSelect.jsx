const Select = (props) => {
	const { name, value, label, error, OnChangeInput, options, ...otherProps } =
		props;
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<select
				name={name}
				id={name}
				value={value}
				className="form-control"
				onChange={(e) => OnChangeInput(e)}
			>
				{options.map((option) => (
					<option key={option._id} value={option._id}>
						{option.name}
					</option>
				))}
			</select>
			{error && <div className="mt-2 alert alert-danger">{error}</div>}
		</div>
	);
};

export default Select;
