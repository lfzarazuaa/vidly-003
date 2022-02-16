import React, { Component } from "react";

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			account: { username: "mosh", password: "myS3cretPasSw0r0d" },
		};
		this.username = React.createRef();
	}

	handleOnLogin = (e) => {
		e.preventDefault();
		console.log(e);
		console.log("submited");
		const username = this.username.current.value;
		console.log(username);
	};

	render() {
		const { handleOnLogin } = this;
		return (
			<div className="container">
				<h1>Login</h1>
				<form onSubmit={(e) => handleOnLogin(e)}>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input id="username" type="text" className="form-control" />
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							ref={this.username}
							id="password"
							type="text"
							className="form-control"
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Login
					</button>
				</form>
			</div>
		);
	}
}

export default LoginForm;
