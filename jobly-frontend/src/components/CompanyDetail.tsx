import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/JoblyApi";
import "./CompanyDetail.scss";

interface Company {
	handle: string;
	name: string;
	description: string;
	numEmployees: number;
	logoUrl: string;
}

const CompanyDetail: React.FC = () => {
	const { handle } = useParams<{ handle: string }>();
	const [company, setCompany] = useState<Company | null>(null);

	useEffect(() => {
		const fetchCompany = async () => {
			const companyData = await JoblyApi.getCompany(handle);
			setCompany(companyData);
		};

		fetchCompany();
	}, [handle]);

	if (!company) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>{company.name}</h1>
			<p>{company.description}</p>
			{/* Render other company details as needed */}
		</div>
	);
};

export default CompanyDetail;
