const SubmitButton = ({ label, disabled }) => {
	return (
		<button disabled={disabled} type="submit" className="btn btn-primary m-2">
			{label}
		</button>
	);
};

export default SubmitButton;
