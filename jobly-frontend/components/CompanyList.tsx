import React, { useEffect, useState } from "react";
import JoblyApi from "../JoblyApi"; 
import "./CompanyList.scss"; 

interface Company {
	handle: string;
	name: string;
	description: string;
	numEmployees: number;
	logoUrl: string;
}

const CompanyList: React.FC = () => {
	const [companies, setCompanies] = useState<Company[]>([]);

	useEffect(() => {
		const fetchCompanies = async () => {
			const resp = await JoblyApi.getCompanies();
			setCompanies(resp);
		};

		fetchCompanies();
	}, []);

	return (
		<div className="companyList">
			<h1>Companies</h1>
			<div>
				{companies.map((company) => (
					<div key={company.handle}>
						<h2>{company.name}</h2>
						<p>{company.description}</p>
						{/* Implement more detailed markup as needed */}
					</div>
				))}
			</div>
		</div>
	);
};

export default CompanyList;
