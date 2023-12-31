import HTTPTransport from "/utils/http_transport.ts";

export abstract class BaseAPI {
	protected http: HTTPTransport;

	constructor(endpoint: string) {
		this.http = new HTTPTransport(endpoint);
	}

	public create(props: any): Promise<any> {
		throw new Error("Not implemented [props"+ props +"]");
	}

	public request(id: number): Promise<any> {
		throw new Error("Not implemented ["+id+"]");
	}

	public update() {
		throw new Error("Not implemented");
	}

	public delete(id: number): Promise<any> {
		throw new Error("Not implemented ["+id+"]");
	}
}
