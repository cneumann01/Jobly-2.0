import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/JoblyApi";
import "./JobDetail.scss";

interface Company {
	handle: string;
	name: string;
	description: string;
	numEmployees: number | null;
	logoUrl: string;
}

interface Job {
	id: number;
	title: string;
	salary: number | null;
	equity: number | null;
	company: Company;
}

const JobDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [job, setJob] = useState<Job | null>(null);

	useEffect(() => {
		const fetchJob = async () => {
			if (id) {
				const resp = await JoblyApi.getJob(parseInt(id));
				setJob(resp);
			}
		};

		fetchJob();
	}, [id]);

	if (!job) {
		return <div>Loading...</div>;
	}

	return (
		<div className="jobDetail">
			<h1>{job.title}</h1>
			<p>Salary: {job.salary ? `$${job.salary}` : "Not provided"}</p>
			<p>Equity: {job.equity ? `${job.equity * 100}%` : "None"}</p>
			<h2>Company: {job.company.name}</h2>
			{job.company.logoUrl && (
				<img
					src={job.company.logoUrl}
					alt={`${job.company.name} logo`}
					className="company-logo"
				/>
			)}
			<p>Description: {job.company.description}</p>
		</div>
	);
};

export default JobDetail;
