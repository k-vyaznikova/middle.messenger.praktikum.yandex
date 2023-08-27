import Handlebars from "handlebars";
import {registerComponent} from "./utils/register_component.ts";

import {Form} from "/components/form/script.ts";
import {SecondaryBtn} from "/components/secondary_btn/script.js";
import {Input} from "/components/input/script.js";
import {SubmitBtn} from "/components/submit_btn/script.ts";
import {Search} from "/components/search/script.ts";
import {ContactItem} from "/components/contact_item/script.ts";
import {ContactList} from "/components/contact_list/script.ts";
import {ChatInfo} from "/components/chat_info/script.ts";
import {DateMsg} from "/components/date_msg/script.ts";
import {IncomingMsg} from "/components/incoming_msg/script.ts";
import {OutgoingMsg} from "/components/outgoing_msg/script.ts";
import {Dialog} from "/components/dialog/script.ts";
import {SendMsgForm} from "/components/send_msg_form/script.ts";
import {ProfilePhoto} from "/components/profile_photo/script.ts";
import {ProfileItem} from "/components/profile_item/script.ts";
import {ProfileForm} from "/components/profile_form/script.ts";
import {CommunityProfile} from "/components/community_profile/script.ts";
import {MemberShortInfo} from "/components/member_short_info/script.ts";
import {MemberList} from "/components/member_list/script.ts";

import {renderPage} from "/utils/render_page.ts";


import cardpage from "/layouts/cardpage/cardpage.ts";
import leftside from "/layouts/chatpage/leftside/leftside.ts";
import rightside from "/layouts/chatpage/rightside/rightside.ts";
import defpage from "/layouts/defpage/defpage.ts";
import popup from "/layouts/popup/popup.ts";
import profpage from "/layouts/profpage/profpage.ts";
import ifEq from "/utils/ifequal.ts";


registerComponent("Form", Form);
registerComponent("SecondaryBtn", SecondaryBtn);
registerComponent("Input", Input);
registerComponent("SubmitBtn", SubmitBtn);
registerComponent("Search", Search);
registerComponent("ContactItem", ContactItem);
registerComponent("ContactList", ContactList);
registerComponent("ChatInfo", ChatInfo);
registerComponent("DateMsg", DateMsg);
registerComponent("IncomingMsg", IncomingMsg);
registerComponent("OutgoingMsg", OutgoingMsg);
registerComponent("Dialog", Dialog);
registerComponent("SendMsgForm", SendMsgForm);
registerComponent("ProfilePhoto", ProfilePhoto);
registerComponent("ProfileItem", ProfileItem);
registerComponent("ProfileForm", ProfileForm);
registerComponent("CommunityProfile", CommunityProfile);
registerComponent("MemberList", MemberList);
registerComponent("MemberShortInfo", MemberShortInfo);

// регистрация helpers
Handlebars.registerHelper("cardpage", cardpage);
Handlebars.registerHelper("leftside", leftside);
Handlebars.registerHelper("rightside", rightside);
Handlebars.registerHelper("defpage", defpage);
Handlebars.registerHelper("popup", popup);
Handlebars.registerHelper("profpage", profpage);
Handlebars.registerHelper("ifEq", ifEq);

window.addEventListener("DOMContentLoaded", () => {
	renderPage("chat");
});

