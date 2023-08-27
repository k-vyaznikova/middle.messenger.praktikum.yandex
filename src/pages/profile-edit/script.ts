import {Block} from "/utils/block.ts";
import template from "/pages/profile-edit/profile-edit.hbs";
import img from "/img/noimgprofile.svg";
export class ProfileEditPage extends Block {
	constructor() {
		super({
			title: "Иван",
			submit_url: "#",
			edit_mode: "yes",
			exit_link: "#",
			profile_photo: {
				profilePhoto: img,
				profileAlt: "Иван"
			},
			profile_items: [
				{
					infoLabel: "Почта",
					infoValue: "pochta@yandex.ru",
					infoName: "email",
					infoType: "text",
					editMode: "yes"
				},
				{
					infoLabel: "Логин",
					infoValue: "ivanivanov",
					infoName: "login",
					infoType: "text",
					editMode: "yes"
				},
				{
					infoLabel: "Имя",
					infoValue: "Иван",
					infoName: "first_name",
					infoType: "text",
					editMode: "yes"
				},
				{
					infoLabel: "Фамилия",
					infoValue: "Иванов",
					infoName: "second_name",
					infoType: "text",
					editMode: "yes"
				},
				{
					infoLabel: "Имя в чате",
					infoValue: "ivanivanov",
					infoName: "display_name",
					infoType: "text",
					editMode: "yes"
				},
				{
					infoLabel: "Телефон",
					infoValue: "+7 (909)-606-66-66",
					infoName: "phone",
					infoType: "phone",
					editMode: "yes"
				}
			],
			submit_btn: {
				text: "Сохранить изменения"
			}
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}
