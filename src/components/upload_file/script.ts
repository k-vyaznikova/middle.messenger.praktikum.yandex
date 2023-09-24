import {Block} from "/utils/block.ts";
import template from "/components/upload_file/template.hbs";

interface UploadFileProps{
	file: string,
	events?:{
		change: (event: Event) => void
	}
}

export class UploadFile extends Block {
	constructor(props: UploadFileProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}
