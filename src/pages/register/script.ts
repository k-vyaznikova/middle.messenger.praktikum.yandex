import {Block} from "/utils/block.ts";
import template from "/pages/register/register.hbs";
import {checkAndSendForm} from "/utils/form_utils.js";
import AuthController from "/controllers/auth-controller.ts";
import {SignupData} from "/api/auth-api";
import {ResultValidate} from "/types/common_types.ts";
import router from "/utils/routing/router.ts";
import {Input} from "/components/input/script.ts";

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
						not_empty: "yes"
					},
					{
						name: "login",
						label: "Логин",
						id: "login_reg",
						type: "text",
						error: "",
						ref: "input_login",
						validate_type: "login,not-empty",
						not_empty: "yes"
					},
					{
						name: "first_name",
						label: "Имя",
						id: "first_name_reg",
						type: "text",
						error: "",
						ref: "input_first_name",
						validate_type: "name,not-empty",
						not_empty: "yes"
					},
					{
						name: "second_name",
						label: "Фамилия",
						id: "second_name_reg",
						type: "text",
						error: "",
						ref: "input_second_name",
						validate_type: "name,not-empty",
						not_empty: "yes"
					},
					{
						name: "phone",
						label: "Телефон",
						id: "phone_reg",
						type: "text",
						error: "",
						ref: "input_phone",
						validate_type: "phone,not-empty",
						not_empty: "yes"
					},
					{
						name: "password",
						label: "Пароль",
						id: "password_reg",
						type: "password",
						error: "",
						ref: "input_password",
						validate_type: "password,not-empty",
						not_empty: "yes"
					},
					{
						name: "password",
						label: "Пароль (ещё раз)",
						id: "password_conf_reg",
						type: "password",
						error: "",
						ref: "input_password_conf",
						validate_type: "password_confirm,not-empty",
						related_field: "password_reg",
						not_empty: "yes",
						comparison_value: ""
					}
				],
				error: "",
				secondary_btn: {
					text: "Уже есть аккаунт",
					href: "/",
					ref: "secondary_btn",
					class: "reg-link"
				},
				submit_btn: {
					text: "Зарегистрироваться",
					onClick: (event: Event) => {
						event.preventDefault();
						checkAndSendForm(this.refs.form, this.sendData.bind(this));
					}
				}

			}
		);
	}

	private sendData(data: SignupData) {
		const that: any = this;
		AuthController.signup(data as SignupData).then(function(result: ResultValidate) {
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
