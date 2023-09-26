import {Block} from "/utils/block.ts";
import template from "/components/chat_profile_edit/template.hbs";
import {checkError} from "/utils/form_utils.ts";
import {getFormData} from "/utils/get_form_data";
import {checkAndSendForm} from "/utils/form_utils.ts";
import {ProfileItem} from "/components/profile_item/script.ts";
import ChatsController from "/controllers/chats-controller.ts";
import UserController from "/controllers/user-controller";
import {User} from "/types/common_types.ts";
import {ErrorMsg} from "/components/error_msg/script";
import {ProfilePhoto} from "/components/profile_photo/script";
import {BASE_FILE_URL} from "/utils/constants";
// import {Chat} from "/types/common_types.ts";
import {withStore} from "/utils/store";
import {getUrlParams} from "/utils/url_utils.ts";
import {MemberList} from "/components/member_list/script";
import {UserSearch} from "../user_search/script";


interface chatProfileEditProps{
	id: number,
	title: string,
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


export class chatProfileEditInitial extends Block {
	constructor(props: chatProfileEditProps) {
		super({...props}/* {
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
		}*/);
	}

	async init() {
		/* this.setProps({
			addUser: this.addUsers.bind(this)
		});*/

		this.children.errorMsg = new ErrorMsg({text: ""});
		this.children.profilePhoto = new ProfilePhoto({
			profilePhoto: "/img/noimgprofile.svg",
			profileAlt: ""
		});
		/*
		let users: Array<User> = [];
		users = await ChatsController.getUsers(this.props.id);
		this.setProps({
			member_list: users,
			addUser: this.addUsers.bind(this)
		});*/
	}


	async componentDidUpdate(oldProps: any, newProps: any): boolean {
		this.children.profilePhoto = new ProfilePhoto({
			profilePhoto: newProps["chat"]["avatar"] ? BASE_FILE_URL + newProps["chat"]["avatar"] : "/img/noimgprofile.svg",
			profileAlt: newProps["chat"]["title"]
		});

		this.children.profileItem = new ProfileItem({
			infoLabel: "Название чата",
			value: newProps["chat"]["title"],
			infoName: "title",
			infoType: "text",
			ref: "title_chat",
			validate_type: "not-empty",
			editMode: "yes"
		});

		let users: Array<any> = [];
		users = await ChatsController.getUsers(newProps["chat"]["id"]);
		this.children.memberList = new MemberList({
			member_list: users,
			alt_message: "Нет ни одного участника",
			hideInput: "yes"
		});
		/** addUser = addUser */
		this.children.userSearch = new UserSearch({});

		return true;
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


const withChat = withStore((state) => {
	const params: Record<string, string> = getUrlParams();
	const id: number = params["id"] as number;
	if (id > 0 ) {
		if (state.chats && (state.chats instanceof Array)) {
			const chat: Record<string, string> = state.chats.find((chat) => {
				return (chat["id"] == id && state.user.id === chat["created_by"]);
			});
			if (chat) {
				return {chat: chat};
			}
		}
	}
	return {chat: undefined};
});

export const ChatProfileEdit = withChat(chatProfileEditInitial);
