import {Block} from "../../utils/block/block";
import template from "/components/form/template.hbs";
import styles from "./style.module.scss";
import Input from "/components/input";
import type {InputProps} from "/types";
import Button from "../button";
import Link from "./../link";
import Avatar from "../avatar/script";
import { BASE_FILE_URL } from "/utils/constants";

interface FormProps{
	title: string,
	fields: unknown[],
	error?: string,
	good_message?: string,
	button: Button,
	button_add?: Button,
	links?: Array<Link>,
	
}
export default class Form extends Block {
	constructor(props: FormProps) {
		super({...props, styles});
	}

	init() {
		this.children.avatar = new Avatar({
			src: this.props.user?.avatar ? BASE_FILE_URL + this.props.user.avatar : "",
			size: "large"
		});
		this.children.fields = ((this.props.fields as Array<any>).map((fieldProps: InputProps) => {
			return new Input(fieldProps);
		})) as any;
	}

	render() {
		return this.compile(template, this.props);
	}
}


