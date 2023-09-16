import {Block} from "/utils/block.ts";
import template from "/components/contact_list/template.hbs";
import {withStore} from "/utils/store.ts";
import ChatsController from "/controllers/chats-controller.ts";


interface ContactListProps{
	is_loaded: string,
	contacts: Array<Object>,
	ref: string,
	onClick: (event: Event) => void,
	onKeyup: () => void,
}
export class ContactListInitial extends Block {
	constructor(props: ContactListProps) {
		super({
			...props,
			onKeyup: async () => {
				const newProps: Record<string, any> = await this.searchUsers(this.search_value);
				this.setProps({
					...newProps,
					value: this.search_value
				});
				if (this.searchInput) {
					this.searchInput.focus();
					this.searchInput.selectionStart = this.searchInput.selectionEnd = this.searchInput.value.length;
				}
			}
		});
	}

	protected init(): void {
		this._setContactList(this.props.chats as Array<any>);
	}

	_setContactList(chats: Array<any>) {
		const contactList: Array<any> = this._prepareChatList(chats);
		this.setProps({
			contacts: contactList
		});
	}


	_getDialog(chatID: number) {
	}

	private _prepareChatList(oldChatList: Array<any>) {
		return oldChatList.map(function(item: any) {
			return {
				id: item["id"],
				contactName: item["title"],
				contactImg: item["avatar"],
				yourMsg: "yes",
				contactMsg: item["last_message"]? item["last_message"]["content"] : "",
				contactTimeMsg: item["last_message"]? item["last_message"]["time"] : "",
				contactQMsg: item["unread_count"],
				ref: "contact_"+item["id"],
				onClick: () => {
					ChatsController.selectChat(item["id"]);
				}
			};
		});
	}


	componentDidUpdate(): boolean {
		return true;
	}


	private get searchInput(): HTMLInputElement | null {
		return (this.element as HTMLElement).querySelector("input.search-input");
	}
	private get search_value() {
		return (this.searchInput as HTMLInputElement).value;
	}

	render() {
		return this.compile(template, this.props);
	}
}

const withChats = withStore((state) => ({chats: [...(state.chats || [])]}));

export const ContactList = withChats(ContactListInitial);


