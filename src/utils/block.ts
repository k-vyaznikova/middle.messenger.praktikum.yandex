import {EventBus} from "./event_bus.ts";
import {nanoid} from "nanoid";

export class Block {
	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render"
	};

	public id: string;
	public props: Record<string, unknown>;
	public refs: Record<string, Block> = {};
	private eventBus: () => EventBus;
	private _element: HTMLElement | null = null;
	private children: Record<string, Block>;


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
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	protected init() {
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	private _componentDidMount(): void {
		this.componentDidMount();
		Object.values(this.children).forEach((child) => {
			child.dispatchComponentDidMount();
		});
	}

	// Может переопределять пользователь, необязательно трогать
	protected componentDidMount(): boolean {
		return true;
	}

	public dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	private _componentDidUpdate(oldProps: any, newProps: any) {
		if (this.componentDidUpdate(oldProps, newProps)) {
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		}
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidUpdate(oldProps: any, newProps: any) {
		console.log(oldProps);
		console.log(newProps);
		return true;
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
	}

	// Может переопределять пользователь, необязательно трогать
	render(): DocumentFragment {
		return new DocumentFragment();
	}

	getContent() {
		return this.element;
	}


	protected compile(template: (props: any) => string, props: any) {
		const plugsAndProps = {...props, __refs: this.refs};
		Object.entries(this.children).forEach(([key, component]) => {
			plugsAndProps[key] = `<div data-id = '${component.id}'></div>`;
		});

		const html = template(plugsAndProps);
		const temp = document.createElement("template");
		temp.innerHTML = html;

		plugsAndProps.__children?.forEach(({embed}: any) => {
			embed(temp.content);
		});
		return temp.content;
	}


	private _makePropsProxy(props: any) {
		// Можно и так передать this
		// Такой способ больше не применяется с приходом ES6+
		const self = this;
		return new Proxy(props, {
			set(target, prop, val) {
				const oldProps = {...target};
				target[prop] = val;
				self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
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

