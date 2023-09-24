import {API, ResourcesAPI} from "/api/resources-api.ts";


export class ResourcesController {
	private api: ResourcesAPI;

	constructor() {
		this.api = API;
	}
}
export default new UserController();
