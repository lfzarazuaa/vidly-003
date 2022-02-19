// import "./css/home.css";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
			<div className="inner cover mt-5 text-center">
				<h1 className="cover-heading m-5">Not Found</h1>
				<p className="lead">You can explore other exciting places.</p>
				<p className="lead">
					<Link to="/" className="btn btn-lg btn-secondary">
						Go to Home
					</Link>
				</p>
			</div>
		</div>
	);
};

export default NotFound;
