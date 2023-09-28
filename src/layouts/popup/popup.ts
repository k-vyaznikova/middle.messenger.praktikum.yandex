
import {Block} from "/utils/block.ts";
import template from "/layouts/popup/popup.hbs";
import {ClosePopup} from "/components/close_popup/script";

interface PopupProps {
    classVisibility: string,
    content: Block,
	events: {
		close: () => void
	}
}

export default class Popup extends Block {
	constructor(props: PopupProps) {
		super(props);
	}
	init() {
		this.children.closePopup = new ClosePopup({
			events: {
				click: () => {
					const closeEvent = new Event("close");
					this.element?.dispatchEvent(closeEvent);
				}
			}

		});
	}
	render() {
		return this.compile(template, this.props);
	}
}
