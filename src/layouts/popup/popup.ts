import type {THelperOptions} from 'handlebars';
export default function popup(this: object, options: THelperOptions): string {
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
