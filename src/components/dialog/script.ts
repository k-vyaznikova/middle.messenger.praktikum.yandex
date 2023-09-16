import {Block} from "/utils/block.ts";
import template from "/components/dialog/template.hbs";
import store, {withStore} from "/utils/store.ts";


interface DialogProps{
	dialog?: Array<Object>
}
export class DialogInitial extends Block {
	constructor(props: DialogProps) {
		super(props);
	}

	protected init(): void {
		console.log("MSG in CHAT");
		console.log(this.props.messages);
	}


	render() {
		return this.compile(template, this.props);
	}
}

const withSelectedChatMessages = withStore((state) => {
	const selectedChatId = state.selectedChat;
	if (!selectedChatId) {
	  return {
			messages: [],
			selectedChat: undefined,
			userId: state.user.id
		// userId: 1345495
	  };
	}
  	return {
	  messages: (state.messages || {})[selectedChatId] || [],
	  selectedChat: state.selectedChat,
	  userId: state.user.id
	};
});

export const Dialog = withSelectedChatMessages(DialogInitial);
