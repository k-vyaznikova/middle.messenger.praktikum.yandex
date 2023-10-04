import {Block} from "/utils/block.ts";
import template from "/components/user_search/template.hbs";
import UserController from "/controllers/user-controller";
import {Search} from "/components/search/script";
import {MemberShortInfo} from "/components/member_short_info/script";
import {withStore} from "/utils/store";
import {BASE_FILE_URL} from "/utils/constants";

interface UserSearchProps{
    value?: string,
    alt_message?: string,
	search_results?:{
		search_word: string,
		users: Array<any>
	}
    onKeyup?: () => void,
	addUser?: () => void
}

export class UserSearchInitial extends Block {
	constructor(props: UserSearchProps) {
		super({
			...props,
			onKeyup: async () => {
				await UserController.search(this.search_value);
			}

		});
	}
	async init() {
		this.children.search = new Search({
			placeholder: "Начните вводить логин участника...",
			left_align: "yes",
			not_focused: "yes",
			value: (this.props.search_results as Record<string, any>).search_word,
			onKeyup: this.props.onKeyup as () => void
		});
		this.children.results = this._formResults((this.props.search_results as Record<string, any>).users);
	}

	componentDidUpdate(oldProps: any, newProps: any): boolean {
		this.children.search = new Search({
			placeholder: "Начните вводить логин участника...",
			left_align: "yes",
			not_focused: "yes",
			value: newProps?.search_results?.search_word,
			onKeyup: this.props.onKeyup as () => void
		});
		this.children.results = this._formResults(newProps.search_results?.users);
		return true;
	}


	private _formResults(propsMembers: Array<any>): any {
		if (propsMembers.length > 0) {
			return propsMembers.map((userProps: Record<string, any>) => {
				return new MemberShortInfo({
					id: userProps["id"],
					memberPhoto: userProps["avatar"]? BASE_FILE_URL+userProps["avatar"] : "/img/noimgprofile.svg",
					memberLogin: userProps["login"],
					memberName: userProps["first_name"]+ " " + userProps["second_name"],
					memberAdd: "yes",
					onClick: this.props.addUser as () => void
				});
			});
		}
		return [];
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


const withSearchResult = withStore((state: Record<string, any>) => {
	if (state?.search_results)
		return {...{search_results: state?.search_results}
		};
	else
		return {
			...{search_results: {
				users: [],
				search_word: ""
			}}
		};
});
export const UserSearch = withSearchResult(UserSearchInitial);


