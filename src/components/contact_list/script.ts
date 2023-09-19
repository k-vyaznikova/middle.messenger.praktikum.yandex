import {Block} from "/utils/block.ts";
import template from "/components/contact_list/template.hbs";
import {withStore} from "/utils/store.ts";
import ChatsController from "/controllers/chats-controller.ts";
import {ContactItem} from "/components/contact_item/script.ts";

interface ContactListProps{
	is_loaded: string,
	contacts: ContactItem[]
}


export class ContactListInitial extends Block {
	constructor(props: ContactListProps) {
		super({
			...props/* ,
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
			}*/
		});
	}

	protected init(): void {
		this.children.contacts = this._prepareContactList(this.props.chats);
	}

	componentDidUpdate(oldProps: any, newProps: any): boolean {
		this.children.contacts = this._prepareContactList(newProps.chats);

		return true;
	}

	_setContactList(chats: Array<any>) {

	}


	_getDialog(chatID: number) {
	}

	private _prepareContactList(chats: Array<any>) {
		return chats.map(function(item: any) {
			return new ContactItem({
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
			});
		});
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

const withChats = withStore((state) => ({chats: [...(state?.chats || [])]}));

export const ContactList = withChats(ContactListInitial);


