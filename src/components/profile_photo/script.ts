import {Block} from "/utils/block.ts";
import template from "/components/profile_photo/template.hbs";
import {PhotoView} from "/components/photo_view/script.ts"
import Popup from "/layouts/popup/popup.ts";
import ChangePhotoPopup from "/components/change_photo_popup/script";

interface ProfilePhotoProps{
	profilePhoto: string,
	profileAlt: string,
	events:{
		click?: () => void,
		mouseover: () => void,
		mouseleave: () => void
	}
}

export class ProfilePhoto extends Block {
	constructor(props: ProfilePhotoProps) {
		super({
			...props,
			events: {
				mouseover: () => {
					this.element?.querySelector(".change-avatar")?.classList.remove("invis");
				},
				mouseleave: () => {
					this.element?.querySelector(".change-avatar")?.classList.add("invis");
				},
				click: () => {
					console.log(this.children.popup);
					this.children.popup.setProps({
						classVisibility: ""
					});
					console.log("in click");
				}
			}
		});
	}

	init(){
		this.children.photoView = new PhotoView({
			profilePhoto: this.props.profilePhoto,
			profileAlt: this.props.profileAlt
		});
		this.children.popup = new Popup({
			classVisibility: "popup-block-invis"
		});
		console.log("in init");
	}

	render() {
		console.log("in profile photo render");
		return this.compile(template, this.props);
	}
}
