import {Block} from "/utils/block.ts";
import template from "/pages/auth/auth.hbs";
import {checkAndSendForm} from "/utils/form_utils.js";
import AuthController from "/controllers/auth-controller.ts";
import {SigninData} from "/api/auth-api";
import router from "/utils/routing/router.ts";


export class AuthPage extends Block {
	constructor() {
		super(
			{
				title: "Вход",
				inputs: [
					{
						name: "login",
						label: "Логин",
						id: "login_auth",
						type: "text",
						error: "",
						value: "",
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
				secondary_btn: {
					text: "Нет аккаунта?",
					href: "/register",
					ref: "secondary_btn",
					class: "reg-link"
				},
				submit_btn: {
					text: "Войти",
					onClick: (event: Event) => {
						event.preventDefault();
						checkAndSendForm(this.refs.form, this.sendData.bind(this));
					}
				},
				error: ""

			});
	}
	private sendData(data: SigninData) {
		const that: any = this;
		AuthController.signin(data as SigninData).then(function(result: ResultValidate) {
			if (result.is_ok)
				router.go("/chats");
			else {
				that.props.inputs = that.props.inputs.map(function(item: any) {
					return {
						...item,
						value: that.refs.form.refs[item.ref].value
					};
				});
				that.setProps({
					...that.props,
					error: result.msg_text
				});
			}
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}


