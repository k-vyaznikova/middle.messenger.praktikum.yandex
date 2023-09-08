export class HTTPTransport {
	public get(url: string, options: Record<string, string>): Promise<XMLHttpRequest> {
		return this.request(url, {...options, method: "GET"});
	}
	public post(url: string, options: Record<string, string>): Promise<XMLHttpRequest> {
		return this.request(url, {...options, method: "POST"});
	}
	public put(url: string, options: Record<string, string>): Promise<XMLHttpRequest> {
		return this.request(url, {...options, method: "PUT"});
	}
	public delete(url: string, options: Record<string, string>): Promise<XMLHttpRequest> {
		return this.request(url, {...options, method: "DELETE"});
	}

	private request(url: string, options: Record<string, any>): Promise<XMLHttpRequest> {
		const {headers = {}, method, data} = options;
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			if (method === "GET")
				url = url + this.queryStringify(data);
			xhr.open(method, url);
			Object.keys(headers).forEach((key) => {
				xhr.setRequestHeader(key, (headers[key]));
			});
			xhr.onload = function() {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			if (method === "GET" || !data) {
				xhr.send();
			} else {
				xhr.send(data);
			}
		});
	}

	private queryStringify(data: Record<string, string>) {
		let str: string = "?";
		let quantityParams = 0;
		const check: boolean = true;
		for (const key in data) {
			if (check) {
				if (quantityParams != 0) {
					str+="&";
					str += key+"="+data[key];
					quantityParams++;
				}
			}
		}
		return str;
	}
}
