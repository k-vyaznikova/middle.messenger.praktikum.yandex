import {Route, renderPage} from "/utils/routing/route.ts";
import {Block} from "/utils/block.ts";
import {ErrorPage} from "/pages/error/script.ts";

class Router {
	private routes!: Array<Route>;
	private history: any = window.history;
	private static __instance: Router = new Router("#app");
	private _currentRoute!: Route | null;
	private _rootQuery!: string;


	constructor(rootQuery: string) {
		if (Router.__instance) {
			return Router.__instance;
		}

		this.routes = [];
		this._currentRoute = null;
		this._rootQuery = rootQuery;

		Router.__instance = this;
	}

	public use(pathname: string, block: typeof Block): Router {
		const route = new Route(pathname, block, {rootQuery: this._rootQuery});
		this.routes.push(route);
		return this;
	}

	public start(): void {
		// Реагируем на изменения в адресной строке и вызываем перерисовку
		window.onpopstate = (event) => {
			this._onRoute(event.currentTarget?.location.pathname);
		};

		this._onRoute(window.location.pathname);
	}

	private _onRoute(pathname: string): void {
		const route = this.getRoute(pathname);

		if (this._currentRoute) {
			this._currentRoute.leave();
		}

		this._currentRoute = route as Route;
		if (route)
			route.render();
		else {
			renderPage(this._rootQuery, new ErrorPage());
		}
	}

	go(pathname: string): void {
		this.history.pushState({}, "", pathname);
		this._onRoute(pathname);
	}

	back(): void {
		this.history.back();
		this._onRoute(window.location.pathname);
	}

	forward(): void {
		this.history.forward();
		this._onRoute(window.location.pathname);
	}

	getRoute(pathname: string): Route | undefined {
		return this.routes.find((route) => route.match(pathname));
	}
}

export default new Router("#app");
