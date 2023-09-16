import {Block} from "/utils/block.ts";
import template from "/pages/profile-edit/profile-edit.hbs";
import {getFormData} from "/utils/get_form_data";
import {checkError} from "../../utils/form_utils";

import img from "/img/noimgprofile.svg";
export class ProfileEditPage extends Block {
	constructor() {
		super({
			title: "Иван",
			submit_url: "#",
			edit_mode: "yes",
			exit_link: "#",
			ref: "form",
			profile_photo: {
				profilePhoto: img,
				profileAlt: "Иван"
			},
			profile_items: [
				{
					infoLabel: "Почта",
					value: "pochta@yandex.ru",
					infoName: "email",
					infoType: "text",
					editMode: "yes",
					ref: "input_email",
					validate_type: "email,not-empty"
				},
				{
					infoLabel: "Логин",
					value: "ivanivanov",
					infoName: "login",
					infoType: "text",
					editMode: "yes",
					ref: "input_login",
					validate_type: "login,not-empty"
				},
				{
					infoLabel: "Имя",
					value: "Иван",
					infoName: "first_name",
					infoType: "text",
					editMode: "yes",
					ref: "input_first_name",
					validate_type: "name,not-empty"
				},
				{
					infoLabel: "Фамилия",
					value: "Иванов",
					infoName: "second_name",
					infoType: "text",
					editMode: "yes",
					ref: "input_second_name",
					validate_type: "name,not-empty"
				},
				{
					infoLabel: "Имя в чате",
					value: "ivanivanov",
					infoName: "display_name",
					infoType: "text",
					editMode: "yes",
					ref: "input_display_name",
					validate_type: "not-empty"
				},
				{
					infoLabel: "Телефон",
					value: "+79096066666",
					infoName: "phone",
					infoType: "phone",
					editMode: "yes",
					ref: "input_phone",
					validate_type: "phone,not-empty"
				}
			],
			submit_btn: {
				text: "Сохранить изменения",
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
					}
				}
			}
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}
