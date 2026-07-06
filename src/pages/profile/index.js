import { withStore } from "../../utils/store/store";
import {ProfilePageInit} from "./script";
const withUser = withStore((state) => ({...{user: state.user}}));
const ProfilePage = withUser(ProfilePageInit);
export default ProfilePage;