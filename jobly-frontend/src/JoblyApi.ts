import axios, { AxiosResponse } from "axios";


const BASE_URL = "http://localhost:3001";

interface UserCredentials {
	username: string;
	password: string;
}

interface RegisterData {
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	email: string;
}

interface Company {
	handle: string;
	name: string;
	description: string;
	numEmployees: number;
	logoUrl: string;
}

interface Job {
	id: number;
	title: string;
	salary: number;
	equity: number;
	companyHandle: string;
}

interface CompanySearch {
	minEmployees?: number;
	maxEmployees?: number;
	name?: string;
}

interface JobSearch {
	minSalary?: number;
	hasEquity?: boolean;
	title?: string;
}

interface UserDetails {
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	isAdmin: boolean;
}

interface UserUpdateData {
	firstName?: string;
	lastName?: string;
	email?: string;
	isAdmin?: boolean;
}

class JoblyApi {
	static token: string | null = null;

	static async request(
		endpoint: string,
		data = {},
		method = "get"
	): Promise<AxiosResponse> {
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${JoblyApi.token}` };
		const params = method === "get" ? data : {};

		try {
			return await axios({ url, method, data, params, headers });
		} catch (err: unknown) {
			// Checking if err is an instance of Error
			if (err instanceof Error) {
				console.error("API Error:", err.response);
				let message = err.response?.data?.error?.message;
				throw Array.isArray(message) ? message : [message];
			}

			// Fallback error if the caught object isn't an Error instance
			throw ["An unknown error occurred"];
		}
	}

	// Authentication methods
	static async login(credentials: UserCredentials): Promise<void> {
		const res = await this.request(`auth/token`, credentials, "post");
		this.token = res.data.token;
	}

	static async register(data: RegisterData): Promise<void> {
		const res = await this.request(`auth/register`, data, "post");
		this.token = res.data.token;
	}

	// Company methods
	static async getCompanies(
		searchFilters?: CompanySearch
	): Promise<Company[]> {
		const res = await this.request("companies", searchFilters);
		return res.data.companies;
	}

	static async getCompany(handle: string): Promise<Company> {
		const res = await this.request(`companies/${handle}`);
		return res.data.company;
	}

	// Job methods
	static async getJobs(searchFilters?: JobSearch): Promise<Job[]> {
		const res = await this.request("jobs", searchFilters);
		return res.data.jobs;
	}

	static async getJob(id: number): Promise<Job> {
		const res = await this.request(`jobs/${id}`);
		return res.data.job;
	}

	// User methods
	static async getUser(username: string): Promise<UserDetails> {
		const res = await this.request(`users/${username}`);
		return res.data.user;
	}

	static async updateUser(
		username: string,
		data: UserUpdateData
	): Promise<UserDetails> {
		const res = await this.request(`users/${username}`, data, "patch");
		return res.data.user;
	}

	static async applyToJob(
		username: string,
		jobId: number
	): Promise<{ applied: number }> {
		const res = await this.request(
			`users/${username}/jobs/${jobId}`,
			{},
			"post"
		);
		return res.data;
	}
}

export default JoblyApi;
