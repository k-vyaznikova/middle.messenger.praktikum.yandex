import Block from "../../utils/block";
import template from "./template.hbs";
import Button from "../../components/button";
import Form from "../../components/form";
import AuthController from "/controllers/auth-controller.ts";
import styles from "./style.module.scss";
import fields from "./fields";
import Input from "../../components/input";
import { SignupData } from "../../api/auth-api";
import router from "/utils/routing/router";
import { Result } from "../../types";

interface RegisterPageProps{
	button?: Button,
	error?: string,
}


export class RegisterPage extends Block {
	constructor(props: RegisterPageProps) {
		super({...props, styles});
	}


	init() {
		//await AuthController.signup(data);
		this.children.form = new Form({
			fields: fields,
			title: "Регистрация",
			error: this.props.error ?? "",
			button: this.props.button ?? new Button({
				text: "Зарегистрироваться",
				
			}),
			button_add: this.props.button_add ?? new Button({
				text: "Авторизоваться",
				secondary: true,
				onClick: () => {
					router.go("/");
				}
			})
		});

	}


	protected componentDidMount(): boolean {
		const form = this.children.form as Form;
		const inputs = form.children.fields as Input[];

		(form.children.button as Button).setProps({
			onClick: async () => {
				console.log("onClick - 0");
				if (inputs.some((input) => {
					if(input.props.error){
						//console.log(input.props.name + " " + input.props.error);
						return true;
					}
					return false;
				})) {
					//console.log("error");
					return false;
				}
				console.log("onClick - 1");
				const data = {} as SignupData;
				inputs.forEach((input) => {
					if (input.props.name === "password_confirm") {
						return;
					}
					data[input.props.name as keyof SignupData] = input.getValue() ?? "";
				});
				let res: Result = true;
				(form.children.button as Button).setProps({ disabled: true });
				try{
					res = await AuthController.signupAndSignin(data);
					
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
