import Block from "../../utils/block";
import template from "./template.hbs";
import Button from "../../components/button";
import styles from "./style.module.scss";
import fields from "./fields";
import ChatsController from "/controllers/chats-controller.ts";
import  Form  from "../../components/form";
import Input from "../../components/input";
import { User } from "../../types";
import router from "/utils/routing/router";
import { Chat } from "../../types";
import store from "/utils/store/store";
import Avatar from "../../components/avatar";
import { BASE_FILE_URL } from "/utils/constants";
import EditForm from "../../components/edit-form";
import Search from "../../components/search";
import UserItem from "../../components/user-item";

interface CreateChatInitPageProps{
	button?: Button,
	error?: string,
	user?: User,
	page?: string,
	id?: number,
	chats?: Chat[] | undefined,
	
}


export class CreateChatInitPage extends Block {
	constructor(props: CreateChatInitPageProps) {
		super({...props, 
			page: props.page ?? '1',
			styles});
	}


	init() {
		const chat = this.props.id ? store.getState().chats.find((c: Chat) => c.id === Number(this.props.id)) : undefined;
		

		if(this.props.page === '1'){
			this.children.form = new Form({
				fields: (fields && fields.length > 0) ? fields.map((field) => ({
					...field,
					value: this.props.id ? String(chat?.title) : "",
				  })) : [],
				title: this.props.id ? "Редактирование чата" : "Создание чата",
				error: this.props.error ?? "",
				button: this.props.button ?? new Button({
					text: this.props.id ? "Изменить название" : "Создать чат"
				}),
				button_add: new Button({
					text: "Назад",
					secondary: true,
					onClick: async () => {
						router.go("/messenger/");
					}
				})
			});
		}
		else if(this.props.page === '2'){
			this.children.form = new EditForm({
				title:  "Фото чата " + (this.props.id ? chat?.title : ""),
				avatar: (this.props.id && chat?.avatar) ? BASE_FILE_URL + chat?.avatar : "",
				button: new Button({
					text: "Далее...",
					onClick: () => {
						router.go("/create-chat/?id="+this.props.id+"&page=3");
					}
				}),
				button_add: new Button({
					text: "Назад",
					secondary: true,
					onClick: async () => {
						router.go("/messenger/");
					}
				})
				
			});
		}
		else if(this.props.page === '3'){
			console.log(this.props.user_list);
			this.children.form = new Search({
				placeholder: "Введите логин пользователя...",
				results: (this.props.user_list ?? []).map((item: User) => {
					return new UserItem({
						user: item,
						onClick: (event: Event) => {
							event.preventDefault();
							console.log((event.target as HTMLElement));
							if((event.target as HTMLElement).dataset.action === "add"){
								alert("click plus button");
							}
							else{
								router.go("/user/?id="+item.id);
							}
						}
					});
				}),
			});
		}

	}


	protected componentDidMount(): boolean {

		
		const form = this.children.form as EditForm;
		if(this.props.page === '1'){
			(form.children.button as Button)?.setProps({
				onClick: async () => {
					try{	
						const inputs = form.children.fields as Input[];
						let titleInput = inputs.find((input) => (input.props.name === "title"));
						let title = titleInput?.getValue() ?? "";
						if(!this.props.id){

						}
						let id = await ChatsController.createChat(title);
						if (id) {
							form.setProps({ error: ""});
							form.setProps({ good_message: "Чат успешно создан"});
							setTimeout(() => {
								router.go("/create-chat/?id="+id+"&page=2");
							}, 1000);
						} else {
							form.setProps({ error: "Ошибка при создании чата"});
							return false;
						}

					} catch (error: any) {
						let message = "Ошибка при создании чата";
						if (error instanceof Error) {
							message = error.message;
						} else if (error && typeof error === "object" && "reason" in error) {
							message = String((error as { reason: string }).reason);
						}
						form.setProps({ error: message});
						return false;
					}
					
				}
				
			});
		}
		else if(this.props.page === '2'){
			form.setProps({
				onAvatarChange: async (file: File) => {
					const formData = new FormData();
					formData.append("avatar", file);
					formData.append("chatId", this.props.id);
					await ChatsController.uploadChatAvatar(formData);
					(form.children.avatar as Avatar).setProps({src: BASE_FILE_URL + store.getState().chats.find((c: Chat) => c.id === Number(this.props.id))?.avatar});
				}
			});
		}
		return true;
	}


		render() {
		return this.compile(template, this.props);
	}
}
