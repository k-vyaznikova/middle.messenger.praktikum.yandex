import {Block} from "/utils/block.ts";
import template from "/pages/password-edit/password-edit.hbs";
import {InputProps} from "/types/common_types.js";
import {Form} from "/components/form/script.ts";
import UserController from "/controllers/user-controller";

export class PassEditPage extends Block {
	constructor() {
		super();
	}


	protected init(): void {
		const inputsProps: Array<any> = [
			{
				id: "oldPassword_pass",
				name: "oldPassword",
				label: "Старый пароль",
				type: "password",
				validate_type: "not-empty",
				not_empty: "yes",
				error: "",
				ref: "input_login"
			},
			{
				id: "newPassword_pass",
				name: "newPassword",
				label: "Новый пароль",
				type: "password",
				validate_type: "not-empty",
				not_empty: "yes",
				error: "",
				ref: "input_login"
			},
			{
				id: "newPassword_pass_conf",
				name: "newPassword",
				label: "Повторите новый пароль",
				type: "password",
				validate_type: "not-empty,password",
				not_empty: "yes",
				related_field: "password_reg",
				comparison_value: "",
				error: "",
				ref: "input_login"
			}
		];
		this.children.form = new Form({
			title: "Изменение пароля",
			send_function: UserController.changePass,
			context_func: UserController,
			ref: "form",
			error: {text: ""},
			inputs: (inputsProps as InputProps[]),
			link: {
				name: "Вернуться в профиль",
				href: "/profile",
				ref: "secondary_btn",
				class: "reg-link"
			},
			submit_btn: {
				text: "Сохранить"
			}

		});
	}

	render() {
		return this.compile(template, this.props);
	}
}
