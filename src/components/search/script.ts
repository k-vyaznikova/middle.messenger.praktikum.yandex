import {Block} from "/utils/block.ts";
import template from "/components/search/template.hbs";

interface SearchProps{
	value: string,
	left_align: string,
	placeholder: string,
	not_focused?: string,
	onKeyup?: () => void,
	events?: {
		click?: ()=>void,
		keyup?: ()=>void
	}

}

export class Search extends Block {
	constructor(props: SearchProps) {
		let timerId: any;
		super({
			...props,
			events: {
				click: () => {
					this.setProps({
						"not_focused": ""
					});
					(this.getContent()?.querySelector("input[name=search]") as HTMLInputElement).focus();
				},
				keyup: () => {
					clearTimeout(timerId);
					timerId = setTimeout((props.onKeyup as ()=>void), 500);
				}
			}
		});
	}

	protected componentDidMount(): boolean {
		const inputSearch: HTMLInputElement = this.element?.querySelector("input[name='search']") as HTMLInputElement;
		if (inputSearch) {
			inputSearch.focus();
			inputSearch.selectionStart = inputSearch.selectionEnd = inputSearch.value.length;
		}
		return true;
	}

	render() {
		return this.compile(template, this.props);
	}
}

