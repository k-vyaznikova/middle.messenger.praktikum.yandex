import {EventBus} from "./event_bus.ts";
import {nanoid} from "nanoid"; // нужна только для генерации id компонента

export class Block {
	//все события компонента
	static EVENTS = {
		INIT: "init", //событие инициализации компонента
		CDM: "component-did-mount", //событие монтирования компонента
		CDU: "component-did-update", //событие обновления компонента
		RENDER: "render" //событие рендера компонента
	}

	//id компонента
	public id: string;
	//props компонента	
	public props: Record<string, any> = {};
	//refs компонента
	public refs: Record<string, Block> = {};
	//eventBus компонента
	private eventBus: EventBus;
	//элемент компонента
	public element: HTMLElement | undefined = undefined;
	//children компонента
	public children: Record<string, Block> | Record<string, Block[]>;


	constructor(propsWithChildren = {}) {
				//генерируем id компонента
				this.id = nanoid(6);
				//создаем eventBus для компонента - для управления событиями компонента
				//const eventBus = 
				this.eventBus = new EventBus(); 
				//получаем props и children из propsWithChildren
				const {props, children} = this._getPropsAndChildren(propsWithChildren);
				//создаем прокси для props
				this.props = this._makePropsProxy(props);
				//сохраняем children в свойство компонента children
				this.children = children;
				//регистрируем события в eventBus
				this._registerEvents(this.eventBus);
				//вызываем метод init компонента - может быть переопределен пользователем
				this.eventBus.emit(Block.EVENTS.INIT);
	}


	private _getPropsAndChildren(propsWithChildren: any = {}) {
		const props: Record<string, any> = {};
		const children: Record<string, any> = {};
		Object.keys(propsWithChildren).forEach((key) => {
			//свойства и потомки передаютсяобщим массивом
			//разделяем их на свойства и потомки
			if (propsWithChildren[key] instanceof Block) { // если свойство сгенерировано классом Block, то это потомок
				children[key] = propsWithChildren[key];
			} else {
				props[key] = propsWithChildren[key];
			}
		});
		return {props, children};
	}

	
	private _addEvents() {
		if(this.props.events instanceof Object){
			let events: Record<string, any> = this.props.events;
			Object.keys(events).forEach((eventName: string) => {
				(this.element as HTMLElement).addEventListener(eventName, events[eventName]);
			});
		}	
	}





	//метод для удаления событий из элемента
	private _removeEvents() {
		if (!this.element || !(this.props.events instanceof Object)) 
			return;
		else{
			let events: Record<string, any> = this.props.events;
			Object.keys(events).forEach((eventName: string) => {
				(this.element as HTMLElement).removeEventListener(eventName, events[eventName]);
			});
		}
	}

	//добавляем события в eventBus - на инициализацию, монтирование, обновление и рендер компонента
	private _registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
		eventBus.on(Block.EVENTS.CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.RENDER, this._render.bind(this));
	}

	//метод для инициализации компонента
	private _init(): void {
		try{
			this.init();
			this.eventBus.emit(Block.EVENTS.RENDER, true);			
		}
		catch(error: any){
			console.log(this.constructor.name, error);
			console.log("Ошибка при инициализации компонента"+ "("+ error.message +")");
			this.eventBus.emit(Block.EVENTS.RENDER, false);
		}
	}

	protected init() {
		return;
	}

	private _componentDidMount(): boolean {
		this.componentDidMount();
		return true;
	}

	//метод для вызова события монтирования компонента
	//может быть переопределен пользователем
	protected componentDidMount(): boolean {
		return true;
	}

	//метод для вызова события монтирования компонента
	//вызывает событие монтирования для компонента и всех его потомков
	public dispatchComponentDidMount() {
		this.eventBus.emit(Block.EVENTS.CDM);
		Object.values(this.children).forEach((child) => {
			if (Array.isArray(child)) {
				child.forEach((ch) => ch.dispatchComponentDidMount());
			} else {
				child.dispatchComponentDidMount();
			}
		});
	}


	//метод для вызова события монтирования компонента
	//вызывает событие монтирования для компонента и всех его потомков
	public dispatchComponentDidUpdate(newProps: any) {
		this.eventBus.emit(Block.EVENTS.CDU, newProps);
		Object.values(this.children).forEach((child) => {
			if (Array.isArray(child)) {
				child.forEach((ch) => {
					ch.dispatchComponentDidUpdate(newProps)
				});
			} else {
				child.dispatchComponentDidUpdate(newProps);
			}
		});
	}

	private _componentDidUpdate(newProps: any): boolean {
		this.componentDidUpdate(newProps);
		return true;
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidUpdate(newProps: any) {
		const t: any= newProps;
		return true || (t && false);
	}


	
	setProps = (nextProps: any) => {
		if (!nextProps) return;
		Object.keys(nextProps).forEach((key) => {
		  this.props[key] = nextProps[key];
		});
	  };


	private _render(isFirstRender: boolean = true, newProps: any = {}) {
		//в DocumentFragment сохраняем результат рендера компонента
		const docFrag: DocumentFragment = this.render();	
		//удаляем события из элемента
		this._removeEvents();
		//получаем первый элемент из DocumentFragment
		const newElem = docFrag.firstElementChild as HTMLElement;
		//если элемент уже существует, то заменяем его на новый
		if (this.element) {
			this.element.replaceWith(newElem);
		}
		this.element = newElem;
		this._addEvents();
		//если ранее компонент был, то срабатывает dispatchComponentDidUpdate для всех потомков
		//иначе - dispatchComponentDidMount
		if(isFirstRender){
			this.dispatchComponentDidMount();
		} else {
			this.dispatchComponentDidUpdate(newProps);
		}
	}

	// Может переопределять пользователь, необязательно трогать
	render(): DocumentFragment {
		//по умолчанию создается пустой DocumentFragment
		return new DocumentFragment();
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

			component.element?.append(...Array.from(stub.childNodes));

			stub.replaceWith(component.element!);
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


	//перед тем, как обновить свойства компоннета эмиттит событие CDU
	private _makePropsProxy(props: any) {
		const block = this;
		return new Proxy(props, {
			set(target, prop, val) {
				target[prop] = val;
				block.eventBus.emit(Block.EVENTS.RENDER, false, {...target});
				return true;
			},
			deleteProperty() {
				throw new Error("Нет доступа");
			}
		});
	}



	//публичный метод чтобы показать компонент
	show() {
		(this.element as HTMLElement).style.display = "block";
	}

	//публичный метод чтобы скрыть компонент
	hide() {
		(this.element as HTMLElement).style.display = "none";
	}
}

