import {Block} from "/utils/block.ts";
import template from "/components/chat_profile_edit/template.hbs";
import ChatsController from "/controllers/chats-controller.ts";
import {User} from "/types/common_types.ts";
import {ProfilePhoto} from "/components/profile_photo/script";
import {BASE_FILE_URL} from "/utils/constants";
import {withStore} from "/utils/store";
import {MemberList} from "/components/member_list/script";
import {ResultValidate} from "/types/common_types.ts";

interface chatProfileProps{
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


export class chatProfileInitial extends Block {
	constructor(props: chatProfileProps) {
		super(props);
	}


	componentDidUpdate(newProps: any): boolean {
		this.children.profilePhoto = new ProfilePhoto({
			profilePhoto: newProps?.chat?.avatar ? (BASE_FILE_URL + newProps?.chat?.avatar) : "/img/noimgprofile.svg",
			profileAlt: newProps?.chat?.title,
			chatId: newProps?.id,
			uploadFunc: this.uploadChatAvatar
		});


		if (newProps.chat?.users) {
			this.children.memberList = this._formMemberList(newProps.chat?.users);
		}

		return true;
	}


	_formMemberList(users: User[]) {
		return new MemberList({
			member_list: users,
			hideInput: "yes",
			editMode: false
			// template: templateForMemberList
		});
	}

	public get name() {
		return (this.element as HTMLElement).getElementsByTagName("input")[0].name;
	}

	public get chat_name() {
		const chatName: string = ((this.element as HTMLElement).querySelector("input[name='name']") as HTMLInputElement).value;
		return chatName? chatName : "";
	}

	async uploadChatAvatar(form: HTMLFormElement) {
		const result: ResultValidate = await ChatsController.uploadChatAvatar(new FormData(form as HTMLFormElement));
		return result;
	}

	render() {
		return this.compile(template, this.props);
	}
}

const withChat = withStore((state: Record<string, any>) => {
	return {
		chat: state?.current_chat,
		id: state?.current_chat?.id,
		title: state?.current_chat?.title
	};
});

export const ChatProfile = withChat(chatProfileInitial);
