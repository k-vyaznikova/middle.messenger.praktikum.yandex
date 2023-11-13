import {Block} from "/utils/block.ts";
import template from "/pages/register/register.hbs";
import AuthController from "/controllers/auth-controller.ts";
import {Form} from "/components/form/script.ts";
import {InputProps} from "/types/common_types";


export class RegisterPage extends Block {
	constructor() {
		super();
	}


	init() {
		const arrProps: Array<any> = [
			{
				name: "email",
				label: "Почта",
				type: "text",
				validate_type: "email,not-empty"
			},
			{
				name: "login",
				label: "Логин",
				type: "text",
				validate_type: "login,not-empty"
			},
			{
				name: "first_name",
				label: "Имя",
				type: "text",
				validate_type: "name,not-empty"
			},
			{
				name: "second_name",
				label: "Фамилия",
				type: "text",
				validate_type: "name,not-empty"
			},
			{
				name: "phone",
				label: "Телефон",
				type: "text",
				validate_type: "phone,not-empty"
			},
			{
				name: "password",
				label: "Пароль",
				type: "password",
				validate_type: "password,not-empty",
				not_empty: "yes"
			},
			{
				name: "password",
				label: "Пароль (ещё раз)",
				id: "password_conf_reg",
				type: "password",
				ref: "input_password_conf",
				validate_type: "password_confirm,not-empty",
				related_field: "password_reg",
				comparison_value: ""
			}
		];

		const inputsProps: Array<any> = arrProps.map((props) => {
			let newProps: Record<string, string> = {
				...props,
				error: "",
				not_empty: "yes"
			};
			if (!newProps["id"] && !newProps["ref"])
				newProps = {
					...newProps,
					id: props["name"] + "_reg",
					ref: "input_" + props["name"]
				};
			return newProps;
		});
		this.children.form = new Form({
			title: "Регистрация",
			ref: "form",
			// send_function: AuthController.signup,
			send_function: AuthController.signupAndSignin,
			context_func: AuthController,
			error: {text: ""},
			inputs: (inputsProps as InputProps[]),
			link: {
				name: "Есть аккаунт?",
				href: "/",
				ref: "secondary_btn",
				class: "reg-link"
			},
			submit_btn: {
				text: "Зарегистрироваться"
			}

		});
	}


	render() {
		return this.compile(template, this.props);
	}
}
