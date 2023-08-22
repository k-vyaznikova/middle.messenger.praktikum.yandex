import {Block} from "/utils/block.ts";
import template from "/components/form/template.hbs";

interface FormProps {
    title: String,
    // прописать свойства здесь!!!!
}

export class Form extends Block {
	constructor(props: FormProps) {
		super(props);
	}
	render() {
		return this.compile(template, {title: this.props.title});
	}
}


