const Input = (props) => {
	const { name, label, error, OnChangeInput, ...otherProps } = props;
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input
				{...otherProps}
				name={name}
				onChange={(e) => OnChangeInput(e)}
				id={name}
				className="form-control"
			/>
			{error && <div className="mt-2 alert alert-danger">{error}</div>}
		</div>
	);
};

export default Input;
