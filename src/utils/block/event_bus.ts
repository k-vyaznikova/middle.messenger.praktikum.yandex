export class EventBus {
	//массив для хранения подписок на события
	private listeners: Record<string, Function[]>;


	constructor() {
		this.listeners = {};
	}


	//метод для подписки на событие
	public on(event: string, callback: Function): void {
		//если у компонента пока нет подпи
		if (!(event in this.listeners)) {
			this.listeners[event] = [];
		}
		this.listeners[event].push(callback);
	}

	//метод для отписки от события
	public off(event: string, callback: Function) {
		if (!(event in this.listeners)) {
			throw new Error(`У компонента нет события: ${event}`);
		}

		this.listeners[event] = this.listeners[event].filter(
			(listener) => listener !== callback
		);
	}
	//испускает события. Если события нет, то ничего не делает.
	public emit(event: string, ...args: any) {
		if (!this.listeners[event]) {
			return;
		}
		this.listeners[event]!.forEach(function(listener) {
			listener(...args);
		});
	}
}
