import React from "react";
import Joi from "joi-browser";
import Form from "../../components/common/form";

class LoginForm extends Form {
	constructor(props) {
		super(props);
		this.componentsProps = {
			username: {
				name: "username",
				label: "Username",
			},
			password: {
				name: "password",
				label: "Password",
				type: "password",
			},
		};
		const { username, password } = this.componentsProps;
		this.schema = {
			[username.name]: Joi.string().required().label(username.label),
			[password.name]: Joi.string().required().label(password.label),
		};
		this.state = {
			data: {
				[username.name]: "mosh",
				[password.name]: "myS3cretPasSw0r0d",
			},
			errors: {},
		};
	}

	doSubmit = () => {
		console.log("Login form submitted.");
	};

	render() {
		const { handleOnSubmit, componentsProps } = this;
		const { username, password } = componentsProps;
		return (
			<form onSubmit={(e) => handleOnSubmit(e)}>
				{this.renderInput(username)}
				{this.renderInput(password)}
				{this.renderSubmitButton("Login")}
			</form>
		);
	}
}

export default LoginForm;
