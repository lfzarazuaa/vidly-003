import { Link, NavLink } from "react-router-dom";

const Navbar = (props) => {
	const { title, items } = props;
	const renderList = (item, counter) => {
		return (
			<li key={counter} className="nav-item">
				<NavLink className="nav-link" to={item.url}>
					{item.name} <span className="sr-only">(current)</span>
				</NavLink>
			</li>
		);
	};
	return (
		<header>
			<nav className="navbar navbar-expand-md navbar-dark bg-dark">
				<Link className="navbar-brand" to={title.url}>
					{title.name}
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarCollapse"
					aria-controls="navbarCollapse"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarCollapse">
					<ul className="navbar-nav mr-auto">
						{items.map((item, counter) => renderList(item, counter))}
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
