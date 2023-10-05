import {Block} from "/utils/block.ts";
import template from "/components/add_file_to_mess/template.hbs";
import {UploadLink} from "/components/upload_link/script";
import {UploadFile} from "/components/upload_file/script";
import {SubmitBtn} from "/components/submit_btn/script";
import {DeleteFile} from "/components/delete_file/script";
import {ResultValidate} from "/types/common_types";
import {ErrorMsg} from "/components/error_msg/script";
import MessagesController from "/controllers/messages-controller";

interface AddFileToMessProps{
	funcClosePopup: () => void,
	error: string,
	uploadFunc: (form: HTMLFormElement) => Promise<ResultValidate>,
	chatId: string
}

export class AddFileToMess extends Block {
	constructor(props: AddFileToMessProps) {
		super(props);
	}

	init() {
		this.children.uploadFile = new UploadFile({
			file: "",
			events: {
				change: () => {
					const fileName: string = (this.children.uploadFile.element as HTMLInputElement).value;
					if (fileName) {
						const uploadNameBlock: HTMLElement = this.element?.querySelector(".selected-file-name") as HTMLElement;
						uploadNameBlock.innerHTML = (this.children.uploadFile.element as HTMLInputElement).value;
						this.showFileInfo();
					} else {
						const uploadNameBlock: HTMLElement = this.element?.querySelector(".selected-file-name") as HTMLElement;
						uploadNameBlock.innerHTML = "";
						this.hideFileInfo();
					}
				}
			}
		});

		this.children.uploadLink = new UploadLink({
			text: "Выберите файл для отправки",
			events: {
				click: (event: Event) => {
					event.preventDefault();

					const evt: Event = document.createEvent("MouseEvents");
					evt.initEvent("click", true, false);
					this.element?.querySelector("input.upload-file")?.dispatchEvent(evt);
				}
			}

		});

		this.children.errorMsg = new ErrorMsg({
			text: ""

		});

		this.children.deleteFile = new DeleteFile({
			events: {
				click: () => {
					(this.element as HTMLFormElement).reset();
					const event = new Event("change");
					this.element?.querySelector("input.upload-file")?.dispatchEvent(event);
				}
			}
		});


		this.children.submitBtn = new SubmitBtn({
			"text": "Отправить файл",
			"onClick": (event: Event) => {
				event.preventDefault();
				// this.uploadAvatar();
			}
		});
	}


	showFileInfo() {
		(this.element?.querySelector(".selected-file") as HTMLElement).style.display = "block";
	}

	hideFileInfo() {
		(this.element?.querySelector(".selected-file") as HTMLElement).style.display = "none";
	}


	async submitFile() {
		let result: ResultValidate = {
			is_ok: true,
			msg_text: ""
		};
		if ((this.children.uploadFile.element as HTMLInputElement).value.length <= 0)
			result = {
				is_ok: false,
				msg_text: "Вы забыли загрузить файл с изображением"
			};
		else {
			await MessagesController.sendMessage(this.props.selectedChat as number, "");
		}

		if (result.is_ok === true) {
			(this.props.funcClosePopup as ()=>void)();
			this.children.errorMsg.setProps({
				"text": ""
			});
		} else {
			this.children.errorMsg.setProps({
				"text": result.msg_text
			});
		}
	}
	render() {
		return this.compile(template, this.props);
	}
}
