import {Block} from "/utils/block.ts";
import template from "/pages/password-edit/password-edit.hbs";
import {renderPage} from "/utils/render_page.ts";
import {checkError} from "/utils/validate.js";
import {getFormData} from "/utils/get_form_data.js";
import img from "/img/noimgprofile.svg";

export class PassEditPage extends Block {
	constructor() {
		super(
			{
				title: "Изменение пароля",
				submit_url: "#",
				edit_mode: "yes",
				ref: "form",
				profile_photo: {
					profilePhoto: img,
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
						not_empty: "yes"
					},
					{
						infoLabel: "Новый пароль",
						infoValue: "111111",
						infoName: "newPassword",
						infoType: "password",
						editMode: "yes",
						ref: "input_password_1",
						validate_type: "not-empty,password",
						not_empty: "yes"
					},
					{
						infoLabel: "Повторите новый пароль",
						infoValue: "111111",
						infoName: "newPassword",
						infoType: "password",
						editMode: "yes",
						ref: "input_password_2",
						validate_type: "not-empty,password",
						not_empty: "yes"
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
							) && resultValid)
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
