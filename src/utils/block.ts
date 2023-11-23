import {EventBus} from "./event_bus.ts";
import {nanoid} from "nanoid";

export class Block {
	static get EVENTS() {
		return {
			INIT: "init",
			FLOW_CDM: "flow:component-did-mount",
			FLOW_CDU: "flow:component-did-update",
			FLOW_RENDER: "flow:render"
		};
	}

	public id: string;
	public props: Record<string, unknown>;
	public refs: Record<string, Block> = {};
	private eventBus: () => EventBus;
	private _element: HTMLElement | null = null;
	public children: Record<string, Block>;


	constructor(propsWithChildren = {}) {
		this.id = nanoid(6);
		const eventBus = new EventBus();
		this.eventBus = () => eventBus;
		const {props, children} = this._getPropsAndChildren(propsWithChildren);
		this.props = this._makePropsProxy(props);

		this.children = children;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}


	private _getPropsAndChildren(propsWithChildren: any = {}) {
		const props: Record<string, any> = {};
		const children: Record<string, any> = {};
		Object.keys(propsWithChildren).forEach((key) => {
			if (propsWithChildren[key] instanceof Block) {
				children[key] = propsWithChildren[key];
			} else {
				props[key] = propsWithChildren[key];
			}
		});
		return {props, children};
	}
	private _addEvents() {
		const {events = {}} = this.props as {events: Record<string, () => void>};
		Object.keys(events).forEach((eventName) => {
			(this._element as HTMLElement).addEventListener(eventName, events[eventName]);
		});
	}

	private _removeEvents() {
		const {events = {}} = this.props as {events: Record<string, () => void>};
		if (this._element) {
			Object.keys(events).forEach((eventName) => {
				(this._element as HTMLElement).removeEventListener(eventName, events[eventName]);
			});
		}
	}

	private _registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _init() {
		this.init();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	protected init() {
	}

	private _componentDidMount(): void {
		this.componentDidMount();
	}

	// Может переопределять пользователь, необязательно трогать
	protected componentDidMount(): boolean {
		return true;
	}

	public dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);

		Object.values(this.children).forEach((child) => {
			if (Array.isArray(child)) {
				child.forEach((ch) => ch.dispatchComponentDidMount());
			} else {
				child.dispatchComponentDidMount();
			}
		});
	}

	private async _componentDidUpdate(newProps: any) {
		const res: boolean = this.componentDidUpdate(newProps);
		if (res) {
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		}
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidUpdate(newProps: any) {
		const t: any= newProps;
		return true || (t && false);
	}

	setProps = (nextProps: any) => {
		if (!nextProps) {
			return;
		}
		Object.assign(this.props, nextProps);
	};

	get element() {
		return this._element;
	}

	private _render() {
		const docFrag: DocumentFragment = this.render();
		this._removeEvents();
		const newElem = docFrag.firstElementChild as HTMLElement;
		if (this._element) {
			this._element.replaceWith(newElem);
		}
		this._element = newElem;
		this._addEvents();
		this.dispatchComponentDidMount();
	}

	// Может переопределять пользователь, необязательно трогать
	render(): DocumentFragment {
		return new DocumentFragment();
	}

	getContent() {
		return this.element;
	}

	protected compile(template: (context: any) => string, context: any) {
		const contextAndStubs = {...context};

		Object.entries(this.children).forEach(([name, component]) => {
			if (Array.isArray(component)) {
				contextAndStubs[name] = component.map((child) => `<div data-id="${child.id}"></div>`);
			} else {
				contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
			}
		});

		const html = template(contextAndStubs);

		const temp = document.createElement("template");

		temp.innerHTML = html;

		const replaceStub = (component: Block) => {
			const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

			if (!stub) {
				return;
			}

			component.getContent()?.append(...Array.from(stub.childNodes));

			stub.replaceWith(component.getContent()!);
		};

		Object.entries(this.children).forEach(([_, component]) => {
			if (Array.isArray(component)) {
				component.forEach(replaceStub);
			} else {
				replaceStub(component);
			}
			return _;
		});

		return temp.content;
	}


	private _makePropsProxy(props: any) {
		// Можно и так передать this
		// Такой способ больше не применяется с приходом ES6+
		const self = this;
		return new Proxy(props, {
			set(target, prop, val) {
				// const oldProps = {...target};
				target[prop] = val;
				self.eventBus().emit(Block.EVENTS.FLOW_CDU, target);
				return true;
			},
			deleteProperty() {
				throw new Error("Нет доступа");
			}
		});
	}

	_createDocumentElement(): DocumentFragment {
		return new DocumentFragment();
	}

	show() {
		(this.getContent() as HTMLElement).style.display = "block";
	}

	hide() {
		(this.getContent() as HTMLElement).style.display = "none";
	}
}

