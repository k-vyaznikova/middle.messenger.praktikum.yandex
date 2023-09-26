import {API, ChatsAPI} from "/api/chats-api.ts";
import store from "/utils/store.ts";
import {ResultValidate} from "/types/common_types.ts";
import {User} from "/types/common_types.ts";
import MessagesController from "/controllers/messages-controller.ts";


export class ChatsController {
	private api: ChatsAPI;

	constructor() {
		this.api = API;
	}

	async createChat(title: string): ResultValidate | number {
		let result: ResultValidate;
		try {
			const id: number = await this.api.create(title);
			return id;
		} catch (e: any) {
			result = {
				is_ok: false,
				msg_text: e.reason
			};
		}
		return result;
	}

	private addUsersToChat(id: number, userIds: number[]) {
		this.api.addUsers(id, userIds);
	}

	createChatWithUsers(title: string, users: number[]) {
		try {
			const id = this.createChat(title);
			if (typeof id === "number" && id > 0) {
				this.addUsersToChat(id, users);
			}
			return id;
		} catch (e) {
			return {
				is_ok: false,
				msg_text: "Ошибка при создании чата"
			};
		}
	}

	async deleteChat(id: number) {
		await this.api.delete(id);
		this.fetchChats();
	}

	async fetchChats() {
		const chats = await this.api.read();

		chats.map(async (chat) => {
		  	const token = await this.getToken(chat.id);
			await MessagesController.connect(chat.id, token);
		});

		store.set("chats", chats);
	}


	async getUsers(id: number) {
		let users: Array<User> = [];
		try {
			users = await this.api.getUsers(id);
		} catch (e: any) {
			console.log(e.reason);
		}
		return users;
	}

	addUserToChat(id: number, userId: number) {
		this.api.addUsers(id, [userId]);
	}

	getToken(id: number) {
		return this.api.getToken(id);
	}

	selectChat(id: number) {
		store.set("selectedChat", id);
	}
}

export default new ChatsController();
