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
	onClick: (event: Event) => void,
	events: {
		click: (event: Event) => void
	}
}

export class ContactItem extends Block {
	constructor(props: ContactItemProps) {
		//console.log(props);
		super({
			...props,
			events: {
				click: (event: Event) =>{
					props.onClick(event);
				}
			}
		});
		
	}
	render() {
		return this.compile(template, this.props);
	}
}


