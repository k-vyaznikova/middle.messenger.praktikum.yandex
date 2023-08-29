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
					// console.log(this.refs);
				}
			}
		});
		// console.log(this);
	}
	render() {
		return this.compile(template, this.props);
	}
}


