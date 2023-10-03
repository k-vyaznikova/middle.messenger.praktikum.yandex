import {Block} from "/utils/block.ts";
import template from "/components/user_search/template.hbs";
import UserController from "/controllers/user-controller";
import {Search} from "/components/search/script";
import {MemberShortInfo} from "/components/member_short_info/script";
import {withStore} from "/utils/store";
import {BASE_FILE_URL} from "/utils/constants";

interface UserSearchProps{
    value?: string,
	search_results?: Array<any>,
    alt_message?: string,
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
			value: this.props?.search_results?.search_word,
			onKeyup: this.props.onKeyup
		});
		this.children.results = this._formResults(this.props?.search_results?.users);
	}

	componentDidUpdate(oldProps: any, newProps: any): boolean {
		this.children.search = new Search({
			placeholder: "Начните вводить логин участника...",
			left_align: "yes",
			not_focused: "yes",
			value: newProps?.search_results?.search_word,
			onKeyup: this.props.onKeyup
		});
		this.children.results = this._formResults(newProps.search_results?.users);
		return true;
	}


	private _formResults(props_members: Array<any>): MemberShortInfo[] {
		if (props_members.length > 0) {
			return props_members.map((user_props) => {
				return new MemberShortInfo({
					id: user_props["id"],
					memberPhoto: user_props["avatar"]? BASE_FILE_URL+user_props["avatar"] : "/img/noimgprofile.svg",
					memberLogin: user_props["login"],
					memberName: user_props["first_name"]+ " " + user_props["second_name"],
					memberAdd: "yes",
					onClick: this.props.addUser
				});
			});
		}
		return [];
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


const withSearchResult = withStore((state) => {
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


