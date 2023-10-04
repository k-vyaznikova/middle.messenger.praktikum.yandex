import {API, ChatsAPI} from "/api/chats-api.ts";
import {API as APIAuth} from "/api/auth-api.ts";
import store from "/utils/store.ts";
import {ResultValidate} from "/types/common_types.ts";
import {User, ChatIdAndUsers} from "/types/common_types.ts";
import MessagesController from "/controllers/messages-controller.ts";


export class ChatsController {
	private api: ChatsAPI;

	constructor() {
		this.api = API;
	}

	async createChat(title: string): Promise<ResultValidate> {
		let result: ResultValidate;
		try {
			await this.api.create(title);
			this.fetchChats();
			result = {
				is_ok: true,
				msg_text: ""
			}
		} catch (e: any) {
			result = {
				is_ok: false,
				msg_text: e.reason
			};
		}
		return result;
	}

	public async addUsersToChat(id: number, userIds: number[]) {
		let result: ResultValidate;
		try {
			const chatIdAndUsers: ChatIdAndUsers = {
				chatId: id,
				users: userIds
			};
			console.log(chatIdAndUsers);
			await this.api.addUsers(chatIdAndUsers);
			await this.fetchChatAndUser(id);
			result = {
				is_ok: true,
				msg_text: "Список участников успешно обновлен"
			};
		} catch (e: any) {
			console.log("in_errror!");
			result = {
				is_ok: false,
				msg_text: e.reason
			};
		}

		return result;
	}


	public async deleteUsersFromChat(id: number, userIds: number[]) {
		let result: ResultValidate;
		try {
			const chatIdAndUsers: ChatIdAndUsers = {
				chatId: id,
				users: userIds
			};
			await this.api.deleteUsers(chatIdAndUsers);
			await this.fetchChatAndUser(id);
			result = {
				is_ok: true,
				msg_text: "Список участников успешно обновлен"
			};
		} catch (e: any) {
			result = {
				is_ok: false,
				msg_text: e.reason
			};
		}

		return result;
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

	async deleteChat(id: number): Promise<ResultValidate> {
		let result: ResultValidate;
		try {
			await this.api.delete(id);
			this.fetchChats();
			this.selectChat(0);
			result = {
				is_ok: true,
				msg_text: ""
			};
		} catch (e: any) {
			console.log(e);
			result = {
				is_ok: false,
				msg_text: e.reason
			};
		}
		return result;
	}

	async fetchChats() {
		const chats = await this.api.read();

		chats.map(async (chat) => {
		  	const token = await this.getToken(chat.id);
			await MessagesController.connect(chat.id, token);
		});

		store.set("chats", chats);
	}

	async fetchChatAndUser(chatId: number): Promise<ResultValidate> {
		try {
			const chats: Array<any> = await this.api.read();
			let users: Array<any> = await this.api.getUsers(chatId);
			const currentUser: User = await APIAuth.read();
			const index: number = chats.findIndex((chat)=>{
				return chat["id"] == chatId;
			});
			if (index > -1) {
				users = users.map((user) => {
					user.delete_allow = true;
					if (user["id"] == currentUser["id"])
						user.delete_allow = false;
					return user;
				});
				chats[index]["users"] = users;
				chats[index]["edit_allow"] = false;
				if (currentUser["id"] == chats[index]["created_by"])
					chats[index]["edit_allow"] = true;
				store.set("current_chat", chats[index]);
				return {
					is_ok: true,
					msg_text: "Данные чата загружены"
				};
			}
		} catch (e: any) {
			store.set("current_chat", undefined);
			return {
				is_ok: false,
				msg_text: e.reason
			};
		}
		return {
			is_ok: false,
			msg_text: "Ошибка выгрузки"
		};
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


	getToken(id: number) {
		return this.api.getToken(id);
	}

	selectChat(id: number = 0) {
		if (id > 0)
			store.set("selectedChat", id);
		else
			store.set("selectedChat", undefined);
	}

	async uploadChatAvatar(chatIdAndFile: FormData) {
		let result: ResultValidate;
		try {
			await this.api.uploadChatAvatar(chatIdAndFile);
			await this.fetchChatAndUser(chatIdAndFile.get("chatId") as unknown as number);
			result = {
				is_ok: true,
				msg_text: "Аватар успешно изменен."
			};
		} catch (e: any) {
			result = {
				is_ok: false,
				msg_text: e? e.reason : "Ошибка загрузки"
			};
		}
		return result;
	}
}

export default new ChatsController();
