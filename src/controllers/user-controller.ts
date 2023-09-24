import {API, UsersAPI} from "../api/user-api";
import store from "/utils/store.ts";
import {User} from "/types/common_types.ts";
import {SearchData} from "/types/common_types.ts";
import {ChangePassData, ResultValidate} from "/types/common_types.ts";
import AuthController from "./auth-controller";


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
}
export default new UserController();
