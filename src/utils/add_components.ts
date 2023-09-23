import {registerComponent} from "/utils/register_component.ts";
//import {Form} from "/components/form/script.ts";
//import {Input} from "/components/input/script.js";
//import {SubmitBtn} from "/components/submit_btn/script.ts";
import {Search} from "/components/search/script.ts";
// import {ContactItem} from "/components/contact_item/script.ts";
// import {ContactList} from "/components/contact_list/script.ts";
import {ChatInfo} from "/components/chat_info/script.ts";
import {DateMsg} from "/components/date_msg/script.ts";
import {IncomingMsg} from "/components/incoming_msg/script.ts";
import {OutgoingMsg} from "/components/outgoing_msg/script.ts";
// import {Dialog} from "/components/dialog/script.ts";
import {ProfilePhoto} from "/components/profile_photo/script.ts";
import {ProfileItem} from "/components/profile_item/script.ts";
import {ProfileForm} from "/components/profile_form/script.ts";
import {ChatProfile} from "../components/chat_profile/script";
import {MemberShortInfo} from "/components/member_short_info/script.ts";
import {MemberList} from "/components/member_list/script.ts";
import {SendMsgBtn} from "/components/send_msg_btn/script.ts";
import {SendMsgText} from "/components/send_msg_text/script.ts";
import {SendMsgFile} from "/components/send_msg_file/script.ts";
import {SendMsgForm} from "/components/send_msg_form/script.ts";
import {ProfilePersonalLink} from "/components/profile_personal_link/script.ts";
import {BackLink} from "/components/back_link/script.ts";
import {Error} from "/components/error/script.ts";
import {Link} from "/components/link/script.ts";
import {ErrorMsg} from "/components/error_msg/script.ts";
import {LogoutBtn} from "/components/logout_btn/script.ts";
import {UserSearch} from "/components/user_search/script.ts";

import {ProfPageLayout} from "/layouts/profpage/script.ts";
import {InnerLayout} from "/layouts/inner/script.ts";


export default function addComponents() {
	//registerComponent("Form", Form);
	//registerComponent("Input", Input);
	//registerComponent("SubmitBtn", SubmitBtn);
	registerComponent("Search", Search);
	// registerComponent("ContactItem", ContactItem);
	// registerComponent("ContactList", ContactList);
	registerComponent("ChatInfo", ChatInfo);
	registerComponent("DateMsg", DateMsg);
	registerComponent("IncomingMsg", IncomingMsg);
	registerComponent("OutgoingMsg", OutgoingMsg);
	// registerComponent("Dialog", Dialog);
	registerComponent("SendMsgForm", SendMsgForm);
	registerComponent("ProfilePhoto", ProfilePhoto);
	registerComponent("ProfileItem", ProfileItem);
	registerComponent("ProfileForm", ProfileForm);
	registerComponent("ChatProfile", ChatProfile);
	registerComponent("MemberList", MemberList);
	registerComponent("MemberShortInfo", MemberShortInfo);
	registerComponent("SendMsgBtn", SendMsgBtn);
	registerComponent("SendMsgFile", SendMsgFile);
	registerComponent("SendMsgText", SendMsgText);
	registerComponent("ProfilePersonalLink", ProfilePersonalLink);
	registerComponent("BackLink", BackLink);
	registerComponent("Error", Error);
	registerComponent("Link", Link);
	registerComponent("ErrorMsg", ErrorMsg);
	registerComponent("LogoutBtn", LogoutBtn);
	registerComponent("UserSearch", UserSearch);
	registerComponent("ProfPageLayout", ProfPageLayout);
	registerComponent("InnerLayout", InnerLayout);
}
