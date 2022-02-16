import { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import MainNavbar from "./components/mainNavbar";
import Home from "./pages/home";
import NotFound from "./pages/notFound";
import Customers from "./pages/customers";
import Rentals from "./pages/rentals";
import MovieForm from "./pages/movies/movieForm";
import Movies from "./pages/movies/movies";

function App() {
	return (
		<Fragment>
			<MainNavbar></MainNavbar>
			<main role="main" className="container">
				<Switch>
					<Route path={"/customers"} component={Customers}></Route>
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

export default App;
