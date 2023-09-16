import {API, UsersAPI} from "../api/user-api";
import store from "/utils/store.ts";
import {User} from "/types/common_types.ts";
import {SearchData} from "/types/common_types.ts";


export class UserController {
	private api: UsersAPI;

	constructor() {
		this.api = API;
	}

	async search(login: string): Promise<User[]> {
		const data: SearchData = {
			login: login
		};
		try {
			return await this.api.search(data);
		} catch (e) {
			return [];
		}
	}

	async getUser(id: number): Promise<User | null> {
		try {
			return await this.api.request(id);
		} catch (e) {
			return null;
		}
	}
}
export default new UserController();
