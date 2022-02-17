const SubmitButton = ({ label, disabled }) => {
	return (
		<button disabled={disabled} type="submit" className="btn btn-primary mt-2">
			{label}
		</button>
	);
};

export default SubmitButton;
