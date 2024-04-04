import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "../api/JoblyApi";
import "./Form.scss";


interface RegisterData {
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	email: string;
}

const Signup: React.FC = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<RegisterData>({
		username: "",
		password: "",
		firstName: "",
		lastName: "",
		email: "",
	});
	const [error, setError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((fData) => ({ ...fData, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null); // Reset any previous error
		try {
			const response = await JoblyApi.register(formData);
			JoblyApi.token = response.token; // Save the token to the JoblyApi class
			localStorage.setItem("token", response.token); // Optionally save the token to localStorage
			navigate("/companies"); // Navigate to the companies page after successful signup
		} catch (err) {
			if (err instanceof Error) {
				// Display error from the backend if it is an instance of Error
				setError(err.message);
			} else {
				// Generic error if the thrown value is not an Error instance
				setError("Registration failed. Please try again.");
			}
		}
	};

	return (
		<div className="form_card">
			<h1>Sign Up</h1>
			{error && <p className="error">{error}</p>}{" "}
			<form onSubmit={handleSubmit}>
				<input
					name="username"
					value={formData.username}
					onChange={handleChange}
					type="text"
					placeholder="Username"
					required
				/>
				<input
					name="password"
					value={formData.password}
					onChange={handleChange}
					type="password"
					placeholder="Password"
					required
				/>
				<input
					name="firstName"
					value={formData.firstName}
					onChange={handleChange}
					type="text"
					placeholder="First Name"
					required
				/>
				<input
					name="lastName"
					value={formData.lastName}
					onChange={handleChange}
					type="text"
					placeholder="Last Name"
					required
				/>
				<input
					name="email"
					value={formData.email}
					onChange={handleChange}
					type="email"
					placeholder="Email"
					required
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default Signup;
