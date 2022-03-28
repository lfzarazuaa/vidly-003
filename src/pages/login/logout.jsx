import React, { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("token");
    window.location = "/movies";
  }

  render() {
    return null;
  }
}

export default Logout;
