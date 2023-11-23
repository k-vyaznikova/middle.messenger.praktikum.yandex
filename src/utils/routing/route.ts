import {Block} from "./../block.ts";
import {ErrorPage} from "./../../pages/error/script.ts";
import TestUtils from "./../../utils/test_utils.ts";

export class Route {
	private _pathname: string;
	private _blockClass: typeof Block;
	private _block: null | Block;
	private _props: Record<string, string>;

	constructor(pathname: string, view: typeof Block, props: Record<string, string>) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._props = props;
	}

	protected navigate(pathname: string) {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render({});
		}
	}

	public leave() {
		if (this._block) {
			this._block = null;
		}
	}

	public match(pathname: string) {
		return pathname === this._pathname;
	}

	public render(params: Record<string, any>) {
		if (!this._block) {
			this._block = new this._blockClass(params);
			Route.renderPage(this._props.rootQuery, this._block);
			return;
		}

		this._block.show();
	}

	public static renderPage(query: string, block: Block) {
		/* for testing */
		if (block instanceof ErrorPage)
			TestUtils.emptyFunction();
		/* ------------- */

		const root = document.querySelector(query);
		if (root === null) {
			throw new Error(`root not found by selector "${query}"`);
		}
		root.innerHTML = "";
		root.append(block.getContent()!);
		return root;
	}
}


