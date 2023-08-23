import {Block} from "/utils/block.ts";
import template from "/components/secondary_btn/template.hbs";

interface SubmitBtnProps {
    text: String
}

export class SubmitBtn extends Block {
	constructor(props: SubmitBtnProps) {
		super(props);
	}
}


