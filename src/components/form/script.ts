import {Block} from "/utils/block.ts";
import template from "../form/template.hbs";
import {SecondaryBtn} from "../secondary_btn/script";

interface FormProps {
    title: String,
    secondary_btn?: SecondaryBtn,
    type?: String
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


