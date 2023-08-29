import {Block} from "/utils/block.ts";
import template from "/components/contact_list/template.hbs";


interface ContactListProps{
	contacts: Array<Object>,
	ref: string,
	onClick: (event: Event) => void
}
export class ContactList extends Block {
	constructor(props: ContactListProps) {
		super({
			...props,
			contacts: props.contacts.map(function(item) {
				return {
					...item,
					onClick: function() {
						// console.log(self_);
					}
				};
			})
		});
		// console.log(this);
	}
	componentDidUpdate(): boolean {
		console.log("componentDidMount");
		return true;
	}

	render() {
		return this.compile(template, this.props);
	}
}


