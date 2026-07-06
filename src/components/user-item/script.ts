import Block from "../../utils/block";
import template from "./template.hbs";
import styles from "./style.module.scss";
import { User } from "../../types";
import { BASE_FILE_URL } from "/utils/constants";
import defaultAvatar from "./img/no-avatar.svg";

export interface UserItemProps{
	user: User,
	onClick?: (event: Event) => void
}


export default class UserItem extends Block {
	constructor(props: UserItemProps) {
		super({
			...props,
			avatar_src: props.user.avatar? BASE_FILE_URL + props.user.avatar : defaultAvatar,
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

	init(){
	}

	render() {
		return this.compile(template, this.props);
		
	}
}
