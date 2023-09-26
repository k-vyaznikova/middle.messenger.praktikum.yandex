import {API, AuthAPI, SigninData, SignupData} from "/api/auth-api.ts";
import router from "/utils/routing/router.ts";
import store from "/utils/store.ts";
import {ResultValidate} from "/types/common_types.ts";
import MessagesController from "/controllers/messages-controller.ts";


export class AuthController {
	private api: AuthAPI;

	constructor() {
		this.api = API;
	}
	async signin(data: SigninData) {
		let result: ResultValidate;
		try {
			await this.api.signin(data);
			await this.fetchUser();
			result = {
				is_ok: true,
				msg_text: "Пользователь был успешно зарегистирован."
			};
		} catch (e: any) {
			result = {
				is_ok: false,
				msg_text: e.reason
			};
		}
		return result;
	}

	async signup(data: SignupData) {
		let result: ResultValidate;
		try {
			await this.api.signup(data);
			await this.fetchUser();
			result = {
				is_ok: true,
				msg_text: "Пользователь был успешно зарегистирован."
			};
		} catch (e: any) {
			result = {
				is_ok: false,
				msg_text: e.reason
			};
		}
		return result;
	}



	async fetchUser() {
		try {
			const user: any= await this.api.read();
			store.set("user", user);
		} catch (err: any) {}
	}

	public getRegistrationError() {
		return store.getState().reg_error? store.getState().reg_error : "";
	}

	async logout() {
		try {
			MessagesController.closeAll();
			await this.api.logout();
			router.go("/");
		} catch (e: any) {
			console.error(e.message);
		}
	}
}

export default new AuthController();
