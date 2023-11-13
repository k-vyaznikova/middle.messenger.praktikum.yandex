import {Block} from "/utils/block.ts";
import template from "/components/send_msg_file/template.hbs";
import Popup from "/layouts/popup/popup";
import {PopupOpen} from "/components/popup_open/script";
import {ChangePhotoPopup} from "/components/change_photo_popup/script";
import {ResultValidate} from "/types/common_types";

interface SendMsgFileProps{
	name?: string,
	value?: string,
	validate_type?: string,
	events?:{
		click: (event: Event) => void
	}
}

export class SendMsgFile extends Block {
	constructor(props: SendMsgFileProps) {
		super({
			...props,
			events: {
				click: (event: Event) => {
					event.preventDefault();
					if ((event.target as HTMLElement).classList.contains("attach-btn")) {
						if (!this.props.attachChooseOpen)
							this.setProps({
								attachChooseOpen: "yes"
							});
						else
							this.setProps({
								attachChooseOpen: ""
							});
					}
				}
			}
		});
	}

	protected init(): void {
		this.children.popupUploadFile = new Popup({
			classVisibility: "invisible",
			content: new ChangePhotoPopup({
				error: "",
				funcClosePopup: () => {
					this.children.popupUploadFile.setProps({
						classVisibility: "invisible"
					});
				},
				uploadFunc: this.props.uploadFunc as ((form: HTMLFormElement) => Promise<ResultValidate>),
				chatId: this.props.chatId as string
			}),
			events: {
				close: () => {
					this.children.popupUploadFile.setProps({
						classVisibility: "invisible"
					});
				}
			}
		});

		this.children.popupOpen = new PopupOpen({
			class: "attach-btn",
			href: "#",
			onClick: () => {
				this.children.popupUploadFile.setProps({
					classVisibility: "visible"
				});
			}
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}
