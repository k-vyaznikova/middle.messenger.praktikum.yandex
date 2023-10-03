import {BaseAPI} from "/api/base-api.ts";
import {User, ChatIdAndUsers, Chat} from "/types/common_types.ts";


/* export interface ChatInfo {
	id: number;
	title: string;
	avatar: string;
	unread_count: number;
	last_message: {
		user: User,
		time: string;
		content: string;
	}
}
*/

export class ChatsAPI extends BaseAPI {
	constructor() {
		super("/chats");
	}


	async create(title: string): Promise<number> {
		return await this.http.post("/", {title});
	}

	delete(id: number): Promise<unknown> {
		return this.http.delete("/", {chatId: id});
	}


	read(): Promise<Chat[]> {
		return this.http.get("/");
	}

	getUsers(id: number): Promise<Array<User & { role: string }>> {
		return this.http.get(`/${id}/users`);
	}

	addUsers(chatIdAndUsers: ChatIdAndUsers): Promise<unknown> {
		return this.http.put("/users", chatIdAndUsers);
	}

	deleteUsers(chatIdAndUsers: ChatIdAndUsers): Promise<unknown> {
		return this.http.delete("/users", chatIdAndUsers);
	}

	async getToken(id: number): Promise<string> {
		const response = await this.http.post<{ token: string }>(`/token/${id}`);
		return response.token;
	}

	public async uploadChatAvatar(chatIdAndFile: FormData) {
		return this.http.put("/avatar", chatIdAndFile);
	}


	update = undefined;
}

export const API = new ChatsAPI();
