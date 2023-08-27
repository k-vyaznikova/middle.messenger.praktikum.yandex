import {Block} from "/utils/block.ts";
import {Input} from "/components/input/script.ts";
import template from "/pages/register/register.hbs";
import {renderPage} from "/utils/render_page.ts";
import {checkError} from "/utils/validate.js";
import {getFormData} from "/utils/get_form_data.ts";
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
						onFocusout: () => {
							const inputComponent: Input = this.refs.form.refs.input_email;
							checkError(
								inputComponent?.getContent()?.querySelector("input")?.value,
								(inputComponent?.props.validate_type as string),
								inputComponent
							);
						}

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
						onFocusout: () => {
							const inputComponent: Input = this.refs.form.refs.input_login;
							checkError(
								inputComponent?.getContent()?.querySelector("input")?.value,
								(inputComponent?.props.validate_type as string),
								inputComponent
							);
						}
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
						onFocusout: () => {
							const inputComponent: Input = this.refs.form.refs.input_first_name;
							checkError(
								inputComponent?.getContent()?.querySelector("input")?.value,
								(inputComponent?.props.validate_type as string),
								inputComponent
							);
						}
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
						onFocusout: () => {
							const inputComponent: Input = this.refs.form.refs.input_second_name;
							checkError(
								inputComponent?.getContent()?.querySelector("input")?.value,
								(inputComponent?.props.validate_type as string),
								inputComponent
							);
						}
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
						onFocusout: () => {
							const inputComponent: Input = this.refs.form.refs.input_password;
							checkError(
								inputComponent?.getContent()?.querySelector("input")?.value,
								(inputComponent?.props.validate_type as string),
								inputComponent
							);
						}
					},
					{
						name: "password",
						label: "Пароль (ещё раз)",
						id: "password_conf_reg",
						type: "password",
						error: "",
						ref: "input_password_conf",
						validate_type: "password,not-empty",
						not_empty: "yes",
						onFocusout: () => {
							const inputComponent: Input = this.refs.form.refs.input_password_conf;
							checkError(
								inputComponent?.getContent()?.querySelector("input")?.value,
								(inputComponent?.props.validate_type as string),
								inputComponent
							);
						}
					}
				],
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
						Object.keys(this.refs.form.refs).forEach((key) => {
							if (!checkError(
								this.refs.form.refs[key]?.getContent()?.querySelector("input")?.value,
								(this.refs.form.refs[key]?.props.validate_type as string),
								this.refs.form.refs[key]
							))
								resultValid = false;
						});
						if (resultValid) {
							getFormData(this.refs.form);
							renderPage("chat");
						}
					}
				}

			});
	}

	render() {
		return this.compile(template, this.props);
	}
}
