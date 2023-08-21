import {EventBus} from "./event-bus.ts";
import {nanoid} from "nanoid";


export class Block {
	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render",
	};

	public id: string;
	protected props: Record<string, unknown>;
	private eventBus: () => EventBus; s;
	private _element: HTMLElement | null = null;
	private _meta: any = null;
	private children: Record<string, Block>;


	constructor(tagName = "div", propsWithChildren = {}) {
		this.id = nanoid(6);
		const eventBus = new EventBus();
		this.eventBus = () => eventBus;
		const {props, children} = this._getPropsAndChildren(propsWithChildren);
		this._meta = {
			tagName,
			props,
		};
		this.props = this._makePropsProxy(props);

		this.children = children;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}


	private _getPropsAndChildren(propsWithChildren = {}) {
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
		const {events = {}} = this.props as {events};
		Object.keys(events).forEach((eventName) => {
			this._element.addEventListener(eventName, events[eventName]);
		});
	}

	private _registerEvents(eventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _createResources() {
		const {tagName} = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

	protected init() {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	private _componentDidMount() {
		this.componentDidMount();
	}

	// Может переопределять пользователь, необязательно трогать
	protected componentDidMount(oldProps) {
		return true;
	}

	public dispatchComponentDidMount() {
		this._eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	private _componentDidUpdate(oldProps, newProps) {
		if (this.componentDidUpdate(oldProps, newProps)) {
			this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
		}
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidUpdate(oldProps, newProps) {
		return true;
	}

	setProps = (nextProps) => {
		if (!nextProps) {
			return;
		}
		Object.assign(this.props, nextProps);
	};

	extractAttributes() {
		Object.keys(this.props).forEach((propName) => {
			if (propName.startsWith("__")) {
				const newPropName = propName.slice(2, propName.length);
				this._element.setAttribute(newPropName, this.props[propName]);
			}
		});
	}

	get element() {
		return this._element;
	}

	private _render() {
		this.extractAttributes();
		const block = this.render();
		this._element.append(block);
		this._addEvents();
	}

	// Может переопределять пользователь, необязательно трогать
	render(): DocumentFragment {
		return new DocumentFragment();
	}

	getContent() {
		return this.element;
	}


	// /stop here!!!!
	protected compile(template: (props: any)=>string, props: any) {
		const plugsAndProps = {...props};
		Object.entries(this.children).forEach(([key, component]) => {
			plugsAndProps[key] = `<div data-id = '${component.id}'></div>`;
		});
		console.log("?????");
		//console.log(plugsAndProps);
		const html = template(plugsAndProps);
		const temp = document.createElement("template");
		temp.innerHTML = html;
		Object.entries(this.children).forEach(([key, component]) => {
			const plug = temp.content.querySelector(`[data-id='${component.id}']`);
			if (!plug) {
				return;
			} else {
				plug.replaceWith(component.getContent());
			}
		});
		return temp.content;
	}
	private _makePropsProxy(props) {
		// Можно и так передать this
		// Такой способ больше не применяется с приходом ES6+
		const self = this;
		return new Proxy(props, {
			set(target, prop, val) {
				const oldProps = {...target};
				target[prop] = val;
				self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
				return true;
			},
			deleteProperty() {
				throw new Error("Нет доступа");
			},
		});
	}

	_createDocumentElement(tagName) {
	// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		return document.createElement(tagName);
	}

	show() {
		this.getContent().style.display = "block";
	}

	hide() {
		this.getContent().style.display = "none";
	}
}

