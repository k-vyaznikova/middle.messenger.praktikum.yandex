/*import type {HelperOptions} from "handlebars";
export default function popup(this: object, options: HelperOptions): string {
	return ` 
    <div class = 'popup-block-invis ${options.hash.classVisibility}'>
        <div class = 'popup-block-container'>
            <div class = 'popup-block'>
                <div class = 'close-block'>
                    <div class = 'close'>&times;</div>
                </div>
                ${options.fn(this)}
            </div> 
        </div>
        <div class = 'background-popup'></div>
    </div>
    `;
}
*/
import {Block} from "/utils/block.ts";
import template from "/layouts/popup/popup.hbs";

interface PopupProps {
    classVisibility: string,
    content: Block
}

export default class Popup extends Block {
    constructor(props: PopupProps){
        super(props);
    }
  render() {
    console.log("---in render popup---");
    console.log(this.props)
    return this.compile(template, this.props);
  }
}