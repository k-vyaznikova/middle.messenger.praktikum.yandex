import {Block} from "/utils/block.ts";
import template from "/components/search/template.hbs";

interface SearchProps{
	submit_url: string,
	left_align: string,
	placeholder: string

}

export class Search extends Block {
	constructor(props: SearchProps) {
		super(props);
	}
	render() {
		return this.compile(template, this.props);
	}
}

