// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust the import path as needed

const Navbar: React.FC = () => {
	const { user, logout } = useAuth();

	return (
		<nav>
			{/* Your NavLinks */}
			{user ? (
				<>
					<span>Welcome, {user.username}!</span>
					<button onClick={logout}>Logout</button>
				</>
			) : (
				<Link to="/login">Login</Link>
			)}
		</nav>
	);
};

export default Navbar;
