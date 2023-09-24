import {Block} from "/utils/block.ts";
import template from "/components/delete_file/template.hbs";

interface DeleteFileProps{
	events?:{
		click: () => void
	}
}

export class DeleteFile extends Block {
	constructor(props: DeleteFileProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}
