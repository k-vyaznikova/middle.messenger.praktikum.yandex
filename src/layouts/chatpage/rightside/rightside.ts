import type {THelperOptions} from 'handlebars';
export default function rightside(this: object, options: THelperOptions): string {
	return `
    <div class = "right-side">
        <div class = "right-side-content">
            ${options.fn(this)}
        </div>
    </div>
    `;
}
