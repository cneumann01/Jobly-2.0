import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.scss";

const Navbar: React.FC = () => {
	const { user, logout } = useAuth();

	return (
		<nav>
			<div className="nav-brand">
				<Link to="/" className="nav-link">
					Jobly
				</Link>
			</div>
			<div className="nav-links">
				{user ? (
					<>
						<NavLink to="/companies" className="nav-link">
							Companies
						</NavLink>
						<NavLink to="/jobs" className="nav-link">
							Jobs
						</NavLink>
						<NavLink to="/profile" className="nav-link">
							Profile
						</NavLink>
						<span className="username">{user.username}username</span>
						<button onClick={logout} className="nav-link">
							Logout
						</button>
					</>
				) : (
					<div className="auth-buttons">
						<NavLink to="/login" className="nav-link">
							Login
						</NavLink>
						<NavLink to="/signup" className="nav-link">
							Sign Up
						</NavLink>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
