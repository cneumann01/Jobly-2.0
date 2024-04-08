import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // If you plan to navigate to a detailed job view
import JoblyApi from "../api/JoblyApi";
import "./JobList.scss";

interface Job {
	id: number;
	title: string;
	salary: number | null; // Assuming salary might not always be provided
	equity: number | null; // Assuming equity might not always be provided
	companyHandle: string;
	companyName?: string; // If your API returns the company name with job listings
}

const JobList: React.FC = () => {
	const [jobs, setJobs] = useState<Job[]>([]);

	useEffect(() => {
		const fetchJobs = async () => {
			const resp = await JoblyApi.getJobs();
			setJobs(resp);
		};

		fetchJobs();
	}, []);

	return (
		<div className="jobList">
			<h1>Jobs</h1>
			<div>
				{jobs.map((job) => (
					<div key={job.id} className="job">
						<h2>{job.title}</h2>
						<p>
							Salary:{" "}
							{job.salary ? `$${job.salary}` : "Not provided"}
						</p>
						<p>
							Equity:{" "}
							{job.equity ? `${job.equity * 100}%` : "None"}
						</p>
						{/* Link to a detailed view of the job or the company. Adjust as necessary. */}
						<Link to={`/jobs/${job.id}`} className="view-details">
							View Details
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default JobList;
