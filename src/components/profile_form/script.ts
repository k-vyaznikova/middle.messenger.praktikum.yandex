import {Block} from "/utils/block.ts";
import template from "/components/profile_form/template.hbs";
import {SubmitBtnProps} from "/types/common_types.ts";
import {ProfileItem} from "/components/profile_item/script";
import {ProfileItemProps} from "/types/common_types.ts";
import {SubmitBtn} from "/components/submit_btn/script";
import {Link} from "/components/link/script";
import {LogoutBtn} from "/components/logout_btn/script";
import {ProfilePhoto} from "/components/profile_photo/script.ts";
import {BASE_FILE_URL} from "/utils/constants.ts";
import {ResultValidate} from "/types/common_types.ts";
import UserController from "/controllers/user-controller.ts";
import {withStore} from "/utils/store";
import {checkError} from "/utils/form_utils";
import {ErrorMsg} from "/components/error_msg/script";
import img from "/img/noimgprofile.svg";

interface ProfileFormProps{
	title: string,
	profilePhoto?: {
		profileImg: string,
		profileAlt: string
	},
	profile_items: ProfileItemProps[],

	edit_mode?: string,
	submit_btn: SubmitBtnProps,
	footer_links?: string,
	profile_avatar?: string,
	success_msg?: string

}

export class ProfileFormInitial extends Block {
	constructor(props: ProfileFormProps) {
		super(props);
	}
	protected init(): void {
		this.children.profile_items = ((this.props.profile_items as ProfileItemProps[]).map((props: ProfileItemProps): ProfileItem => {
			return new ProfileItem(props);
		})) as any;
		this.children.profilePhoto = new ProfilePhoto({
			profilePhoto: (this.props.profilePhoto as Record<string, string>).profileImg as string,
			profileAlt: "Фото профиля",
			uploadFunc: this.uploadAvatar,
			allowEdit: this.props.allowEdit as string
		});

		this.children.errorMsg = new ErrorMsg({
			text: ""
		});

		this.children.submitBtn = new SubmitBtn({
			text: "Сохранить изменения",
			onClick: async (event: Event) => {
				event.preventDefault();
				let resultValid: boolean = true;
				(this.children.profile_items as unknown as Array<any>).forEach((item: ProfileItem) => {
					if (!checkError(
						item.value,
						item.props.validate_type as string,
						item
					) && resultValid)
						resultValid = false;
				});
				if (resultValid) {
					const dataPair: Array<any> = (this.children.profile_items as unknown as Array<any>).map(function(input: Record<string, string>) {
						return [input.name, input.value];
					});
					const data = Object.fromEntries(dataPair);
					console.log(data);
					const res: ResultValidate = await UserController.updateProfile(data);
					if (!res.is_ok)
						this.children.errorMsg.setProps({
							text: res.msg_text
						});
					else
						this.setProps({
							success_msg: "Изменения успешно сохранены"
						});
				}
			}
		});
		if (this.props.footer_links) {
			this.children.link_1 = new Link({
				href: "/profile-edit",
				name: "Изменить данные"
			});
			this.children.link_2 = new Link({
				href: "/pass-edit",
				name: "Изменить пароль"
			});
			this.children.logoutBtn = new LogoutBtn({
				text: "Выйти"
			});
		}
	}

	componentDidUpdate(newProps: any): boolean {
		this.children.profilePhoto = new ProfilePhoto({
			profilePhoto: newProps.profilePhoto.profileImg,
			profileAlt: "Фото профиля",
			uploadFunc: this.uploadAvatar,
			allowEdit: "yes"
		});
		return true;
	}

	async uploadAvatar(form: HTMLFormElement) {
		const result: ResultValidate = await UserController.uploadAvatar(new FormData(form as HTMLFormElement));
		return result;
	}

	render() {
		return this.compile(template, this.props);
	}
}

const withAvatar = withStore((state) => ({...{profilePhoto: {profileImg: state.user.avatar? BASE_FILE_URL + state.user.avatar : img}}}));
export const ProfileForm = withAvatar(ProfileFormInitial);
