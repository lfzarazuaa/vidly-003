import React, { Component } from "react";
import Navbar from "./common/navbar";

class MainNavbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: {
				name: "Vidly",
				url: "/",
			},
			items: [
				{
					name: "Movies",
					url: "/movies",
				},
				{
					name: "Customers",
					url: "/customers",
				},
				{
					name: "Rentals",
					url: "/rentals",
				},
				{
					name: "Login",
					url: "/login",
				},
				{
					name: "Register",
					url: "/login/register",
				},
			],
		};
	}
	render() {
		const { title, items } = this.state;
		return <Navbar title={title} items={items} />;
	}
}

export default MainNavbar;
