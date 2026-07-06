import Block from "../../utils/block";
import template from "./template.hbs";
import styles from "./style.module.scss";
import { User } from "../../types";

export interface SearchProps{
	placeholder: string,
	results: Block[],
}


export default class Avatar extends Block {
	constructor(props: SearchProps) {
		super({
			...props,
			styles
		});
	}
	init() {
		this.children.results = this.props.results;
	}

	render() {
		return this.compile(template, this.props);
	}
}
