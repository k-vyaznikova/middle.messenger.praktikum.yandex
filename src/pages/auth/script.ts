import {Block} from "/utils/block.ts";
import {Input} from "/components/input/script.ts";
import template from "/pages/auth/auth.hbs";
import {renderPage} from "/utils/render_page.ts";
import {checkError} from "/utils/validate.ts";
import {getFormData} from "/utils/get_form_data.ts";


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
						not_empty: "yes",
						onFocusout: () => {
							const inputComponent: Input = this.refs.form.refs.input_login;
							checkError(
								inputComponent?.getContent()?.querySelector("input")?.value,
								(inputComponent?.props.validate_type as string),
								inputComponent
							);
						}
						/* onKeyup: () =>{
							const inputComponent: Input = this.refs.form.refs.input_login;
							if (inputComponent?.getContent()?.querySelector("input").value.length === 1) {
								inputComponent.setProps({
									"not_empty": "yes",
									"value": inputComponent?.getContent()?.querySelector("input").value
								});
							} else if (inputComponent?.getContent()?.querySelector("input").value.length === 0) {
								inputComponent.setProps({
									"not_empty": "",
									"value": ""
								});
							}
						}*/

					},
					{
						name: "password",
						label: "Пароль",
						id: "password_auth",
						type: "password",
						error: "",
						ref: "input_password",
						validate_type: "login,not-empty",
						not_empty: "yes",
						onFocusout: () => {
							const inputComponent: Input = this.refs.form.refs.input_password;
							checkError(
								inputComponent?.getContent()?.querySelector("input")?.value,
								(inputComponent?.props.validate_type as string),
								inputComponent
							);
						}
					}
				],
				secondary_btn: {
					text: "Нет аккаунта?",
					href: "#",
					onClick: () => {
						renderPage("register");
					}
				},
				submit_btn: {
					text: "Авторизоваться",
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
