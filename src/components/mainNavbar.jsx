import React, { Component } from "react";
import Navbar from "./common/navbar";

class MainNavbar extends Component {
  constructor(props) {
    super(props);

    let items = [
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
    ];

    this.menu = {
      title: {
        name: "Vidly",
        url: "/",
      },
      items,
    };
  }

  componentDidUpdate() {}

  render() {
    const { title, items } = this.menu;
    const { user } = this.props;
    let itemsToShow;
    if (user) {
      const userLoggedItems = [
        {
          name: `Profile ${user.name}`,
          url: "/profile",
        },
        {
          name: "Logout",
          url: "/logout",
        },
      ];
      itemsToShow = [...items, ...userLoggedItems];
    } else {
      const userNotLoggedItems = [
        {
          name: "Login",
          url: "/login",
        },
        {
          name: "Register",
          url: "/login/register",
        },
      ];
      itemsToShow = [...items, ...userNotLoggedItems];
    }
    return <Navbar title={title} items={itemsToShow} />;
  }
}

export default MainNavbar;
