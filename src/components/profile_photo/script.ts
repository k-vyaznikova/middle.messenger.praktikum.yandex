import {Block} from "/utils/block.ts";
import template from "/components/profile_photo/template.hbs";
import {PhotoView} from "/components/photo_view/script.ts";
import Popup from "/layouts/popup/popup.ts";
import {ChangePhotoPopup} from "/components/change_photo_popup/script";

interface ProfilePhotoProps{
	profilePhoto: string,
	profileAlt: string,
	events?:{
		click?: () => void,
		mouseover: () => void,
		mouseleave: () => void
	}
}

export class ProfilePhoto extends Block {
	constructor(props: ProfilePhotoProps) {
		super(props);
	}

	init() {
		this.children.photoView = new PhotoView({
			profilePhoto: this.props.profilePhoto,
			profileAlt: this.props.profileAlt,
			events: {
				mouseover: () => {
					this.element?.querySelector(".change-avatar")?.classList.remove("invis");
				},
				mouseleave: () => {
					this.element?.querySelector(".change-avatar")?.classList.add("invis");
				},
				click: (event: Event) => {
					event.preventDefault();
					this.children.popup.setProps({
						classVisibility: "visible"
					});
				}
			}
		});
		this.children.popup = new Popup({
			classVisibility: "invisible",
			content: new ChangePhotoPopup({
				error: "",
				funcClosePopup: () => {
					this.children.popup.setProps({
						classVisibility: "invisible"
					});
				}
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


