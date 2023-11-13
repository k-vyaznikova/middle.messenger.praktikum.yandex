import {Block} from "/utils/block.ts";
import template from "/components/photo_view/template.hbs";
// import {withStore} from "/utils/store";
// import {BASE_FILE_URL} from "/utils/constants";

interface PhotoViewProps{
	profilePhoto: string,
	profileAlt: string,
	events?:{
		click?: (event: Event) => void,
		mouseover?: () => void,
		mouseleave?: () => void
	}
}

export class PhotoView extends Block {
	constructor(props: PhotoViewProps) {
		super(props);
	}

	init() {

	}
	render() {
		return this.compile(template, this.props);
	}
}

/*
const withAvatar = withStore((state) => ({...{profilePhoto: state.user.avatar? BASE_FILE_URL+state.user.avatar : "/img/noimgprofile.svg"}}));
export const PhotoView = withAvatar(PhotoViewInitial);

*/
