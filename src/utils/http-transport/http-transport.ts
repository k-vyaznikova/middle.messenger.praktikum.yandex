export enum Method {
	Get = "Get",
	Post = "Post",
	Put = "Put",
	Patch = "Patch",
	Delete = "Delete"
}

type Options = {
	method: Method;
	data?: unknown;
};

const FETCH_METHODS: Record<Method, string> = {
	[Method.Get]: "GET",
	[Method.Post]: "POST",
	[Method.Put]: "PUT",
	[Method.Patch]: "PATCH",
	[Method.Delete]: "DELETE",
};

export default class HTTPTransport {
	static API_URL = "https://ya-praktikum.tech/api/v2";
	protected endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
	}

	public get<Response>(path = "/"): Promise<Response> {
		return this.request<Response>(this.endpoint + path);
	}

	public post<Response = void>(path: string, data?: unknown): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Method.Post,
			data,
		});
	}

	public put<Response = void>(path: string, data: unknown): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Method.Put,
			data,
		});
	}

	public patch<Response = void>(path: string, data: unknown): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Method.Patch,
			data,
		});
	}

	public delete<Response>(path: string, data?: unknown): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Method.Delete,
			data,
		});
	}

	private _formParamsForGet(data: Record<string, string>): string {
		return new URLSearchParams(
			Object.entries(data).map(([key, value]) => [key, String(value)])
		).toString();
	}

	private async _parseResponse(response: Response): Promise<unknown> {
		if (response.status === 204) {
			return null;
		}

		const contentType = response.headers.get("content-type");

		if (contentType?.includes("application/json")) {
			return response.json();
		}

		const text = await response.text();
		return text || null;
	}

	private request<Response>(url: string, options: Options = {method: Method.Get}): Promise<Response> {
		const {method, data} = options;
		let requestUrl = url;
		let body: BodyInit | undefined;

		if (method === Method.Get && data) {
			requestUrl += `?${this._formParamsForGet(data as Record<string, string>)}`;
		} else if (data instanceof FormData) {
			body = data;
		} else if (data !== undefined) {
			body = JSON.stringify(data);
		}

		const headers: HeadersInit = {};

		if (!(data instanceof FormData) && body !== undefined) {
			headers["Content-Type"] = "application/json";
		}
		return fetch(requestUrl, {
			method: FETCH_METHODS[method],
			headers,
			body: method === Method.Get ? undefined : body,
			credentials: "include",
		})
			.then(async (response) => {
				const responseData = await this._parseResponse(response);

				if (response.status < 400) {
					return responseData as Response;
				}

				return Promise.reject(responseData);
			})
			.catch((error) => {
				if (error && typeof error === "object" && "reason" in error) {
					return Promise.reject(error);
				}

				return Promise.reject({reason: "network error"});
			});
	}
}
