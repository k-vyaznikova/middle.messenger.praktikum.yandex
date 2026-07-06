import {Block} from "../../utils/block/block";
import template from "./template.hbs";
import styles from "./style.module.scss";
import EditInput from "/components/edit-input";
import type {InputProps} from "/types";
import Button from "../button";
import Avatar from "../avatar";
import Link from "./../link";
import UserController from "/controllers/user-controller";
import {BASE_FILE_URL} from "/utils/constants";
import store from "/utils/store";

interface EditFormProps{
	title: string,
	fields?: unknown[],
	button?: Button,
	button_add?: Button,
	links?: Array<Link>,
	avatar?: string,
	onAvatarChange?: (file: File) => void
}
export default class EditForm extends Block {
	constructor(props: EditFormProps) {
		super({...props, styles});
	}

	init() {
		this.children.avatar = new Avatar({
			src: this.props.avatar,
			size: "large",
			editable: true,
			uploadText: "Загрузить аватар",
			onFileChange: async (file: File) => {this.props.onAvatarChange?.(file);
			}
		});
		this.children.fields = (this.props.fields && this.props.fields.length > 0) ? ((this.props.fields as Array<any>).map((fieldProps: InputProps) => {
			return new EditInput(fieldProps);
		})) : [];
	}

	render() {
		return this.compile(template, this.props);
	}
}


