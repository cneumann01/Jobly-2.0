// Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "../api/JoblyApi";
import "./Login.scss";

interface UserCredentials {
	username: string;
	password: string;
}

interface AuthResponse {
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	isAdmin: boolean;
	token: string;
}

const Login: React.FC = () => {
	const [credentials, setCredentials] = useState<UserCredentials>({
		username: "",
		password: "",
	});
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCredentials((prevCredentials) => ({
			...prevCredentials,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null); // Reset any previous error
		try {
			const response: AuthResponse = await JoblyApi.login(credentials);
			localStorage.setItem("token", response.token); // Save the token in localStorage or context
			JoblyApi.token = response.token; // Update the token for your JoblyApi requests
			navigate("/companies"); // Redirect the user after login
		} catch (err) {
			setError("Login failed: Invalid username or password."); // Update the error state to display the message
		}
	};

	return (
		<div className="login">
			<h1>Login</h1>
			{error && <div className="error">{error}</div>}{" "}
			{/* Display the error message */}
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">Username</label>
					<input
						id="username"
						name="username"
						value={credentials.username}
						onChange={handleChange}
						type="text"
						required
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						id="password"
						name="password"
						value={credentials.password}
						onChange={handleChange}
						type="password"
						required
					/>
				</div>
				<button type="submit">Log In</button>
			</form>
		</div>
	);
};

export default Login;
