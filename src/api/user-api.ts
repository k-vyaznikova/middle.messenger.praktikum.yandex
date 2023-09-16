import {BaseAPI} from "/api/base-api.ts";
import {User} from "/types/common_types.ts";
import {SearchData} from "/types/common_types.ts";


export class UserAPI extends BaseAPI {
	constructor() {
		super("/user");
	}

	public search(data: SearchData): Promise<User> {
		return this.http.post("/search", data);
	}


	public async request(id: number) {
		return this.http.get(`/${id}`);
	}

	public create = undefined;
	public update = undefined;
	public delete = undefined;
}

export const API = new UserAPI();
