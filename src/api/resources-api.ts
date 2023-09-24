import {BaseAPI} from "/api/base-api.ts";


export class ResourcesAPI extends BaseAPI {
	constructor() {
		super("/resources");
	}

	public read = undefined;


	public create = undefined;
	public update = undefined;
	public delete = undefined;
}

export const API = new AuthAPI();
