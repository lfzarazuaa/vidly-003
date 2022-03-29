import React from "react";
import Joi from "joi-browser";
import Form from "../../components/common/form";
import auth from "../../services/users/authService";
import { Redirect } from "react-router-dom";
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
        [username.name]: "user1@domain.com",
        [password.name]: "@Bc123",
      },
      errors: {},
    };
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/movies";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data);
        const errors = this.state.errors;
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
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
