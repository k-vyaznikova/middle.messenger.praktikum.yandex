import {Block} from "/utils/block.ts";
import template from "/components/user_search/template.hbs";
import UserController from "/controllers/user-controller";
import {Search} from "/components/search/script";
import {MemberShortInfo} from "../member_short_info/script";

interface UserSearchProps{
    value?: string,
	results?: Array<any>,
    alt_message?: string,
    onKeyup?: () => void,
	onClick?: () => void
}

export class UserSearch extends Block {
	constructor(props: UserSearchProps) {
		super({
			...props,
			onKeyup: async () => {
				await this.searchUsers(this.search_value);
				this._componentsInit("TEST");

				/* console.log(this.search_value);
				this.setProps({
					...newProps,
					value: this.search_value
				});*/
				if (this.searchInput) {
					this.searchInput.focus();
					this.searchInput.selectionStart = this.searchInput.selectionEnd = this.searchInput.value.length;
				}
			}

		});
	}
	async init() {
		this._componentsInit("");
	}

	/* async componentDidUpdate(oldProps: any, newProps: any): boolean {
		this._componentsInit(newProps["value"]);
	}*/


	private async _componentsInit(value: string): void {
		console.log("in _componentInit" + value);
		this.children.search = new Search({
			placeholder: "Начните вводить логин участника...",
			left_align: "yes",
			not_focused: "yes",
			value: value,
			onKeyup: this.props["onKeyup"]
		});

		if (value) {
			const users = await this.searchUsers(value);
			if (users.length > 0) {
				this.children.results = users.map((user_props) => {
					new MemberShortInfo({
						id: user_props["id"],
						memberPhoto: user_props["avatar"],
						memberLogin: user_props["login"],
						memberName: user_props["first_name"]+ " " + user_props["second_name"],
						memberAdd: "yes"
					});
				});
			} else {
				this.setProps({
					alt_message: "Начните вводить логин пользователя."
				 });
			}
		} else {
			 this.setProps({
				alt_message: "Не найдено ни одного участника."
			 });
		}
	}

	private async searchUsers(login: string) {
		const users: Array<any> = await UserController.search(login);
		return users;
	}

	private addUserEvents(users: Array<Record<string, any>>) {
		const that: any = this;
		return users.map(function(item: Record<string, any>) {
			return {
				...item,
				onClick: that.props.addUser
			};
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
