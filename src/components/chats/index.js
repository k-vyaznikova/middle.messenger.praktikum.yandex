import { withStore } from "../../utils/store/store";
import {ChatsInitial} from "./script";
const withChats = withStore((state) => ({...{chats: state.chats}}));
const Chats = withChats(ChatsInitial);
export default Chats;