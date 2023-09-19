import {Block} from "/utils/block.ts";
import template from "/components/send_msg_form/template.hbs";
import {validate} from "../../utils/form_utils";
import MessagesController from "/controllers/messages-controller.ts";
import {SendMsgText} from "/components/send_msg_text/script.ts";
import {SendMsgFile} from "/components/send_msg_file/script.ts";
import {SendMsgBtn} from "/components/send_msg_btn/script.ts";
import { withStore } from "/utils/store.ts";

interface SendMsgFormProps{
}

class SendMsgFormInitial extends Block {
	constructor(props: SendMsgFormProps) {
		super({
			...props,
			onClick: (event: Event) => {
				event.preventDefault();
				this.submitMessage();
			}
		});
	}

	init() {
		this.children.sendMsgFile = new SendMsgFile({});
		this.children.sendMsgText = new SendMsgText({
			validate_type: "not-empty",
			events: {
				keyup: (event: Event) => {
					if ((event.keyCode == 13) && !event.ctrlKey) {
						event.preventDefault();
						this.submitMessage();
					} else {
						const textarea: HTMLElement = this.getTextarea();
						if (textarea.scrollHeight < 200)
							textarea.style.height = textarea.scrollHeight + "px";
					}
				}
			}
		});
		this.children.sendMsgBtn = new SendMsgBtn({
			events: {
				click: (event: Event) => {
					event.preventDefault();
					this.submitMessage();
				}
			}
		});
	}

	getTextarea() {
		return this.children.sendMsgText.element?.querySelector("textarea") as HTMLElement;
 	}

	submitMessage() {
		if (validate(this.getTextarea().value, this.children.sendMsgText.getValidateType() as string)) {
			const message: string = this.children.sendMsgText.getValue();
			this.children.sendMsgText.setValue("");
			MessagesController.sendMessage(this.props.selectedChat!, message);
		}
	}

	componentDidUpdate(oldProps: any, newProps: any): boolean {

	}
	render() {
		return this.compile(template, this.props);
	}
}



const withSelectedChat = withStore(state => ({selectedChat: state.selectedChat}));
export const SendMsgForm = withSelectedChat(SendMsgFormInitial);
