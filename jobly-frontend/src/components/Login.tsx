import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Form.scss";

interface UserCredentials {
	username: string;
	password: string;
}

const Login: React.FC = () => {
	const [credentials, setCredentials] = useState<UserCredentials>({
		username: "",
		password: "",
	});
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const authContext = useAuth(); // Uses the useAuth hook to access the AuthContext instead of the JoblyApi directly

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
			// Utilize the login function from AuthContext
			await authContext.login(credentials);
			navigate("/companies");
		} catch (err) {
			setError("Login failed: Invalid username or password.");
		}
	};

	return (
		<div className="form_card">
			<h1>Login</h1>
			{error && <div className="error">{error}</div>}{" "}
			<form onSubmit={handleSubmit}>
				<div>
					<input
						id="username"
						name="username"
						value={credentials.username}
						onChange={handleChange}
						type="text"
						placeholder="Username"
						required
					/>
				</div>
				<div>
					<input
						id="password"
						name="password"
						value={credentials.password}
						onChange={handleChange}
						type="password"
						placeholder="Password"
						required
					/>
				</div>
				<button type="submit">Log In</button>
			</form>
		</div>
	);
};

export default Login;
