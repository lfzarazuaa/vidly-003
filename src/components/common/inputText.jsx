const Input = (props) => {
	const { name, value, label, type, error, OnChangeInput } = props;
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input
				name={name}
				value={value}
				onChange={(e) => OnChangeInput(e)}
				id={name}
				type={type}
				className="form-control"
				autoFocus
			/>
			{error && <div className="mt-2 alert alert-danger">{error}</div>}
		</div>
	);
};

export default Input;
