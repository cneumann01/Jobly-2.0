// Routes.tsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../components/HomePage";
import CompanyList from "../components/CompanyList";
import CompanyDetail from "../components/CompanyDetail";
import JobList from "../components/JobList";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Profile from "../components/Profile";
import NotFound from "../components/NotFound";

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/companies" element={<CompanyList />} />
				<Route path="/companies/:handle" element={<CompanyDetail />} />
				<Route path="/jobs" element={<JobList />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
