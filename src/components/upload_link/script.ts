import {Block} from "/utils/block.ts";
import template from "/components/upload_link/template.hbs";

interface UploadLinkProps{
	text: string,
	events?:{
		click: (event: Event) => void
	}
}

export class UploadLink extends Block {
	constructor(props: UploadLinkProps) {
		super({...props

		});
	}
	render() {
		return this.compile(template, this.props);
	}
}
