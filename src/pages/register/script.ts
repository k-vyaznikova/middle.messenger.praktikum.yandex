import {Block} from "/utils/block.ts";
import {Input} from "/components/input/script.ts";
import template from "/pages/register/register.hbs";
import {renderPage} from "/utils/render_page.ts";
import {checkError} from "/utils/validate.js";
import AuthController from "/controllers/auth-controller.ts";
import {SignupData} from "/api/auth-api";
// import {withStore} from "/utils/store.ts";

export class RegisterPage extends Block {
	constructor() {
		super(
			{
				title: "Регистрация",
				inputs: [
					{
						name: "email",
						label: "Почта",
						id: "email_reg",
						type: "text",
						error: "",
						ref: "input_email",
						validate_type: "email,not-empty",
						not_empty: "yes",
						value: "email@email.rt"
					},
					{
						name: "login",
						label: "Логин",
						id: "login_reg",
						type: "text",
						error: "",
						ref: "input_login",
						validate_type: "login,not-empty",
						not_empty: "yes",
						value: "login"
					},
					{
						name: "first_name",
						label: "Имя",
						id: "first_name_reg",
						type: "text",
						error: "",
						ref: "input_first_name",
						validate_type: "name,not-empty",
						not_empty: "yes",
						value: "Kristina"
					},
					{
						name: "second_name",
						label: "Фамилия",
						id: "second_name_reg",
						type: "text",
						error: "",
						ref: "input_second_name",
						validate_type: "name,not-empty",
						not_empty: "yes",
						value: "Kri"
					},
					{
						name: "phone",
						label: "Телефон",
						id: "phone_reg",
						type: "text",
						error: "",
						ref: "input_phone",
						validate_type: "phone,not-empty",
						not_empty: "yes",
						value: "1232342334"
					},
					{
						name: "password",
						label: "Пароль",
						id: "password_reg",
						type: "password",
						error: "",
						ref: "input_password",
						validate_type: "password,not-empty",
						not_empty: "yes",
						value: "123K23"
					},
					{
						name: "password",
						label: "Пароль (ещё раз)",
						id: "password_conf_reg",
						type: "password",
						error: "",
						ref: "input_password_conf",
						validate_type: "password_confirm,not-empty",
						not_empty: "yes",
						value: "123K23"
					}
				],
				error: {
					text: AuthController.getRegistrationError()
				},
				secondary_btn: {
					text: "Зарегистрироваться",
					href: "false",
					onClick: () => {
						renderPage("auth");
					}
				},
				submit_btn: {
					text: "Войти",
					onClick: (event: Event) => {
						event.preventDefault();
						let resultValid: boolean = true;
						const inputs = Object
							.values(this.refs.form.refs)
							.filter(function(item) {
								return item instanceof Input;
							}) as Array<Input>;
						inputs.forEach((input) => {
							if (!checkError(input.getValue(), input.getValidateType(), input) && resultValid)
								resultValid = false;
						});
						if (resultValid) {
							const dataPair: Array<any> = inputs.map(function(input) {
								return [input.getName(), input.getValue()];
							});
							const data = Object.fromEntries(dataPair);
							AuthController.signup(data as SignupData);
						}
					}
				}

			});
	}

	render() {
		return this.compile(template, this.props);
	}
}
