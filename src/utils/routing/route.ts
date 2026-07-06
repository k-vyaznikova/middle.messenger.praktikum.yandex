import {Block} from "../block/block";
import ErrorPage from "../../pages/error";
import { ROOT_QUERY } from "../constants";

export class Route {
	//путь маршрута
	private _pathname: string;
	//класс блока - компонента, который будет отрисовываться на маршруте
	private _blockClass: typeof Block | null;
	//блок - компонент, который будет отрисовываться на маршруте
	private _block: null | Block;
	//props компонента, страницы - будут переданы в компонент
	private _props: Record<string, string>;

	constructor(pathname: string, view: typeof Block, props: Record<string, string>) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._props = props;
	}

	//метод для перехода на маршрут
	//вместо этого метода используется метод go в router
	/*
	protected navigate(pathname: string) {
		if (this.match(pathname)) {
			//устанавливаем новый путь маршрута
			this._pathname = pathname;
			//отрисовываем страницу на маршруте
			this.render();
		}
	}
*/

	public leave() {
		this._block = null;
		this._blockClass = null;
		this._props = {};
		this._pathname = "";
	}

	public match(pathname: string) {
		return pathname === this._pathname;
	}

	public render(params: Record<string, string> = {}) {
		if (this._blockClass) {
			
			this._block = new this._blockClass(params);
			renderPage(ROOT_QUERY, this._block);
			return;
		}
	}
	public render404() {
		const errorPage = new ErrorPage();
		renderPage(ROOT_QUERY, errorPage);
	}
}

export function renderPage(query: string, block: Block) {
	const root = document.querySelector(query);
	if (root === null) {
		throw new Error(`Нет корневого элемента с ID =  "${query}"`);
	}
	root.innerHTML = "";
	root.append(block.element!);
	return root;
}
