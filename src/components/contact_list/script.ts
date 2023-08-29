import {Block} from "/utils/block.ts";
import template from "/components/contact_list/template.hbs";


interface ContactListProps{
	contacts: Array<Object>,
	onClick: (event: Event) => void
}
export class ContactList extends Block {
	constructor(props: ContactListProps) {
		super({
			...props,
			contacts: props.contacts.map(function(item) {
				return {
					...item,
					onClick: function(event: Event){
						event.preventDefault();
						console.log(self);
					}
				}
			})
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}


