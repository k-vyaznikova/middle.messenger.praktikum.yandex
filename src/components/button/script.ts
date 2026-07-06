import Block from "../../utils/block";
import template from "./template.hbs";
import styles from "./style.module.scss";

export interface ButtonProps{
	text?: string,
	secondary?: boolean,
	attention?: boolean,
	onClick?: (event: Event) => void,
	disabled?: boolean,
}

export default class Button extends Block {
	constructor(props: ButtonProps) {
		super({
			...props,
			styles,
			events: {
				click: (event: Event) => {
					event.preventDefault();
					if (this.props.onClick && !this.props.disabled) {
						this.props.onClick(event);
					}
				}
			}
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}
