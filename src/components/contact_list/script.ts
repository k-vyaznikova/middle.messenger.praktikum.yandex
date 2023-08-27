import {Block} from "/utils/block.ts";
import template from "/components/contact_list/template.hbs";


interface ContactListProps{
	contacts: Array<Object>
}
export class ContactList extends Block {
	constructor(props: ContactListProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}


