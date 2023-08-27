import {Block} from "/utils/block.ts";
import {Input} from "/components/input/script.ts";
import template from "/pages/password-edit/password-edit.hbs";
import {renderPage} from "/utils/render_page.ts";
import {checkError} from "/utils/validate.js";
import {getFormData} from "/utils/get_form_data.js";

export class PassEditPage extends Block {
	constructor() {
		super(
			{
				title: "Изменение пароля",
				submit_url: "#",
				profile_photo: {
					profilePhoto: "/img/noimgprofile.svg",
					profileAlt: "Иван"
				},
				profile_items: [
					{
						infoLabel: "Старый пароль",
						infoValue: "111111",
						infoName: "oldPassword",
						infoType: "password",
						editMode: "yes",
						ref: "input_password_old",
						validate_type: "not-empty",
						not_empty: "yes",
						onFocusout: () => {
							const inputComponent: Input = this.refs.form.refs.input_password_old;
							checkError(
								inputComponent?.getContent()?.querySelector("input")?.value,
								(inputComponent?.props.validate_type as string),
								inputComponent
							);
						}
					},
					{
						infoLabel: "Новый пароль",
						infoValue: "111111",
						infoName: "newPassword",
						infoType: "password",
						editMode: "yes",
						ref: "input_password_1",
						validate_type: "not-empty,password",
						not_empty: "yes",
						onFocusout: () => {
							const inputComponent: Input = this.refs.form.refs.input_password_1;
							checkError(
								inputComponent?.getContent()?.querySelector("input")?.value,
								(inputComponent?.props.validate_type as string),
								inputComponent
							);
						}
					},
					{
						infoLabel: "Повторите новый пароль",
						infoValue: "111111",
						infoName: "newPassword",
						infoType: "password",
						editMode: "yes",
						ref: "input_password_2",
						validate_type: "not-empty,password",
						not_empty: "yes",
						onFocusout: () => {
							const inputComponent: Input = this.refs.form.refs.input_password_2;
							checkError(
								inputComponent?.getContent()?.querySelector("input")?.value,
								(inputComponent?.props.validate_type as string),
								inputComponent
							);
						}
					}

				],
				submit_btn: {
					text: "Сохранить",
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
