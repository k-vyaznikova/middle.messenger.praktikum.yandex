import {Route, renderPage} from "./route.ts";
import {Block} from "../block/block";
import ErrorPage from "../../pages/error";
import { ROOT_QUERY } from "../constants";

export class Router {
	//массив маршрутов
	private routes!: Array<Route>;
	//история переходов
	private history: any = window.history;
	//экземпляр класса Router
	private static __instance: Router;
	//корневой элемент для отрисовки страниц
	private _rootQuery: string = "";


	constructor(rootQuery: string) {
		if (rootQuery === "") {
			throw new Error("Необходим параметр rootQuery для инициализации Router");
		}
		//если экземпляр класса Router уже существует, то возвращаем его
		if (Router.__instance) {
			return Router.__instance;
		}
		this.routes = [];
		this._rootQuery = rootQuery;
		Router.__instance = this;
	}

	public use(pathname: string, block: typeof Block): Router {
		const route = new Route(pathname, block, {});
		this.routes.push(route);
		return this;
	}

	public start(): void {
		//реагируем на изменения в адресной строке и вызываем перерисовку
		window.onpopstate = (event) => {
			let { path, params } = this._getPathAndParams((event.currentTarget as any).location.href);
			this._onRoute(path, params);
		};

		try{
			let { path, params } = this._getPathAndParams(window.location.href);
			this._onRoute(path, params);
		}
		catch(e){
			renderPage(this._rootQuery, new ErrorPage());
		}

	}

	private _onRoute(pathname: string, params: Record<string, string> = {}): void {
		const route = this.getRoute(pathname);
		if (route)
			route.render(params);
		else {
			renderPage(this._rootQuery, new ErrorPage() as Block);
		}
	}

	private _getPathAndParams(pathname: string): { path: string, params: Record<string, string> } {
		let url: URL = new URL(pathname, window.location.origin);
		let params: Record<string, string> = {};
		url.searchParams.forEach((value, key) => {
			params[key] = value;
		});
		return { path: url.pathname, params: params };
	}

	go(pathname: string): void {
		this.history.pushState({}, "", pathname);
		let { path, params } = this._getPathAndParams(pathname);
		this._onRoute(path, params);
	}

	back(): void {
		this.history.back();
		let { path, params } = this._getPathAndParams(window.location.pathname);
		this._onRoute(path, params);
	}

	forward(): void {
		this.history.forward();
		let { path, params } = this._getPathAndParams(window.location.pathname);
		this._onRoute(path, params);
	}

	getRoute(pathname: string): Route | undefined {
		return this.routes.find((route) => route.match(pathname));
	}
}

export default new Router(ROOT_QUERY);
