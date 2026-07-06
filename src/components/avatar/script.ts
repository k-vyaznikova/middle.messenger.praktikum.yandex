import Block from "../../utils/block";
import template from "./template.hbs";
import styles from "./style.module.scss";
import defaultAvatar from "./img/no-avatar.svg";

export interface AvatarProps{
	title?: string,
	src?: string,
	editable?: boolean,
	onClick?: (event: Event) => void,
	onFileChange?: (file: File) => void,
	uploadText?: string,
	size?: "small" | "medium" | "large"
}

const sizeClasses: Record<NonNullable<AvatarProps["size"]>, string> = {
	small: styles["avatar--small"],
	medium: styles["avatar--medium"],
	large: styles["avatar--large"],
};

export default class Avatar extends Block {
	constructor(props: AvatarProps) {
		super({
			...props,
			src: props.src || defaultAvatar,
			styles,
			sizeClass: props.size ? sizeClasses[props.size] : "",
			events: {
				change: (event: Event) => {
					const target = event.target as HTMLInputElement;
					if (target.type !== "file") return;
					const file = target.files?.[0];
					if (file && this.props.onFileChange) {
						this.props.onFileChange(file);
					}
				}
			}
		});
	}

	render() {
		return this.compile(template, this.props);
	}
}
