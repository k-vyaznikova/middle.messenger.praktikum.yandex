import {Block} from "/utils/block.ts";
import template from "/components/contact_item/template.hbs";


interface ContactItemProps{
	contactSelected?: string,
	contactLinkDialog: string,
	contactImg: string,
	contactName: string,
	yourMsg?: string,
	contactMsg: string,
	contactTimeMsg: string,
	contactQMsg?: string
}

export class ContactItem extends Block {
	constructor(props: ContactItemProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}


