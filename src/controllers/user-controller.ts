import {API, UserAPI} from "../api/user-api";
import store from "/utils/store.ts";
import {User} from "/types/common_types.ts";
import {SearchData} from "/types/common_types.ts";
import {ChangePassData, ResultValidate} from "/types/common_types.ts";
import AuthController from "/controllers/auth-controller";


export class UserController {
	private api: UserAPI;

	constructor() {
		this.api = API;
	}

	async search(login: string): Promise<any> {
		const data: SearchData = {
			login: login
		};
		let users: User[] = [];
		try {
			users = await this.api.search(data);
		} catch (e) {
			users = [];
		}

		console.log(users);
		const res: Record<string, any> = {
			users: users,
			search_word: login
		};
		store.set("search_results", res);
	}

	async getUser(id: number): Promise<User | null> {
		try {
			return await this.api.request(id);
		} catch (e) {
			return null;
		}
	}

	async fetchUserById(userId: number) {
		let userInfo: User;
		try {
			userInfo = await this.api.request(userId);
		} catch (e) {
			userInfo = {
				id: userId,
				first_name: "Noname",
				second_name: "Noname",
				login: "Noname",
				email: "",
				password: "",
				phone: "",
				avatar: ""
			};
		}
		return userInfo;
	}


	async uploadAvatar(file: FormData) {
		let result: ResultValidate;
		try {
			await this.api.uploadAvatar(file);
			await AuthController.fetchUser();
			result = {
				is_ok: true,
				msg_text: "Аватар успешно изменен."
			};
		} catch (e: any) {
			result = {
				is_ok: false,
				msg_text: e? e.reason : "Ошибка загрузки"
			};
			// console.log(e.reason);
		}
		return result;
	}

	getAvatar(relationalURL: string) {
		return "https://ya-praktikum.tech/api/v2/resources/" + relationalURL;
	}

	async changePass(data: ChangePassData) {
		let result: ResultValidate;
		try {
			await this.api.changePass(data);
			result = {
				is_ok: true,
				msg_text: "Пароль успешно изменен."
			};
		} catch (e: any) {
			result = {
				is_ok: false,
				msg_text: e.reason
			};
		}
		return result;
	}

	async updateProfile(data: Record<string, string>) {
		let result: ResultValidate;
		try {
			await this.api.updateProfile(data);
			await AuthController.fetchUser();
			result = {
				is_ok: true,
				msg_text: "Пароль успешно изменен."
			};
		} catch (e: any) {
			result = {
				is_ok: false,
				msg_text: e.reason
			};
		}
		return result;
	}
}
export default new UserController();
