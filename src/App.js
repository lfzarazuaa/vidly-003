import React, { Component, Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Home from "./pages/home";
import Customers from "./pages/customers";
import LoginForm from "./pages/login/loginForm";
import Logout from "./pages/login/logout";
import MainNavbar from "./components/mainNavbar";
import Movies from "./pages/movies/movies";
import MovieForm from "./pages/movies/movieForm";
import NotFound from "./pages/notFound";
import Rentals from "./pages/rentals";
import RegisterForm from "./pages/login/registerForm";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      console.log(`user`, user);
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    console.log("state", this.state);
    return (
      <Fragment>
        <MainNavbar user={this.state.user}></MainNavbar>
        <main role="main" className="container">
          <Switch>
            <Route path={"/customers"} component={Customers}></Route>
            <Route path={"/login/register"} component={RegisterForm}></Route>
            <Route path={"/login"} component={LoginForm}></Route>
            <Route path={"/logout"} component={Logout}></Route>
            <Route path={"/movies/:id"} component={MovieForm}></Route>
            <Route path={"/movies"} component={Movies}></Route>
            <Route path={"/rentals"} component={Rentals}></Route>
            <Route path={"/not-found"} component={NotFound}></Route>
            <Route path={"/"} exact component={Home}></Route>
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </Fragment>
    );
  }
}

export default App;
