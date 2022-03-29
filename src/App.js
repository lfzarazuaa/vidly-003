import React, { Component, Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
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
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/users/authService";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    if (user) {
      this.setState({ user });
    }
  }

  render() {
    const { user } = this.state;
    return (
      <Fragment>
        <MainNavbar user={user}></MainNavbar>
        <main role="main" className="container">
          <Switch>
            <Route path={"/customers"} component={Customers}></Route>
            <Route path={"/login/register"} component={RegisterForm}></Route>
            <Route path={"/login"} component={LoginForm}></Route>
            <Route path={"/logout"} component={Logout}></Route>
            <ProtectedRoute
              path={"/movies/:id"}
              component={MovieForm}
            ></ProtectedRoute>
            <Route
              path={"/movies"}
              render={(props) => <Movies {...props} user={this.state.user} />}
            ></Route>
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
