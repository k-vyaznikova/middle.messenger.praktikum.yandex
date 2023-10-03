import {Block} from "/utils/block.ts";
import template from "/components/member_list/template.hbs";
import {MemberShortInfo} from "/components/member_short_info/script";
import {BASE_FILE_URL} from "/utils/constants";

interface MemberListProps{
	member_list: Array<Object>,
	alt_message?: string,
	hideInput: string,
	deleteUsers?: ()=>void,
	addUsers?: () => void,
	editMode?: boolean,
	template?: string
}

export class MemberList extends Block {
	constructor(props: MemberListProps) {
		super(props);
	}
	// {{{memberShortInfo id=id memberName = name memberLogin = login memberLink = "#" memberPhoto = "/img/noimgprofile.svg" hiddenInput = "yes"}}}

	protected init(): void {
		this.children.members = this._prepareMemberList(this.props.member_list);
	}

	componentDidUpdate(oldProps: any, newProps: any): boolean {
		this.children.members = this._prepareMemberList(newProps.member_list);
		return true;
	}

	_prepareMemberList(membersProps: Array<any>) {
		const members: MemberShortInfo[] = membersProps.map((props) => {
			return new MemberShortInfo({
				id: props["id"],
				memberName: props["first_name"]+" "+props["second_name"],
				memberLogin: props["login"],
				memberPhoto: props["avatar"]? BASE_FILE_URL + props["avatar"] : "/img/noimgprofile.svg",
				hiddenInput: "yes",
				memberDelete: (props["delete_allow"] && this.props.editMode)? "yes" : "",
				onClick: this.props.deleteUser ? this.props.deleteUser : undefined
			});
		});
		return members;
	}

	render() {
		return this.compile(this.props.template? this.props.template : template, this.props);
	}
}
