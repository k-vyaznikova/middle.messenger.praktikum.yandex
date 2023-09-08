export class EventBus {
	private listeners: {
		[key: string]: Function[]
	};
	constructor() {
		this.listeners = {};
	}

	public on(event: string, callback: Function): void {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback);
		/* if(event === "updated"){
			console.log("........");
			console.log(this);

				console.log(this.listeners);
		}*/
	}

	public off(event: string, callback: Function) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event] = this.listeners[event].filter(
			(listener) => listener !== callback
		);
	}

	public emit(event: string, ...args: any) {
		if (event == "updated") {
			console.log("========");
			console.log("this.listeners: ");
			console.log(this.listeners);
			console.log("Object.keys(this.listeners).length: ");
			console.log(Object.keys(this.listeners).length);
			console.log('this.listeners["updated"]: ');
			console.log(this.listeners["updated"]);
			console.log("========");
		}
		if (!this.listeners[event]) {
			return;
		}
		this.listeners[event]!.forEach(function(listener) {
			listener(...args);
		});
	}
}
