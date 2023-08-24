import {EventBus} from "./event_bus.ts";
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
	protected refs: Record<string, Block> = {};
	private eventBus: () => EventBus;
	private _element: HTMLElement | null = null;
	private _meta: any = null;
	private children: Record<string, Block>;


	constructor(propsWithChildren = {}) {
		this.id = nanoid(6);
		const eventBus = new EventBus();
		this.eventBus = () => eventBus;
		const {props, children} = this._getPropsAndChildren(propsWithChildren);
		//console.log(props);
		//console.log(children);
		this._meta = {
			props
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

	protected init() {
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
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
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

	get element() {
		return this._element;
	}

	private _render() {
		const docFrag: DocumentFragment = this.render();
		console.log(docFrag);
		const newElem = docFrag.firstElementChild as HTMLElement;
		if (this._element)
			this._element.replaceWith(newElem);
		//console.log(newElem);
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
		//console.log("_-_-_-_-_-_");
		//console.log(html)
		//console.log(plugsAndProps);
		
		plugsAndProps.__children?.forEach(({embed}: any) => {
			embed(temp.content);
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

	_createDocumentElement(): DocumentFragment {
		return new DocumentFragment();
	}

	show() {
		this.getContent().style.display = "block";
	}

	hide() {
		this.getContent().style.display = "none";
	}
}
