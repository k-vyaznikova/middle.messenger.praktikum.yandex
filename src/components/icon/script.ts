import Block from "../../utils/block";
import template from "./template.hbs";
import styles from "./style.module.scss";
import router, {Router} from "/utils/routing/router.ts";

export interface IconProps{
	type: "edit" | "custom",
	_type?: Record<string, boolean>,
	src?: string,
	href?: string,
	onClick?: (event: Event) => void,
	disabled?: boolean,
}

export default class Button extends Block {
	constructor(props: IconProps) {
		super({
			...props,
			styles,
			events: {
				mousedown: (event: Event) => {
					event.preventDefault();
				},
				click: (event: Event) => {
					event.preventDefault();
					if (this.props.onClick && !this.props.disabled) {
						this.props.onClick(event);
					}
					if (this.props.href) {
						router.go(this.props.href);
					}
				}
			}
		});
	}


	init(){
		if(!this.props.type || (this.props.type === "custom" && !this.props.src)) {
			this.props.type = "edit";
		}
		this.props._type = {};
		switch(this.props.type){
			case "edit":
				this.props._type.edit = true;
				break;
			case "custom":
				this.props._type.custom = true;
				this.props.typeClass = "custom";
				this.props.src = this.props.src;
				break;
		}
	}	
	
	render() {
		return this.compile(template, this.props);
	}
}
