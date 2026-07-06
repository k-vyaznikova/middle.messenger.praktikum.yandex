import {Block} from "../../utils/block/block";
import template from "./template.hbs";
import {withStore} from "../../utils/store/store";
import {Message as MessageInfo} from "/controllers/messages-controller.ts";
import store from "../../utils/store/store";


interface МеssengerProps{
	selectedChat: number | undefined;
	messages: MessageInfo[];
	userId: number;
}

export class MessengerInitial extends Block {
	constructor(props: МеssengerProps) {
		super(props);
	}

	protected init(): void {

		return;
	}

	

	render() {
		return this.compile(template, this.props);
	}
}

const withMessenger = withStore((state: Record<string, any>) => {
	const selectedChatId: number = state?.selectedChat as number;
	if (!selectedChatId) {
		return {
			messages: [],
			selectedChat: undefined,
			userId: state.user?.id
		};
	}
	return {
		messages: [...(state?.messages || {})[selectedChatId] || []],
		selectedChat: state?.selectedChat,
		userId: state.user?.id
	};
});

export const Messenger = withMessenger(MessengerInitial);