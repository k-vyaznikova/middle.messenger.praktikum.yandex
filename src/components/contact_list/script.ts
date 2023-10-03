import {Block} from "/utils/block.ts";
import template from "/components/contact_list/template.hbs";
import {withStore} from "/utils/store.ts";
import ChatsController from "/controllers/chats-controller.ts";
import {ContactItem} from "/components/contact_item/script.ts";
import {formattedTime} from "/utils/date_utils.ts";

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
		// console.log("IN componentDidUpdate");
		// console.log(newProps);
		this.children.contacts = this._prepareContactList(newProps.chats);
		return true;
	}

	_setContactList(chats: Array<any>) {

	}

	private _prepareContactList(chats: Array<any>) {
		const that: any = this;
		return chats.map(function(item: any) {
			const props: Record<string, any> = {
				id: item["id"],
				contactName: item["title"],
				contactImg: item["avatar"],
				yourMsg: "yes",
				contactMsg: item["last_message"]? item["last_message"]["content"] : "",
				contactTimeMsg: item["last_message"]? formattedTime(item["last_message"]["time"]) : "",
				// ref: "chat_"+item["id"],
				// contactSelected: item[]
				onClick: (contact: ContactItem) => {
					ChatsController.selectChat(item["id"]);
					that.children.contacts.forEach((element) => {
						console.log(element.props.id + " = "+ contact.props.id);
						element.setProps({
							contactSelected: element.props.id == contact.props.id? "yes" : ""
						});
					});
				}
			};
			if (item["unread_count"] > 0)
				props.contactQMsg = item["unread_count"];
			return new ContactItem(props);
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


