import {EventBus} from "/utils/event_bus.ts";
import {Block} from "/utils/block.ts";
import {set, isEqual, PlainObject} from "/utils/store_utils.ts";
import {User} from "/api/auth-api.ts";

const STORE_EVENTS = {
	UPDATED: "updated"
};

interface State {
    user: User
}

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
export class Store extends EventBus {
	private state: any = {};
	constructor() {
		super();
	}

	public set(path: string, value: unknown) {
		set(this.state, path, value);
		this.emit(STORE_EVENTS.UPDATED, this.getState());
	}

	public getState() {
		return this.state;
	}
}

const store = new Store();

export function withStore<SP>(mapStateToProps: (state: State) => SP) {
	return function wrap<P>(Component: typeof Block) {
		return class WithStore extends Component {
			private onStoreUpdate: () => void;
			constructor(props: Omit<P, keyof SP>) {
				const previousState = mapStateToProps(store.getState());
				console.log(previousState);
				super({...props, ...previousState});
				this.onStoreUpdate = () => {
					console.log("onStoreUpdate:::::::::::");
					/* const stateProps = mapStateToProps(store.getState());

					// if (isEqual(stateProps as PlainObject, previousState as PlainObject))
					// return;
					previousState = stateProps;
					//console.log(previousStates);
					this.setProps({...stateProps});*/
				};
				store.on(STORE_EVENTS.UPDATED, this.onStoreUpdate);
			}

			componentWillUnmount() {
				// store.off(STORE_EVENTS.UPDATED, this.onStoreUpdate);
			}
		};
	};
}

export default store;
