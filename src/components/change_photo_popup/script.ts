import {Block} from "/utils/block.ts";
import template from "/components/change_photo_popup/template.hbs";
import Popup from "/layouts/popup/popup.ts";

interface ChangePhotoPopupProps{
	classVisibility: string
}

export class ChangePhotoPopup extends Block {
	constructor(props: ChangePhotoPopupProps) {
		super(props);
	}

	init(){
		this.children.popup = new Popup({});
	}
	render() {
		return this.compile(template, this.props);
	}
}
