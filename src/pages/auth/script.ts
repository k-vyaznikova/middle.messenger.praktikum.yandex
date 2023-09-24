import {Block} from "/utils/block.ts";
import template from "/pages/auth/auth.hbs";
import {Form} from "/components/form/script.ts";
import AuthController from "/controllers/auth-controller";


export class AuthPage extends Block {
	constructor() {
		super();
	}

	init() {
		this.children.form = new Form({
			title: "Вход",
			ref: "form",
			send_function: AuthController.signin,
			inputs: [
				{
					name: "login",
					label: "Логин",
					id: "login_auth",
					type: "text",
					error: "",
					ref: "input_login",
					validate_type: "login,not-empty",
					not_empty: "yes"
				},
				{
					name: "password",
					label: "Пароль",
					id: "password_auth",
					type: "password",
					error: "",
					ref: "input_password",
					validate_type: "password,not-empty",
					not_empty: "yes"
				}
			],
			link: {
				name: "Нет аккаунта?",
				href: "/register",
				ref: "secondary_btn",
				class: "reg-link"
			},
			submit_btn: {
				text: "Войти"
			},
			error: {text: ""}
		});
	}

	render() {
		return this.compile(template, this.props);
	}
}


