import {Block} from "/utils/block.ts";
import template from "/components/add_chat/template.hbs";
import {Input} from "/components/input/script";
import { SubmitBtn } from "../submit_btn/script";


interface AddChatProps{
	funcClosePopup: () => void,
	error: string
}

export class AddChat extends Block {
	constructor(props: ChangePhotoPopupProps) {
		super(props);
	}

	init() {
		this.children.input = new Input({});
		this.children.submitBtn = new SubmitBtn({});
	}


	render() {
		return this.compile(template, this.props);
	}
}
