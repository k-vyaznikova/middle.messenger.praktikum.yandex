import {Block} from "/utils/block.ts";
import template from "/pages/chat-edit/chat-edit.hbs";
import { ChatProfile } from "/components/chat_profile/script";
import { getUrlParams } from "/utils/url_utils";
import { withStore } from "/utils/store";


interface ChatEditPageProps {

}
export class ChatEditPageInitial extends Block {
	constructor(props: ChatEditPageProps) {
		console.log("in construtor");
		const params: Record<string, string> = getUrlParams();
		console.log(params);
		console.log(props)
		/*super({
			title: "Иван",
			submit_url: "#",
			edit_mode: "yes",
			ref: "form",
			profile_photo: {
				profilePhoto: img,
				profileAlt: "Иван"
			},
			profile_items: [
				{
					infoLabel: "Назване чата",
					editMode: "yes",
					infoType: "text",
					infoName: "name",
					value: "Соседи",
					validate_type: "not-empty",
					ref: "input_name"
				}
			],
			submit_btn: {
				text: "Создать чат"
			}
		});*/
	}

	init(){
		console.log("in construtor");
		const params: Record<string, string> = getUrlParams();
		
		console.log(params);
		console.log(this.props);
		/*this.children.chatProfile = new ChatProfile({
			"edit_mode": "yes"
		});*/
	}


	render() {
		return this.compile(template, this.props);
	}
}



const withChat = withStore((state) => {
	console.log("in withStore")
	const params: Record<string, string> = getUrlParams();
	const id: number = params["id"] as number;
	if(id > 0 ){
		const chat: Record<string, string> = state.chats.find((chat) => {
			return chat["id"] === params["id"] && chat["user"]["id"] === chat["created_by"];
		});
		return {chat: chat}
	}
	return {};
});

export const ChatEditPage = withChat(ChatEditPageInitial);
/*
const withSelectedChatMessages = withStore((state) => {
	const selectedChatId: number = state?.selectedChat as number;
	if (!selectedChatId) {
	  return {
			messages: [],
			selectedChat: undefined,
			userId: state.user?.id
	  };
	}
  	return {
	  messages: [...(state?.messages || {})[selectedChatId] || []],
	  selectedChat: state?.selectedChat,
	  userId: state.user?.id
	};
});

export const ChatEditPage = withSelectedChatMessages(ChatEditPageInitial);*/

