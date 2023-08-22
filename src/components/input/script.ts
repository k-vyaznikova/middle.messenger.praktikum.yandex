import {Block} from "/utils/block.ts";
import template from "/components/input/template.hbs";

interface InputProps {
    name: String,
    label: String,
    id: String,
    type: String,
    error: String
}

export class Input extends Block {
	constructor(props: InputProps) {
		super(props);
	}
	render() {
		return this.compile(template, {name: this.props.name, label: this.props.class, id: this.props.id, type: this.props.type, error: this.props.error});
	}
}


