import { withStore } from "../../utils/store/store";
import {CreateChatInitPage} from "./script";
const withChat = withStore((state) => ({
    chats: state.chats ?? [],
    user_list: state.user_list ?? [],
}));
const CreateChatPage = withChat(CreateChatInitPage);
export default CreateChatPage;