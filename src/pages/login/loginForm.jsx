import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./../../components/common/inputText";
import { isEmptyObject } from "../../utils/objectFunctions";

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
		this.schema = {
			[username.name]: Joi.string().required().label(username.label),
			[password.name]: Joi.string().required().label(password.label),
		};
		this.state = {
			account: {
				[username.name]: "mosh",
				[password.name]: "myS3cretPasSw0r0d",
			},
			errors: {},
		};
	}

	validate = () => {
		const { state, schema } = this;
		const options = { abortEarly: false }; // Check every field as the schema is defined.
		// Obtain error property from Joi.
		const { error } = Joi.validate(state.account, schema, options);
		const errors = {};
		if (!error) return errors;
		// Read all the errors from the array.
		error.details.forEach((error) => {
			const { path: fieldName, message: errorMessage } = error;
			errors[fieldName] = errorMessage;
		});
		return errors;
	};

	validateProperty = (input) => {
		const { name, value } = input;
		// For validate only one property not all the schema.
		const property = { [name]: value };
		const propertySchema = { [name]: this.schema[name] };
		const { error } = Joi.validate(property, propertySchema);
		return error ? error.details[0].message : null;
	};

	handleOnLogin = (e) => {
		e.preventDefault();
		const errors = this.validate();
		this.setState({ errors });
	};

	handleOnChangeInput = ({ target: input }) => {
		const { errors } = this.state;
		const errorMessage = this.validateProperty(input);
		// Update error according to the field
		if (errorMessage) errors[input.name] = errorMessage;
		// Assign the error.
		else delete errors[input.name]; // Delete the error
		// Update field content
		const { account } = this.state;
		account[input.name] = input.value;
		//Update the state with updated content and errors messages.
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
					<button
						disabled={!isEmptyObject(this.validate())}
						type="submit"
						className="btn btn-primary mt-2"
					>
						Login
					</button>
				</form>
			</div>
		);
	}
}

export default LoginForm;
