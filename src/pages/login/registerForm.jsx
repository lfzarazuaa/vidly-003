import React from "react";
import Joi from "joi-browser";
import Form from "../../components/common/form";
import * as userService from "../../services/users/userService";
import auth from "../../services/users/authService";

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
        .required()
        .label(password.label),
      [fullName.name]: Joi.string().min(3).required().label(fullName.label),
    };
    this.state = {
      data: {
        [username.name]: "user1@domain.com",
        [password.name]: "@Bc123",
        [fullName.name]: "Mosh Hamedani",
      },
      errors: {},
    };
  }

  doSubmit = async () => {
    try {
      const token = await userService.register(this.state.data);
      auth.loginWithJwt(token);
      window.location = "/movies";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = this.state.errors;
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
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
