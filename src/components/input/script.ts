import {Block} from "/utils/block.ts";
import template from "/components/input/template.hbs";

export class Input extends Block {
	constructor(props: Object) {
		super({
				...props,
				events: {
					focusout: () => {props.onFocusout()}
				}
			});
	}
	render() {
		return this.compile(template, this.props);
	}
}


