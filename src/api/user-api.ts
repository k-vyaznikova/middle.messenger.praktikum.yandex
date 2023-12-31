import {BaseAPI} from "/api/base-api.ts";
import {SearchData, User} from "/types/common_types.ts";
import {ChangePassData} from "/types/common_types.ts";


export class UserAPI extends BaseAPI {
	constructor() {
		super("/user");
	}

	public search(data: SearchData): Promise<User[]> {
		return this.http.post("/search", data);
	}


	public async request(id: number): Promise<any> {
		return this.http.get(`/${id}`);
	}


	public async uploadAvatar(file: FormData) {
		return this.http.put("/profile/avatar", file);
	}

	public async changePass(data: ChangePassData) {
		return this.http.put("/password", data);
	}

	public async updateProfile(data: Record<string, string>) {
		return this.http.put("/profile", data);
	}
}

export const API = new UserAPI();
