type Options = {
method: string;
data?: any;
};

// Тип Omit принимает два аргумента: первый — тип, второй — строка
// и удаляет из первого типа ключ, переданный вторым аргументом
type OptionsWithoutMethod = Omit<Options, "method">;
// Этот тип эквивалентен следующему:
// type OptionsWithoutMethod = { data?: any };

export class HTTPTransport {
	get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(url, {...options, method: "GET"});
	}
	post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(url, {...options, method: "POST"});
	}
	put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(url, {...options, method: "PUT"});
	}
	delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(url, {...options, method: "DELETE"});
	}

	request(url: string, options: Options = {method: METHOD.GET}): Promise<XMLHttpRequest> {
		const {method, data} = options;
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);

			xhr.onload = function() {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			if (method === METHOD.GET || !data) {
				xhr.send();
			} else {
				xhr.send(data);
			}
		});
	}
}