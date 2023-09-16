import {Block} from "/utils/block.ts";
import template from "/pages/chat-edit/chat-edit.hbs";
import img from "/img/noimgprofile.svg";
import ChatController from "/controllers/chats-controller.ts";

export class ChatEditPage extends Block {
	constructor() {
		super({
			title: "Иван",
			submit_url: "#",
			edit_mode: "yes",
			ref: "form",
			profile_photo: {
				profilePhoto: img,
				profileAlt: "Иван"
			},
			profile_items: [
				{
					infoLabel: "Назване чата",
					editMode: "yes",
					infoType: "text",
					infoName: "name",
					value: "Соседи",
					validate_type: "not-empty",
					ref: "input_name"
				}
			],
			submit_btn: {
				text: "Создать чат"
			}
		});
	}


	render() {
		return this.compile(template, this.props);
	}
}
