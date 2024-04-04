// Navbar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
	const location = useLocation();
	const isLoggedIn = true; // Replace this with your actual authentication status
	const username = "John Doe"; // Replace this with the logged-in user's username

	const renderAuthButton = () => {
		if (isLoggedIn) {
			return <button>Logout</button>;
		} else {
			return <Link to="/login">Login</Link>;
		}
	};

	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/companies">Companies</Link>
				</li>
				<li>
					<Link to="/jobs">Jobs</Link>
				</li>
				<li>
					<Link to="/profile">Profile</Link>
				</li>
			</ul>
			<div>
				{isLoggedIn && <span>Welcome, {username}!</span>}
				<div>{renderAuthButton()}</div>
			</div>
		</nav>
	);
};

export default Navbar;
