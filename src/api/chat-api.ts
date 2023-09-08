import HTTP from "/utils/http_transport.ts";
import {BaseAPI} from "/api/base-api.ts";

const chatAPIInstance = new HTTP("/chats");

export class ChatAPI extends BaseAPI {
	create() {
		return chatAPIInstance.post("/", {title: "string"});
	}

	request() {
		return chatAPIInstance.get("/full");
	}
}
