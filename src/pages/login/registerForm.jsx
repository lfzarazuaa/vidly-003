import React from "react";
import Joi from "joi-browser";
import Form from "../../components/common/form";
import { min } from "lodash";

class RegisterForm extends Form {
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
			fullName: {
				name: "fullname",
				label: "Full Name",
			},
		};
		const { username, password, fullName } = this.componentsProps;
		this.schema = {
			[username.name]: Joi.string()
				.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
				.required()
				.label(username.label),
			[password.name]: Joi.string()
				.min(5)
				.max(20)
				.alphanum()
				.required()
				.label(password.label),
			[fullName.name]: Joi.string().min(3).required().label(fullName.label),
		};
		this.state = {
			data: {
				[username.name]: "moshegg",
				[password.name]: "myS3cretPasSw0r0d",
				[fullName.name]: "Mosh Hamedani",
			},
			errors: {},
		};
	}

	doSubmit = () => {
		console.log("Register form submitted.");
	};

	render() {
		const { handleOnSubmit, componentsProps } = this;
		const { username, password, fullName } = componentsProps;
		return (
			<form onSubmit={(e) => handleOnSubmit(e)}>
				{this.renderInput(username)}
				{this.renderInput(password)}
				{this.renderInput(fullName)}
				{this.renderSubmitButton("Register")}
			</form>
		);
	}
}

export default RegisterForm;
