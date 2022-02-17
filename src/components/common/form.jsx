import { Component } from "react";
import Joi from "joi-browser";
import { isEmptyObject } from "../../utils/objectFunctions";
import SubmitButton from "./submitFormButtom";
import Input from "./inputText";

// Use like abstract class.
class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {}, // Data to be displayed on the fields of form.
			errors: {}, // Errors on each field.
		};
		this.schema = {}; // Property for validation rules using Joi.
	}

	validateForm = () => {
		const { state, schema } = this;
		const options = { abortEarly: false }; // Check every field as the schema is defined.
		// Obtain error property from Joi.
		const { error } = Joi.validate(state.data, schema, options);
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

	handleOnSubmit = (e) => {
		e.preventDefault();
		const errors = this.validateForm();
		this.setState({ errors });
		if (!isEmptyObject(errors)) return;

		// Call to the server.
		this.doSubmit();
	};

	doSubmit = () => {
		console.log("Submitted");
	};

	handleOnChangeInput = ({ target: input }) => {
		const { errors } = this.state;
		const errorMessage = this.validateProperty(input);
		// Update error according to the field
		if (errorMessage) errors[input.name] = errorMessage;
		// Assign the error.
		else delete errors[input.name]; // Delete the error
		// Update field content
		const { data } = this.state;
		data[input.name] = input.value;
		//Update the state with updated content and errors messages.
		this.setState({ data, errors });
	};

	renderInput({ name, label, type = "text" }) {
		const { data, errors } = this.state;
		return (
			<Input
				name={name}
				value={data[name]}
				label={label}
				type={type}
				error={errors[name]}
				OnChangeInput={(e) => this.handleOnChangeInput(e)}
			/>
		);
	}

	renderSubmitButton(label) {
		return (
			<SubmitButton
				label={label}
				disabled={!isEmptyObject(this.validateForm())}
			></SubmitButton>
		);
	}
}

export default Form;
