import {Block} from "/utils/block.ts";
import template from "/components/search/template.hbs";

interface SearchProps{
	submit_url: string,
	left_align: string,
	placeholder: string,
	not_focused?: string,
	events: {
		click: ()=>void
	}

}

export class Search extends Block {
	constructor(props: SearchProps) {
		super({
			...props,
			events: {
				click: () => {
					this.setProps({
						"not_focused": ""
					});
					(this.getContent()?.querySelector("input[name=search]") as HTMLInputElement).focus();
				}
			}
		});
	}

	render() {
		return this.compile(template, this.props);
	}
}

