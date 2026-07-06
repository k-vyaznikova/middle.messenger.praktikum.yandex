import {Block} from "../../utils/block/block.js";
import template from "./template.hbs";
import Form from "/components/form";
import fields from "./fields";
import Button from "../../components/button";
import router from "../../utils/routing/router";
import Input from "../../components/input";
import styles from "./style.module.scss";
import { ChangePassData } from "/api/user-api.js";
import { Result } from "../../types";
import UserController from "/controllers/user-controller.js";

interface ChangePasswordPageProps{
	error?: string,

}

export class ChangePasswordPage extends Block {
	constructor(props: ChangePasswordPageProps) {
		super({...props, styles});
	}


	init() {
		this.children.form = new Form({
			fields: fields,
			title: "Смена пароля",
			error: this.props.error ?? "",
			good_message: "",
			button: new Button({
				text: "Изменить пароль",
				
			}),
			button_add: this.props.button_add ?? new Button({
				text: "В профиль",
				secondary: true,
				onClick: () => {
					router.go("/profile/");
				}
			})
		});


	}


	protected componentDidMount(): boolean {
		const form = this.children.form as Form;
		const inputs = form.children.fields as Input[];

		(form.children.button as Button).setProps({
			onClick: async () => {
				
				if (inputs.some((input) => {
					if(input.props.error){
						return true;
					}
					return false;
				})) {
					return false;
				}
				const data = {} as ChangePassData;
				inputs.forEach((input) => {
					data[input.props.name as keyof ChangePassData] = input.getValue() ?? "";
				});
				let res: Result = true;
				(form.children.button as Button).setProps({ disabled: true });
				try{
					res = await UserController.changePass(data);
					if (res === true) {
						form.setProps({good_message: "Пароль успешно изменен."});
						setTimeout(() => {
							router.go("/profile/");
							(form.children.button as Button).setProps({ disabled: false });
						}, 2000);
						return true;
					}
				}
				catch(error: unknown) {
					let message = "Ошибка авторизации";
					if (error instanceof Error) {
						message = error.message;
					} else if (error && typeof error === "object" && "reason" in error) {
						message = String((error as { reason: string }).reason);
					}
					form.setProps({ error: message});
					setTimeout(() => {
						(form.children.button as Button).setProps({ disabled: false });
					}, 1000);
					return false;
				}
			}
		});
		return true;
	}

	render() {
		return this.compile(template, this.props);
	}
}
