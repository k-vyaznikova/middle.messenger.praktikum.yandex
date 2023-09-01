import {Block} from "/utils/block.ts";
import template from "/pages/profile/profile.hbs";
import img from "/img/noimgprofile.svg";
export class ProfilePage extends Block {
	constructor() {
		super({
			title: "Иван",
			submit_url: "#",
			footer_links: "yes",
			edit_profile_link: "#",
			edit_password_link: "#",
			exit_link: "#",
			profile_photo: {
				profilePhoto: img,
				profileAlt: "Иван"
			},
			profile_items: [
				{
					infoLabel: "Почта",
					value: "pochta@yandex.ru",
					infoName: "email",
					infoType: "text"
				},
				{
					infoLabel: "Логин",
					value: "ivanivanov",
					infoName: "login",
					infoType: "text"
				},
				{
					infoLabel: "Имя",
					value: "Иван",
					infoName: "first_name",
					infoType: "text"
				},
				{
					infoLabel: "Фамилия",
					value: "Иванов",
					infoName: "second_name",
					infoType: "text"
				},
				{
					infoLabel: "Имя в чате",
					value: "ivanivanov",
					infoName: "display_name",
					infoType: "text"
				},
				{
					infoLabel: "Телефон",
					value: "+7 (909)-606-66-66",
					infoName: "phone",
					infoType: "phone"
				}
			]
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}
