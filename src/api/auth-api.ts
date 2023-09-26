import {BaseAPI} from "/api/base-api.ts";
import {User} from "/types/common_types.ts";

export interface SigninData{
  login: string,
  password: string
}

export interface SignupData{
  email: string,
  login: string,
  first_name: string,
  second_name: string,
  password: string,
}

export class AuthAPI extends BaseAPI {
	constructor() {
		super("/auth");
	}

	public signin(data: SigninData) {
		return this.http.post("/signin", data);
	}

	public signup(data: SignupData) {
		return this.http.post("/signup", data);
	}
	public read(): Promise<User> {
		return this.http.get("/user");
	}

	public logout() {
		return this.http.post("/logout");
	}


	public create = undefined;
	public update = undefined;
	public delete = undefined;
}

export const API = new AuthAPI();
