import {Block} from "/utils/block.ts";
import template from "/components/photo_view/template.hbs";

interface PhotoViewProps{
	profilePhoto: string,
	profileAlt: string,
	events?:{
		click?: () => void,
		mouseover: () => void,
		mouseleave: () => void
	}
}

export class PhotoView extends Block {
	constructor(props: PhotoViewProps) {
		super({
			...props,
			events: {
				mouseover: () => {
					this.element?.querySelector(".change-avatar")?.classList.remove("invis");
				},
				mouseleave: () => {
					this.element?.querySelector(".change-avatar")?.classList.add("invis");
				},
				click: () => {
					
				}
			}
		});
	}

	init(){
		
	}
	render() {
		return this.compile(template, this.props);
	}
}
