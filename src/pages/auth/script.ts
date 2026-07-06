import Block from "../../utils/block";
import template from "./template.hbs";
import Button from "../../components/button";
import Form from "../../components/form";
import AuthController from "/controllers/auth-controller.ts";
import styles from "./style.module.scss";
import fields from "./fields";
import Input from "../../components/input";
import { SigninData } from "./../../api/auth-api.ts";
import router from "/utils/routing/router";
import { Result } from "../../types";

interface AuthPageProps{
	error?: string,

}


export class AuthPage extends Block {
	constructor(props: AuthPageProps) {
		super({...props, styles});
	}


	init() {
		//await AuthController.signup(data);
		this.children.form = new Form({
			fields: fields,
			title: "Авторизация",
			error: this.props.error ?? "",
			button: new Button({
				text: "Авторизоваться",
				
			}),
			button_add: this.props.button_add ?? new Button({
				text: "Зарегистрироваться",
				secondary: true,
				onClick: () => {
					router.go("/register/");
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
				const data = {} as SigninData;
				inputs.forEach((input) => {
					data[input.props.name as keyof SigninData] = input.getValue() ?? "";
				});
				let res: Result = true;
				(form.children.button as Button).setProps({ disabled: true });
				try{
					res = await AuthController.signin(data);
					if (res === true) {
						setTimeout(() => {
							router.go("/messenger/");
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
