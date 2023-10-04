import {Block} from "/utils/block.ts";
import template from "/components/delete_chat/template.hbs";
import {SubmitBtn} from "/components/submit_btn/script";
import ChatsController from "/controllers/chats-controller";
import {ResultValidate} from "/types/common_types";
import {ErrorMsg} from "../error_msg/script";
import Router from "/utils/routing/router";


interface DeleteChatProps{
	funcClosePopup: () => void,
	error: string,
	chat_id: string,
	title: string
}

export class DeleteChat extends Block {
	constructor(props: DeleteChatProps) {
		super(props);
	}

	init() {
		this.children.submitBtnDelete = new SubmitBtn({
			text: "Удалить",
			add_class: "only-border",
			onClick: async (event: Event) => {
				event.preventDefault();
				await this.deleteChat();
			}
		});

		this.children.submitBtnCancel = new SubmitBtn({
			text: "Не удалять",
			onClick: (event: Event) => {
				event.preventDefault();
				(this.props.funcClosePopup as ()=>void)();
			}
		});

		this.children.errorMsg = new ErrorMsg({
			text: ""
		});
	}

	async deleteChat() {
		const result: ResultValidate | number = await ChatsController.deleteChat(this.props.chat_id as number);
		if (result.is_ok === false) {
			this.children.errorMsg.setProps({
				text: result.msg_text? result.msg_text : "Ошибка при удалении чата"
			});
		} else {
			(this.props.funcClosePopup as ()=> void)();
			this.children.errorMsg.setProps({
				"text": ""
			});
			Router.go("/chat");
		}
	}


	render() {
		return this.compile(template, this.props);
	}
}
