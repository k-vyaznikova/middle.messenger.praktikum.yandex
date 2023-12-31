import {Block} from "/utils/block.ts";
import template from "/components/contact_item/template.hbs";
import {BASE_FILE_URL} from "/utils/constants";
import img from "/img/noimgprofile.svg";


export interface ContactItemProps{
	id: string,
	contactSelected?: string,
	contactLinkDialog: string,
	contactImg: string,
	contactName: string,
	yourMsg?: string,
	contactMsg: string,
	contactTimeMsg: string,
	contactQMsg?: string,
	// ref?: string,
	onClick: (item: ContactItem) => void,
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
					props.onClick(this);
				}
			}
		});
	}


	init() {
		this.props.contactImg = this.props.contactImg? BASE_FILE_URL + this.props.contactImg : img;
	}

	render() {
		return this.compile(template, this.props);
	}
}


