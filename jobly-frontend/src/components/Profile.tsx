import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Adjust the import path as needed
import JoblyApi from "../api/JoblyApi"; // Adjust the import path as needed
import "./Profile.scss"; // Ensure the SCSS is imported

// Assuming the AuthResponse interface from JoblyApi includes all needed fields
const Profile: React.FC = () => {
	const { user, setUser } = useAuth();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "", // Password is required for updates
	});
	const [error, setError] = useState<string | null>(null);

	// Populate the form data when the component mounts or user changes
	useEffect(() => {
		if (user) {
			setFormData({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				password: "",
			});
		}
	}, [user]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);

		try {
			// Ensure that the password is provided before attempting to update
			if (!formData.password) {
				setError("Password is required to confirm changes.");
				return;
			}

			// Call updateUser on JoblyApi, assuming it takes username from context and formData for the update
			const updatedUser = await JoblyApi.updateUser(user!.username, {
				...formData,
				password: formData.password,
			});

			// Update user context with new details
			setUser({
				...user,
				...updatedUser,
			});

			// Optionally clear the password field after successful update
			setFormData({ ...formData, password: "" });
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "An error occurred. Please try again."
			);
		}
	};

	return (
		<div className="form_card">
			<h1>Edit Profile</h1>
			{error && <div className="error">{error}</div>}
			<form onSubmit={handleSubmit}>
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
				<input
					name="password"
					value={formData.password}
					onChange={handleChange}
					type="password"
					placeholder="Confirm Password"
					required
				/>
				<button type="submit">Save Changes</button>
			</form>
		</div>
	);
};

export default Profile;
