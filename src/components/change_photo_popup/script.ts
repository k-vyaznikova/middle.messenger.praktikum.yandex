import {Block} from "/utils/block.ts";
import template from "/components/change_photo_popup/template.hbs";
import {UploadLink} from "/components/upload_link/script";
import {UploadFile} from "/components/upload_file/script";
import {SubmitBtn} from "/components/submit_btn/script";
import UserController from "/controllers/user-controller";
import {DeleteFile} from "/components/delete_file/script";
import {ResultValidate} from "/types/common_types";
import {ErrorMsg} from "/components/error_msg/script";

interface ChangePhotoPopupProps{
	funcClosePopup: () => void,
	error: string
}

export class ChangePhotoPopup extends Block {
	constructor(props: ChangePhotoPopupProps) {
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
			text: "Выберите файл на компьютере",
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
			"text": "Поменять аватар",
			"onClick": (event: Event) => {
				event.preventDefault();
				this.uploadAvatar();
			}
		});
	}


	showFileInfo() {
		(this.element?.querySelector(".selected-file") as HTMLElement).style.display = "block";
	}

	hideFileInfo() {
		(this.element?.querySelector(".selected-file") as HTMLElement).style.display = "none";
	}


	async uploadAvatar() {
		let result: ResultValidate;
		if ((this.children.uploadFile.element as HTMLInputElement).value.length <= 0)
			result = {
				is_ok: false,
				msg_text: "Вы забыли загрузить файл с изображением"
			};
		else
			result = await UserController.uploadAvatar(new FormData(this.element as HTMLFormElement));
		if (result.is_ok === true) {
			this.props.funcClosePopup();
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
