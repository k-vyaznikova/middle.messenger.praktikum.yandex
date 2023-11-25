import {Route} from "./route.ts";
import {Block} from "./../block.ts";
import {ErrorPage} from "./../../pages/error/script.ts";
import {getUrlParams} from "./../url_utils.ts";

export class Router {
	private _routes!: Array<Route>;
	private history: any = window.history;
	private static __instance?: Router;
	private _currentRoute!: Route | null;
	private _rootQuery!: string;


	constructor(rootQuery: string = "body") {
		if (Router.__instance) {
			return Router.__instance;
		}

		this._routes = [];
		this._currentRoute = null;
		this._rootQuery = rootQuery;

		Router.__instance = this;
	}

	public use(pathname: string, block: typeof Block): Router {
		let ind: number = -1;
		if (typeof pathname !== "string")
			return this;
		pathname = pathname.trim();
		if (pathname.indexOf(" ") > -1 || pathname === "")
			return this;
		const route = new Route(pathname, block, {rootQuery: this._rootQuery});
		if ((ind = this.getRouteIndex(pathname)) >= 0) {
			this._routes[ind] = route;
		} else {
			this._routes.push(route);
		}
		return this;
	}

	public start(): void {
		let params: Record<string, any> = {};
		// Реагируем на изменения в адресной строке и вызываем перерисовку
		window.onpopstate = (event) => {
			this._onRoute((event.currentTarget as any).location.pathname);
		};
		if (window.location.search!="")
			params = getUrlParams(window.location.search.substring(1));
		this._onRoute(window.location.pathname, params);
	}

	private _onRoute(pathname: string, params: Record<string, any> = {}): void {
		const route = this.getRoute(pathname);
		if (this._currentRoute) {
			this._currentRoute?.leave();
		}
		this._currentRoute = route as Route;
		if (route) {
			route.render(params);
		} else {
			Route.renderPage(this._rootQuery, new ErrorPage());
		}
	}

	go(pathname: string, state: string = ""): void {
		const params: Record<string, any> = getUrlParams(state);
		if (state != "")
			this.history.pushState(params, "", pathname+"?"+state);
		else
			this.history.pushState(params, "", pathname);
		this._onRoute(pathname, params);
	}

	back(): void {
		this.history.back();
		console.log("window.location.pathname");
		console.log(window.location.pathname);
		this._onRoute(window.location.pathname);
	}

	forward(): void {
		this.history.forward();
		this._onRoute(window.location.pathname);
	}

	getRoute(pathname: string): Route | undefined {
		return this._routes.find((route) => route.match(pathname));
	}


	/** For testing */
	public resetRouter() {
		if (Router.__instance)
			delete Router.__instance;
		this._routes = [];
		this._currentRoute = null;

		Router.__instance = this;
	}

	public routeLength() {
		return this._routes.length;
	}

	public getRouteIndex(pathname: string): number {
		return this._routes.findIndex((route) => route.match(pathname));
	}

	public getHistoryLength() {
		return this.history.length;
	}
}

export default new Router("#app");
