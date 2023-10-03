import {Block} from "/utils/block.ts";
import template from "/components/contact_item/template.hbs";
import {BASE_FILE_URL} from "/utils/constants";


interface ContactItemProps{
	id: string,
	contactSelected?: string,
	contactLinkDialog: string,
	contactImg: string,
	contactName: string,
	yourMsg?: string,
	contactMsg: string,
	contactTimeMsg: string,
	contactQMsg?: string,
	ref: string,
	onClick: (event: Event) => void,
	events: {
		click: (event: Event) => void
	}
}

export class ContactItem extends Block {
	constructor(props: ContactItemProps) {
		super({
			...props,
			events: {
				click: (event: Event) =>{
					event.preventDefault();
					props.onClick(event);
				}
			}
		});
	}

	init() {
		this.props.contactImg = this.props.contactImg? BASE_FILE_URL + this.props.contactImg : "/img/noimgprofile.svg";
	}
	render() {
		return this.compile(template, this.props);
	}
}


