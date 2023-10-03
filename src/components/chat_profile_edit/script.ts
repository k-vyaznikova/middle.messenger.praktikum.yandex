import {Block} from "/utils/block.ts";
import template from "/components/chat_profile_edit/template.hbs";
import ChatsController from "/controllers/chats-controller.ts";
import UserController from "/controllers/user-controller";
import {User} from "/types/common_types.ts";
import {ErrorMsg} from "/components/error_msg/script";
import {ProfilePhoto} from "/components/profile_photo/script";
import {BASE_FILE_URL} from "/utils/constants";
import {withStore} from "/utils/store";
import {MemberList} from "/components/member_list/script";
import {UserSearch} from "../user_search/script";
import {ResultValidate} from "/types/common_types.ts";


interface chatProfileEditProps{
	id: number,
	title: string,
	addUsersFunc: () => {}
}


export class chatProfileEditInitial extends Block {
	private usersIdArr: number[] = [];
	constructor(props: chatProfileEditProps) {
		super(props);
	}


	componentDidUpdate(oldProps: any, newProps: any): boolean {
		this.children.profilePhoto = new ProfilePhoto({
			profilePhoto: newProps?.chat?.avatar ? (BASE_FILE_URL + newProps?.chat?.avatar) : "/img/noimgprofile.svg",
			profileAlt: newProps?.chat?.title,
			chatId: newProps?.id,
			allowEdit: "yes",
			uploadFunc: this.uploadChatAvatar
		});


		if (newProps.chat?.users) {
			this.children.memberList = this._formMemberList(newProps.chat?.users);
		}


		this.children.userSearch = new UserSearch({
			addUser: this.addUsers.bind(this)
		});

		return true;
	}


	_formMemberList(users: User[]) {
		this.usersIdArr = users.map((item) => {
			return item.id;
		});
		return new MemberList({
			member_list: users,
			hideInput: "yes",
			editMode: true,
			deleteUser: this.deleteUser.bind(this)
		});
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
		// const memberList: Array<User> = this.children.memberList as Array<User>;

		if (element.classList.contains("member-add")) {
			const id: string = element.getAttribute("data-id") as number;
			if (id > 0) {
				const user: User = await UserController.getUser(id);
				if ((user.id as number) > 0) {
					this.usersIdArr.push(user.id);
					ChatsController.addUsersToChat(this.props.id, this.usersIdArr);
				}
			}
		}
	}

	deleteUser(event: Event) {
		const element: HTMLElement = event.target as HTMLElement;
		if (element.classList.contains("member-delete")) {
			const id: number = element.getAttribute("data-id") as number;
			if (id > 0) {
				ChatsController.deleteUsersFromChat(this.props.id, [id]);
			}
		}
	}

	async uploadChatAvatar(form: HTMLFormElement) {
		const result: ResultValidate = await ChatsController.uploadChatAvatar(new FormData(form as HTMLFormElement));
		return result;
	}

	render() {
		return this.compile(template, this.props);
	}
}


const withChat = withStore((state) => {
	return {
		chat: state?.current_chat,
		id: state?.current_chat?.id,
		title: state?.current_chat?.title
	};
});

export const ChatProfileEdit = withChat(chatProfileEditInitial);
