import {Block} from "/utils/block.ts";
import template from "/components/profile_photo/template.hbs";
import {PhotoView} from "/components/photo_view/script.ts";
import Popup from "/layouts/popup/popup.ts";
import {ChangePhotoPopup} from "/components/change_photo_popup/script";
import {ResultValidate} from "/types/common_types.ts";

interface ProfilePhotoProps{
	profilePhoto: string,
	profileAlt: string,
	events?:{
		click?: () => void,
		mouseover: () => void,
		mouseleave: () => void
	},
	uploadFunc?: (form: HTMLFormElement) => Promise<ResultValidate>,
	chatId?: string,
	allowEdit? : string
}

export class ProfilePhoto extends Block {
	constructor(props: ProfilePhotoProps) {
		super(props);
	}

	init() {
		this.children.photoView = new PhotoView({
			profilePhoto: this.props.profilePhoto as string,
			profileAlt: this.props.profileAlt as string,
			events: {
				mouseover: () => {
					if (this.props.allowEdit)
						this.element?.querySelector(".change-avatar")?.classList.remove("invis");
				},
				mouseleave: () => {
					if (this.props.allowEdit)
						this.element?.querySelector(".change-avatar")?.classList.add("invis");
				},
				click: (event: Event) => {
					event.preventDefault();
					if (this.props.allowEdit)
						this.children.popup.setProps({
							classVisibility: "visible"
						});
				}
			}
		});
		if (this.props.allowEdit)
			this.children.popup = new Popup({
				classVisibility: "invisible",
				content: new ChangePhotoPopup({
					error: "",
					funcClosePopup: () => {
						this.children.popup.setProps({
							classVisibility: "invisible"
						});
					},
					uploadFunc: this.props.uploadFunc as ((form: HTMLFormElement) => Promise<ResultValidate>),
					chatId: this.props.chatId as string
				}),
				events: {
					close: () => {
						this.children.popup.setProps({
							classVisibility: "invisible"
						});
					}
				}

			});
	}

	render() {
		return this.compile(template, this.props);
	}
}


