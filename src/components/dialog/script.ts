import {Block} from "/utils/block.ts";
import template from "/components/dialog/template.hbs";
import {withStore} from "/utils/store.ts";
import {formattedDate, formattedTime} from "/utils/date_utils.ts";
import {DateMsg} from "../date_msg/script";
import {OutgoingMsg} from "/components/outgoing_msg/script.ts";
import {IncomingMsg} from "/components/incoming_msg/script.ts";
import {ChatInfo} from "/components/chat_info/script.ts";
import {SendMsgForm} from "/components/send_msg_form/script.ts";
import {Message as MessageInfo} from "/controllers/messages-controller.ts";
import store from "/utils/store.ts";
import {BASE_FILE_URL} from "/utils/constants";


interface DialogProps{
	selectedChat: number | undefined;
	messages: MessageInfo[];
	userId: number;
}

export class DialogInitial extends Block {
	constructor(props: DialogProps) {
		super(props);
	}

	protected init(): void {
		this.children.chatInfo = new ChatInfo({
			chatName: "test",
			chatImg: "/img/noimgprofile.svg",
			chatId: this.props.selectedChat
		});
		this.children.items_dialog = this._prepareOldMessages(this.props?.messages as Array<any>);
		this.children.sendMsgForm = new SendMsgForm({});
	}

	componentDidUpdate(oldProps: any, newProps: any): boolean {
		if (store.getState().selectedChat) {
			const selectedChat:any = store.getState().chats.find((chat: any)=>{
				return chat["id"] == store.getState().selectedChat;
			});
			this.children.chatInfo = new ChatInfo({
				chatName: selectedChat["title"],
				chatImg: selectedChat["avatar"]? BASE_FILE_URL+selectedChat["avatar"] : "/img/noimgprofile.svg",
				chatId: this.props.selectedChat
			});
		}
		this.children.items_dialog = this._prepareOldMessages(newProps["messages"]);
		return true;
	}

	protected componentDidMount(): boolean {
		const rightSide = document.querySelector(".right-side-content") as HTMLElement;
		if (rightSide)
			rightSide.scrollTop = rightSide.scrollHeight;
		return true;
	}


	_prepareOldMessages(messages: Array<any>): Array<any> {
		const self: any = this;
		const newMess = messages.map(function(item) {
			return {
				type: self.props.userId === item["user_id"]? "from" : "to",
				msgText: item["content"],
				msgTime: formattedTime(item["time"]),
				msgDate: formattedDate(item["time"]),
				msgImg: ""
			};
		});
		const sortMessages: Array<any>= [];
		const dates: Array<any> = [];
		newMess.forEach(function(item) {
			if (!dates.includes(item["msgDate"])) {
				sortMessages.push(new DateMsg({date: item["msgDate"]}));
				dates.push(item["msgDate"]);
			}
			const mess: OutgoingMsg | IncomingMsg = newMess["type"] === "from"? new OutgoingMsg(item) : new IncomingMsg(item);
			sortMessages.push(mess);
		});
		return sortMessages;
	}

	render() {
		return this.compile(template, this.props);
	}
}

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

export const Dialog = withSelectedChatMessages(DialogInitial);
