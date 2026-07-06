import {API, AuthAPI, SigninData, SignupData} from "/api/auth-api.ts";
import router from "/utils/routing/router.ts";
import store from "../utils/store";
import {Result} from "../types";
import MessagesController from "/controllers/messages-controller.ts";


export class AuthController {
	private api: AuthAPI;

	constructor() {
		this.api = API;
	}
	async signin(data: SigninData): Promise<Result> {
		return new Promise(async (resolve, reject) => {
			try {
				await this.api.signin(data);
				let res2 = await this.fetchUser();
				if (res2 === true) {
					resolve(true);
				} else {
					reject(new Error("Ошибка авторизации.\n Не удалось получить данные пользователя. Попробуйте позже."));
				}
			} catch (error: unknown) {
				reject(error as Error);
			}
		});
	}

	async signup(data: SignupData): Promise<Result> {
		return new Promise(async (resolve, reject) => {
			try {
				await this.api.signup(data);
				await this.fetchUser();
				resolve(true);
			} catch (error: unknown) {
				reject(error as Error);
			}
		});
	}

	async signupAndSignin(data: SignupData): Promise<Result> {
		return new Promise(async (resolve, reject) => {
			try {
				await this.signup(data);
				await this.signin({
					login: data.login,
					password: data.password
				});
				resolve(true);
			} catch (error: unknown) {
				reject(error as Error);
			}
		});
	}


	async fetchUser(): Promise<Result> {
		return new Promise(async (resolve, reject) => {
			try {
				const user: any = await this.api.read();
				store.set("user", user);
				resolve(true);
			} catch (error: unknown) {
				reject(error as Error);
			}
		});
	}


	/*
	public getRegistrationError() {
		return store.getState().reg_error? store.getState().reg_error : "";
	}*/

	async logout(): Promise<Result> {
		try {
			MessagesController.closeAll();
			await this.api.logout();
			router.go("/");
			return true;
		} catch (error: unknown) {
			return error as Error;
		}
	}
}

export default new AuthController();
