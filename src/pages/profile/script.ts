import Block from "../../utils/block";
import template from "./template.hbs";
import Button from "../../components/button";
import EditForm from "../../components/edit-form";
import AuthController from "/controllers/auth-controller.ts";
import styles from "./style.module.scss";
import fields from "./fields";
import Input from "../../components/input";
import { SignupData } from "../../api/auth-api";
import router from "/utils/routing/router";
import { Result } from "../../types";
import  Form  from "../../components/edit-form/script";
import { User } from "../../types";
import {BASE_FILE_URL} from "/utils/constants";
import Avatar from "../../components/avatar";
import UserController from "/controllers/user-controller.ts";
import store from "/utils/store/store";

interface ProfilePageProps{
	button?: Button,
	error?: string,
	user?: User,
}


export class ProfilePageInit extends Block {
	constructor(props: ProfilePageProps) {
		super({...props, styles});
	}


	init() {
		if(this.props.user){
			for(let key in this.props.user){
				let index = fields.findIndex((field: Record<string, any>) => {
					if(field.name === key){
						return true;
					}
					return false;
				});
				if(index !== -1){
					fields[index].value = this.props.user[key];
				}
			}
		}
		
		this.children.form = new EditForm({
			fields: fields,
			title: "Мой профиль",
			avatar: BASE_FILE_URL + this.props.user?.avatar,
			button_add: this.props.button_add ?? new Button({
				text: "Изменить пароль",
				secondary: true,
				attention: true,
				onClick: () => {
					router.go("/change-password/");
				}
			})
		});

	}


	protected componentDidMount(): boolean {
		const form = this.children.form as EditForm;
		const inputs = form.children.fields as Input[];

		(form.children.button as Button)?.setProps({
			onClick: async () => {
				if (inputs.some((input) => {
					if(input.props.error){
						return true;
					}
					return false;
				})) {
					return false;
				}
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
				
			},
			
		});
		form.setProps({
			onAvatarChange: async (file: File) => {
				const formData = new FormData();
				formData.append("avatar", file);
				await UserController.uploadAvatar(formData);
				(form.children.avatar as Avatar).setProps({src: BASE_FILE_URL + store.getState().user.avatar});
			},
		});
		return true;
	}
	render() {
		return this.compile(template, this.props);
	}
}
