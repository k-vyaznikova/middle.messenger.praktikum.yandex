import {API, UserAPI} from "../api/user-api";
import store from "../utils/store";
import {User} from "../types";
import {SearchData} from "../types";
import { Result } from "../types";
import AuthController from "/controllers/auth-controller";
import { ChangePassData } from "../api/user-api";


export class UserController {
	private api: UserAPI;

	constructor() {
		this.api = API;
	}

	async search(login: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				let data: SearchData = {
					login: login
				};
				const users = await this.api.search(data);
				store.set("user_list", users);
				resolve(users);
			} catch (error: unknown) {
				reject(error as Error);
			}
		});

	}

	async fetchFullUserList(): Promise<User[]> {
		return new Promise(async (resolve, reject) => {
			try {
				const users = this.search("");

				resolve(users);
			} catch (error: unknown) {
				reject(error as Error);
			}
		});
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


	async uploadAvatar(file: FormData) :Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				await this.api.uploadAvatar(file);
				await AuthController.fetchUser();
				resolve(true);
				
			} catch (error: any) {
				console.log(error);
				reject(error as Error);
			}
		});
		
	}

	getAvatar(relationalURL: string) {
		return "https://ya-praktikum.tech/api/v2/resources/" + relationalURL;
	}

	async changePass(data: ChangePassData): Promise<Result> {
		return new Promise(async (resolve, reject) => {
			try {
				await this.api.changePass(data);
				resolve(true);
			} catch (error: unknown) {
				reject(error as Error);
			}
		});
		
	}

	async updateProfile(data: Record<string, string>) {
		return new Promise(async (resolve, reject) => {
			try {
				await this.api.updateProfile(data);
				await AuthController.fetchUser();
				resolve(true);
			} catch (error: unknown) {
				reject(error as Error);
			}
		});

	}

	async setNewDataProfile(newData: Record<string, string>) {
		return new Promise(async (resolve, reject) => {
			try{
				let data = store.getState().user;
				data = {
					...data,
					...newData
				};
				await this.updateProfile(data);
				resolve(true);
			} catch(error: unknown) {
				reject(error as Error);
			}
		});
	}
}
export default new UserController();
