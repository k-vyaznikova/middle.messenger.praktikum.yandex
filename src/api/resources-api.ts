import {BaseAPI} from "/api/base-api.ts";


export class ResourcesAPI extends BaseAPI {
	constructor() {
		super("/resources");
	}

	public read = undefined;

}

export const API = new ResourcesAPI();
