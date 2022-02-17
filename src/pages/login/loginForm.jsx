import React, { Component } from "react";
import Input from "./../../components/common/inputText";
class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.componentsProps = {
			username: {
				name: "username",
				label: "Username",
				type: "text",
			},
			password: {
				name: "password",
				label: "Password",
				type: "password",
			},
		};
		const { username, password } = this.componentsProps;
		this.state = {
			account: {
				[username.name]: "mosh",
				[password.name]: "myS3cretPasSw0r0d",
			},
			errors: {},
		};
	}

	validate = () => {
		const errors = {};
		const { account } = this.state;
		if (account.username.trim() === "")
			errors.username = "Username is required.";
		if (account.password.trim() === "")
			errors.password = "Password is required.";
		return errors;
	};

	validateProperty = (input) => {
		if (input.name === "username") {
			if (input.value.trim() === "") return "Username required.";
		}
		if (input.name === "password") {
			if (input.value.trim() === "") return "Password required.";
		}
		return null;
	};

	handleOnLogin = (e) => {
		e.preventDefault();
		const errors = this.validate();
		this.setState({ errors });
	};

	handleOnChangeInput = ({ target: input }) => {
		const { errors } = this.state;
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];
		const { account } = this.state;
		console.log(input.value);
		account[input.name] = input.value;
		this.setState({ account, errors });
	};

	render() {
		const { handleOnLogin, handleOnChangeInput, state, componentsProps } = this;
		const { account, errors } = state;
		const { username, password } = componentsProps;
		return (
			<div className="container">
				<form onSubmit={(e) => handleOnLogin(e)}>
					<Input
						name={username.name}
						value={account.username}
						label={username.label}
						type={username.type}
						error={errors.username}
						OnChangeInput={(e) => handleOnChangeInput(e)}
					/>
					<Input
						name={password.name}
						value={account.password}
						label={password.label}
						type={password.type}
						error={errors.password}
						OnChangeInput={(e) => handleOnChangeInput(e)}
					/>
					<button type="submit" className="btn btn-primary mt-2">
						Login
					</button>
				</form>
			</div>
		);
	}
}

export default LoginForm;
