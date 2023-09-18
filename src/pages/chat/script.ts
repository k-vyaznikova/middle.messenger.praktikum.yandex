import {Block} from "/utils/block.ts";
import template from "/pages/chat/chat.hbs";
import chatImg from "/img/noimgprofile.svg";
import img from "/img/photo.jpg";
import store from "/utils/store.ts";
import chatsController from "/controllers/chats-controller.ts";
import authController from "/controllers/auth-controller";

interface ChatPageProps {
	contact_list: Array<any>,
	is_loaded?: string,
	chat_info: {
		chatName: string,
		chatImg: string,
		personalChat: string
	},
	dialog: Array<any>,
	send_msg_form: {
		ref: string,
		send_msg_text: {
			name: string,
			ref: string,
			validate_type: string,
			value: string,
		},
		send_msg_file: {
			name: string,
			ref: string,
			value: string,
		}
	}
}

export class ChatPage extends Block {
	constructor(props: ChatPageProps) {
		super({
			...props,
			chat_info: {
				chatName: "Вадим",
				chatImg: chatImg,
				personalChat: "yes"
			},
			contact_list: [],
			dialog: [
				/* {
					date: "12 июля",
					messages: [
						{
							type: "to",
							msgText: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
							msgTime: "20:00",
							msgImg: img
						},
						{
							type: "to",
							msgText: "В Джубгском, Тенгинском, Новомихайловском и Небугском поселениях Туапсинского района ввели режим ЧС из-за сильных осадков, сообщил оперативный штаб Краснодарского края в своем Telegram.",
							msgTime: "20:02"
						},
						{
							type: "from",
							msgText: "В Джубгском, Тенгинском, Новомихайловском и Небугском поселениях Туапсинского района ввели режим ЧС из-за сильных осадков, сообщил оперативный штаб Краснодарского края в своем Telegram.",
							msgTime: "20:02",
							msgStatus: "read"
						}
					]
				},
				{
					date: "Вчера",
					messages: [
						{
							type: "from",
							msgText: "В Джубгском, Тенгинском, Новомихайловском и Небугском поселениях Туапсинского района ввели режим ЧС из-за сильных осадков, сообщил оперативный штаб Краснодарского края в своем Telegram.",
							msgTime: "20:02",
							msgStatus: "delivered"
						},
						{
							type: "from",
							msgText: "В Джубгском, Тенгинском, Новомихайловском и Небугском поселениях Туапсинского района ввели режим ЧС из-за сильных осадков, сообщил оперативный штаб Краснодарского края в своем Telegram.",
							msgTime: "20:02"

						},
						{
							type: "from",
							msgText: "В Джубгском, Тенгинском, Новомихайловском и Небугском поселениях Туапсинского района ввели режим ЧС из-за сильных осадков, сообщил оперативный штаб Краснодарского края в своем Telegram.",
							msgTime: "20:02"
						}
					]
				}*/
			],
			send_msg_form: {
				ref: "send_message_form",
				send_msg_text: {
					name: "send_message_text",
					ref: "send_message_text",
					validate_type: "not-empty",
					value: ""
				},
				send_msg_file: {
					name: "send_message_file",
					ref: "send_message_file",
					value: ""
				}
			}

		});
	}
	init() {
		//registerComponent("Dialog", Dialog);
		//registerComponent("ContactList", ContactList);
		authController.fetchUser().finally(() => {
			chatsController.fetchChats().finally(() => {
				//this.children.Dialog = new Dialog({});
				this.setProps({
					is_loaded: "yes"
				});
			});
		});
	}

	_getDialog(chatID: number) {
	}


	/* protected componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
		this.children.messages = this.createMessages(newProps);
		return true;
	}*/
	/*

	private createMessages(props: MessengerProps) {
		return props.messages.map((data) => {
			return new Message({...data, isMine: props.userId === data.user_id});
		});
	}*/


	async searchChat(title: string) {
		const state: any = store.getState();
		const newChatList: Array<any> = state["chats"].filter(function(item) {
			return item["title"].indexOf(title) >= 0;
		});
		return newChatList;
	}

	render() {
		return this.compile(template, this.props);
	}
}


/*
chatsController.fetchChats();
const withChatsAndDialog = withStore(state => {
	const selectedChatId = state.selectedChat;
	if (!selectedChatId) {
		return {
			...{
				chats: state.chats,
				dialog: {
					messages: [],
					selectedChat: undefined,
					userId: state.user.id
				}
			}
		};
	}

	return {
		...{
			chats: state.chats,
			dialog: {
				messages: (state.messages || {})[selectedChatId] || [],
				selectedChat: state.selectedChat,
				userId: state.user.id
			}
		}
	};
});

export const ChatPage = withChatsAndDialog(ChatPageInitial);
*/
