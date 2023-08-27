import {Block} from "/utils/block.ts";
import template from "/pages/profile/profile.hbs";
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
				profilePhoto: "/img/noimgprofile.svg",
				profileAlt: "Иван"
			},
			profile_items: [
				{
					infoLabel: "Почта",
					infoValue: "pochta@yandex.ru",
					infoName: "email",
					infoType: "text"
				},
				{
					infoLabel: "Логин",
					infoValue: "ivanivanov",
					infoName: "login",
					infoType: "text"
				},
				{
					infoLabel: "Имя",
					infoValue: "Иван",
					infoName: "first_name",
					infoType: "text"
				},
				{
					infoLabel: "Фамилия",
					infoValue: "Иванов",
					infoName: "second_name",
					infoType: "text"
				},
				{
					infoLabel: "Имя в чате",
					infoValue: "ivanivanov",
					infoName: "display_name",
					infoType: "text"
				},
				{
					infoLabel: "Телефон",
					infoValue: "+7 (909)-606-66-66",
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
