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
			chatImg: "/img/noimgprofile.svg"
		});
		this.children.items_dialog = this._prepareOldMessages(this.props?.messages as Array<any>);
		this.children.sendMsgForm = new SendMsgForm({});
	}

	componentDidUpdate(oldProps: any, newProps: any): boolean {
		this.children.chatInfo = new ChatInfo({
			chatName: "test",
			chatImg: "/img/noimgprofile.svg"
		});
		this.children.items_dialog = this._prepareOldMessages(newProps["messages"]);
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
	  messages: (state?.messages || {})[selectedChatId] || [],
	  selectedChat: state?.selectedChat,
	  userId: state.user?.id
	};
});

export const Dialog = withSelectedChatMessages(DialogInitial);
