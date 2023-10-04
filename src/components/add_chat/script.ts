import {Block} from "/utils/block.ts";
import template from "/components/add_chat/template.hbs";
import {Input} from "/components/input/script";
import {SubmitBtn} from "/components/submit_btn/script";
import {checkError} from "/utils/form_utils";
import ChatsController from "/controllers/chats-controller";
import {ResultValidate} from "/types/common_types";
import {ErrorMsg} from "../error_msg/script";


interface AddChatProps{
	funcClosePopup: () => void,
	error: string
}

export class AddChat extends Block {
	constructor(props: AddChatProps) {
		super(props);
	}

	init() {
		this.children.errorMsg = new ErrorMsg({
			text: ""
		});
		this.children.input = new Input({
			id: "title_input",
			label: "Название чата",
			name: "title",
			type: "text",
			ref: "title_input",
			validate_type: "not-empty",
			not_empty: "yes",
			error: ""
		});
		this.children.submitBtn = new SubmitBtn({
			text: "Создать чат",
			onClick: async (event: Event) => {
				event.preventDefault();
				console.log("in onClick");
				await this.addChat();
			}
		});
	}

	async addChat() {
		if (checkError(this.chat_name, this.children.input.props.validate_type as string, this.children.input as Input)) {
			const result: ResultValidate = await ChatsController.createChat(this.chat_name);
			if (result.is_ok) {
				this.children.errorMsg.setProps({
					"text": result.msg_text
				});
				this.children.input.setProps({
					"value": ""
				});
				const func: ()=>void = this.props.funcClosePopup as ()=>void;
				func();
			} else {
				this.children.errorMsg.setProps({
					text: (result.msg_text)? result.msg_text : "Ошибка при создании чата"
				});
			}
			return result;
		}
	}

	get chat_name() {
		return (this.children.input.element?.querySelector("input")as HTMLInputElement).value;
	}

	render() {
		return this.compile(template, this.props);
	}
}
