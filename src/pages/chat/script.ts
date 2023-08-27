import {Block} from "/utils/block.ts";
import template from "/pages/chat/chat.hbs";
import chatImg from "/img/noimgprofile.svg";
import img from "/img/photo.jpg";

export class ChatPage extends Block {
	constructor() {
		super({
			profile_name: "Вязникова Кристина",
			profile_photo: "/img/noimgprofile.svg",
			search: {
				submit_url: "###"
			},
			// openProfile: () => {renderPage("profile")}
			contact_list: [
				{
					contactSelected: "yes",
					contactDialogLink: "#",
					contactImg: chatImg,
					contactName: "Иван Иванов",
					yourMsg: "yes",
					contactMsg: "Позвони мне в 9",
					contactTimeMsg: "23:04",
					contactQMsg: "3"
				},
				{
					contactDialogLink: "#",
					contactImg: chatImg,
					contactName: "Петр Петров",
					yourMsg: "yes",
					contactMsg: "Позвони мне в 9",
					contactTimeMsg: "23:04",
					contactQMsg: "5"
				},
				{
					contactDialogLink: "#",
					contactImg: chatImg,
					contactName: "Иван Иванов",
					contactMsg: "Позвони мне в 9",
					contactTimeMsg: "23:04",
					contactQMsg: "5"
				},
				{
					contactDialogLink: "#",
					contactImg: chatImg,
					contactName: "Иван Иванов",
					yourMsg: "yes",
					contactMsg: "Позвони мне в 9",
					contactTimeMsg: "23:04",
					contactQMsg: "5"
				},
				{
					contactDialogLink: "#",
					contactImg: chatImg,
					contactName: "Иван Иванов",
					contactMsg: "Позвони мне в 9",
					contactTimeMsg: "23:04",
					contactQMsg: "5"
				}

			],
			chat_info: {
				chatName: "Вадим",
				chatImg: chatImg,
				personalChat: "yes"
			},
			dialog: [
				{
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
				}
			]

		});
	}
	render() {
		return this.compile(template, this.props);
	}
}
