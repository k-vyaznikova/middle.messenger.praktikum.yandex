import {Block} from "/utils/block.ts";
export function getFormData(form: Block) {
	const formData: Record<string, string> = {};
	Object.keys(form.refs).forEach((key) => {
		const field: HTMLInputElement = form.refs[key]?.getContent()?.querySelector("input, textarea") as HTMLInputElement;
		const name: string = field?.name;
		const value: string = field?.value;
		formData[name] = value;
	});
	return true;
}
