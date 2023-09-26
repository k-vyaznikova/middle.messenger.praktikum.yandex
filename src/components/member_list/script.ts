import {Block} from "/utils/block.ts";
import template from "/components/member_list/template.hbs";
import {MemberShortInfo} from "/components/member_short_info/script";
import {BASE_FILE_URL} from "/utils/constants";

interface MemberListProps{
	member_list: Array<Object>,
	alt_message?: string,
	hideInput: string
}

export class MemberList extends Block {
	constructor(props: MemberListProps) {
		super(props);
	}
	// {{{memberShortInfo id=id memberName = name memberLogin = login memberLink = "#" memberPhoto = "/img/noimgprofile.svg" hiddenInput = "yes"}}}
	protected init(): void {
		this.children.member_list = this.props.member_list.map((member_props) => {
			return new MemberShortInfo({
				id: member_props["id"],
				memberName: member_props["first_name"]+" "+member_props["second_name"],
				memberLogin: member_props["login"],
				memberPhoto: member_props["avatar"]? BASE_FILE_URL + member_props["avatar"] : "/img/noimgprofile.svg",
				hiddenInput: "yes"
			});
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}
