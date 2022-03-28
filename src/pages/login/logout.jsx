import React, { Component } from "react";
import auth from "../../services/users/authService";
class Logout extends Component {
  componentDidMount() {
    auth.logout();
    window.location = "/movies";
  }

  render() {
    return null;
  }
}

export default Logout;
