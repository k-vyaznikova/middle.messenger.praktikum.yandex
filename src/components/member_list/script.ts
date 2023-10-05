import {Block} from "/utils/block.ts";
import template from "/components/member_list/template.hbs";
import {MemberShortInfo} from "/components/member_short_info/script";
import {BASE_FILE_URL} from "/utils/constants";
import img from "/img/noimgprofile.svg";

interface MemberListProps{
	member_list: Array<Object>,
	alt_message?: string,
	hideInput: string,
	deleteUser?: ()=>void,
	addUsers?: () => void,
	editMode?: boolean,
	template?: string
}

export class MemberList extends Block {
	constructor(props: MemberListProps) {
		super(props);
	}

	protected init(): void {
		this.children.members = this._prepareMemberList(this.props.member_list as Array<any>);
	}

	componentDidUpdate(newProps: any): boolean {
		this.children.members = this._prepareMemberList(newProps.member_list);
		return true;
	}

	_prepareMemberList(membersProps: Array<any>): any {
		const members: MemberShortInfo[] = membersProps.map((props) => {
			return new MemberShortInfo({
				id: props["id"],
				memberName: props["first_name"]+" "+props["second_name"],
				memberLogin: props["login"],
				memberPhoto: props["avatar"]? BASE_FILE_URL + props["avatar"] : img,
				hiddenInput: "yes",
				memberDelete: (props["delete_allow"] && this.props.editMode)? "yes" : "",
				onClick: this.props.deleteUser ? (this.props.deleteUser as ()=>void) : undefined
			});
		});
		return members;
	}

	render() {
		return this.compile(template, this.props);
	}
}
