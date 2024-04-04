// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import JoblyApi, { AuthResponse } from "../api/JoblyApi"; // Adjust the import path as needed

interface AuthContextType {
	user: AuthResponse | null;
	login: (loginData: { username: string; password: string }) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<AuthResponse | null>(null);

	const login = async (loginData: { username: string; password: string }) => {
		const userData = await JoblyApi.login(loginData);
		setUser(userData);
		localStorage.setItem("token", userData.token); // Persist token for session management
		JoblyApi.token = userData.token; // Set token for future API requests
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("token");
		JoblyApi.token = null; // Clear the token on logout
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
