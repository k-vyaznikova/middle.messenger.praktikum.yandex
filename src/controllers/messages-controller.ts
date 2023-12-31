import WSTransport, {WSTransportEvents} from "/utils/ws_transport.ts";
import store from "/utils/store.ts";
import UserController from "./user-controller";
import {BASE_FILE_URL} from "/utils/constants";
import img from "/img/noimgprofile.svg";

export interface Message {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  }
}

export class MessagesController {
	private sockets: Map<number, WSTransport> = new Map();

	async connect(id: number, token: string) {
		try {
			if (this.sockets.has(id)) {
				return;
			}

			const userId = store.getState().user.id;

			const wsTransport = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);

			this.sockets.set(id, wsTransport);

			await wsTransport.connect();

			this.subscribe(wsTransport, id);
			this.fetchOldMessages(id);
		} catch (e: any) {
			console.log(e.reason);
		}
	}

	sendMessage(id: number, message: string) {
		const socket = this.sockets.get(id);

		if (!socket) {
			throw new Error(`Chat ${id} is not connected`);
		}

		socket.send({
			type: "message",
			content: message
		});
	}

	fetchOldMessages(id: number) {
		const socket = this.sockets.get(id);

		if (!socket) {
			throw new Error(`Chat ${id} is not connected`);
		}

		socket.send({type: "get old", content: "0"});
	}

	closeAll() {
		Array.from(this.sockets.values()).forEach((socket) => socket.close());
	}

	private async onMessage(id: number, messages: Message | Message[]) {
		let messagesToAdd: Array<any> = [];

		if (Array.isArray(messages)) {
			messagesToAdd = messages.reverse();
		} else {
			messagesToAdd.push(messages);
		}

		const currentMessages = (store.getState().messages || {})[id] || [];

		messagesToAdd = [...currentMessages, ...messagesToAdd];

		messagesToAdd.forEach(async (message, index) => {
			UserController.fetchUserById(message["user_id"]).then((responseUser)=>{
				responseUser["avatar"] = responseUser["avatar"]? BASE_FILE_URL + responseUser["avatar"] : img;
				messagesToAdd[index]["user"] = responseUser;
			});
		});

		store.set(`messages.${id}`, messagesToAdd);
	}

	private onClose(id: number) {
		this.sockets.delete(id);
	}

	private subscribe(transport: WSTransport, id: number) {
		transport.on(WSTransportEvents.Message, (message: any) => this.onMessage(id, message));
		transport.on(WSTransportEvents.Close, () => this.onClose(id));
	}
}


const controller = new MessagesController();

export default controller;
