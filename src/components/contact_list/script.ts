import {Block} from "/utils/block.ts";
import template from "/components/contact_list/template.hbs";
import {withStore} from "/utils/store.ts";
import ChatsController from "/controllers/chats-controller.ts";
import {ContactItem, ContactItemProps} from "/components/contact_item/script.ts";
import {formattedTime} from "/utils/date_utils.ts";

interface ContactListProps{
	is_loaded: string,
	contacts: ContactItem[]
}


export class ContactListInitial extends Block {
	constructor(props: ContactListProps) {
		super(props);
	}

	protected init(): void {
		this.children.contacts = this._prepareContactList(this.props.chats as any);
	}

	componentDidUpdate(oldProps: any, newProps: any): boolean {
		this.children.contacts = this._prepareContactList(newProps.chats);
		return true;
	}

	private _prepareContactList(chats: Array<any>): any {
		const that: any = this;
		return chats.map(function(item: any) {
			const props: Record<string, any> = {
				id: item["id"],
				contactName: item["title"],
				contactImg: item["avatar"],
				yourMsg: "yes",
				contactMsg: item["last_message"]? item["last_message"]["content"] : "",
				contactTimeMsg: item["last_message"]? formattedTime(item["last_message"]["time"]) : "",
				onClick: (contact: ContactItem) => {
					ChatsController.selectChat(item["id"]);
					that.children.contacts.forEach((element: any) => {
						element.setProps({
							contactSelected: element.props.id == contact.props.id? "yes" : ""
						});
					});
				}
			};
			if (item["unread_count"] > 0)
				props.contactQMsg = item["unread_count"];
			return new ContactItem(props as ContactItemProps);
		});
	}

	render() {
		return this.compile(template, this.props);
	}
}

const withChats = withStore((state: any) => ({chats: [...(state?.chats || [])]}));

export const ContactList = withChats(ContactListInitial);


