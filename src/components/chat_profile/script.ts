import {Block} from "/utils/block.ts";
import template from "/components/chat_profile/template.hbs";
import {checkError} from "/utils/form_utils.ts";
import {getFormData} from "/utils/get_form_data";
import {checkAndSendForm} from "/utils/form_utils.ts";
import {ProfileItem} from "/components/profile_item/script.ts";
import ChatsController from "/controllers/chats-controller.ts";
import UserController from "/controllers/user-controller";
import {User} from "/types/common_types.ts";

interface ChatProfileProps{
	id: number,
	title: string,
	submit_url: string,
	profile_photo: {
		profileImg: string,
		profileName: string,
	},
	error?:string,
	profile_items: Array<Object>,
	submit_btn?: object,
	edit_mode?: string,
	search_member_list: Array<User>,
	member_list: Array<User>,
	addUsersFunc: () => {}
}
export class ChatProfile extends Block {
	constructor(props: ChatProfileProps) {
		super({
			...props,
			submit_btn: {
				...props.submit_btn,
				onClick: (event: Event) => {
					event.preventDefault();
					const chatName: string = (this.refs["input_name"] as ProfileItem).element?.querySelector("input")?.value;
					const userIDs: Array<number> = this.checkUsers();
					if (checkError(chatName, "not-empty", this.refs["input_name"]) && userIDs.length > 0) {
						ChatsController.createChatWithUsers(chatName, userIDs);
					}
				}
			}
		});
	}

	private checkUsers(): Array<number> {
		const arrId: Array<number> = [];

		this.element?.querySelectorAll("input[name = 'chat_members']").forEach(function(item) {
			arrId.push((item as HTMLInputElement).value as number);
		});
		if (arrId.length <= 0) {
			this.setProps({
				error: "Добавьте хотя бы одного участника в чат"
			});
		}
		return arrId;
	}

	async init() {
		let users: Array<User> = [];
		users = await ChatsController.getUsers(this.props.id);
		this.setProps({
			member_list: users,
			addUser: this.addUsers.bind(this)
		});
	}

	private addChat() {
		const title: string = this.chat_name;
		ChatsController.create(title);
	}

	public get name() {
		return (this.element as HTMLElement).getElementsByTagName("input")[0].name;
	}

	public get chat_name() {
		const chatName: string = ((this.element as HTMLElement).querySelector("input[name='name']") as HTMLInputElement).value;
		return chatName? chatName : "";
	}

	async addUsers(event: Event) {
		const element: HTMLElement = event.target as HTMLElement;
		const memberList: Array<User> = this.props.member_list as Array<User>;
		if (element.classList.contains("member-add")) {
			const id: string = element.getAttribute("data-id") as number;
			if (id > 0) {
				const user: User = await UserController.getUser(id);
				memberList.push(user);
				this.setProps({
					member_list: memberList
				});
			}
		}
	}

	render() {
		return this.compile(template, this.props);
	}
}
