import {Block} from "/utils/block.ts";
import template from "/components/send_msg_form/template.hbs";
import {validate} from "/utils/form_utils";
import MessagesController from "/controllers/messages-controller.ts";
import {SendMsgText} from "/components/send_msg_text/script.ts";
import {SendMsgBtn} from "/components/send_msg_btn/script.ts";
import {withStore} from "/utils/store.ts";

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
		this.children.sendMsgText = new SendMsgText({
			validate_type: "not-empty",
			events: {
				keyup: (event: Event) => {
					if (((event as KeyboardEvent).keyCode == 13) && !(event as KeyboardEvent).ctrlKey) {
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
			onClick: (event: Event) => {
				event.preventDefault();
				this.submitMessage();
			}
		});
	}

	getTextarea() {
		return this.children.sendMsgText.element?.querySelector("textarea") as HTMLElement;
	}

	submitMessage() {
		if (validate((this.getTextarea() as HTMLTextAreaElement).value, (this.children.sendMsgText as SendMsgText).getValidateType() as string)) {
			const message: string = (this.children.sendMsgText as SendMsgText).getValue();
			(this.children.sendMsgText as SendMsgText).setValue("");
			MessagesController.sendMessage(this.props.selectedChat as number, message);
		}
	}
	render() {
		return this.compile(template, this.props);
	}
}


const withSelectedChat = withStore((state: Record<string, any>) => ({selectedChat: state.selectedChat}));
export const SendMsgForm = withSelectedChat(SendMsgFormInitial);
