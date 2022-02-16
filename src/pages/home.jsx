// import "./css/home.css";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
			<div className="inner cover mt-5 text-center">
				<h1 className="cover-heading m-5">Welcome to Vidly</h1>
				<p className="lead">Vidly is a example site of movies.</p>
				<p className="lead">
					<Link to="/" className="btn btn-lg btn-secondary">
						Learn more
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Home;
