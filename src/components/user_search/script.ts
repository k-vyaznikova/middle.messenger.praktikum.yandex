import {Block} from "/utils/block.ts";
import template from "/components/user_search/template.hbs";
import UserController from "/controllers/user-controller";

interface UserSearchProps{
    value: string,
	results?: Array<any>,
    alt_message?: string,
    onKeyup: () => void,
	onClick: () => void
}

export class UserSearch extends Block {
	constructor(props: UserSearchProps) {
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
	protected async init() {
		this.setProps(await this.searchUsers(""));
	}

	private async searchUsers(login: string) {
		const defaultResults: Array<any> = await UserController.search(login);
		const newProps: Record<string, any> = {
			results: this.addUserEvents(defaultResults)
		};
		if (defaultResults.length <= 0)
			newProps["alt_message"] = "Пока нет участников.";
		return newProps;
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
