import axios, { AxiosResponse } from "axios";

const BASE_URL = "http://localhost:3001";

export interface UserCredentials {
	username: string;
	password: string;
}

export interface RegisterData {
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	email: string;
}

export interface AuthResponse {
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	isAdmin: boolean;
	token: string;
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
				console.error("API Error:", err);
				let message = err.message;
				throw Array.isArray(message) ? message : [message];
			}

			// Fallback error if the caught object isn't an Error instance
			throw ["An unknown error occurred"];
		}
	}

	// Authentication methods
	static async login(credentials: UserCredentials): Promise<AuthResponse> {
		const res = await this.request("auth/token", credentials, "post");
		// Store the token for future requests.
		JoblyApi.token = res.data.token;
		// Return the full response data including the token.
		return res.data;
	}

	static async register(data: RegisterData): Promise<AuthResponse> {
		try {
			const res = await this.request("auth/register", data, "post");
			JoblyApi.token = res.data.token; // Store the token for future requests
			return res.data; // Return the full response data including the token
		} catch (err) {
			// Narrow down unknown error
			if (axios.isAxiosError(err) && err.response) {
				// If the error is an Axios error and has a response, it's likely from backend
				const message =
					err.response.data.error.message || "Registration failed.";
				throw new Error(message); // Throw a new error with the message from the backend
			} else {
				// If the error is not from Axios, or doesn't have a response, generic error
				throw new Error("An unexpected error occurred.");
			}
		}
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
		console.log(res.data.job)
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
