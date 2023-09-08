import {API, AuthAPI, SigninData, SignupData, User} from "/api/auth-api.ts";
import router from "/utils/routing/router.ts";
import store from "/utils/store.ts";

export class AuthController {
	private api: AuthAPI;

	constructor() {
		this.api = API;
	}

	async signup(data: SignupData) {
		try {
			await this.api.signup(data);
			await this.fetchUser();
			router.go("/chat");
			return true;
		} catch (e: any) {
			store.set("user", data);
			return false;
		}
	}

	async fetchUser() {
		try {
			const user: any= await this.api.read();
			store.set("user", user);
		} catch (err: any) {
			console.error(err);
		}
	}

	public getRegistrationError() {
		return store.getState().reg_error? store.getState().reg_error : "";
	}
}

export default new AuthController();
