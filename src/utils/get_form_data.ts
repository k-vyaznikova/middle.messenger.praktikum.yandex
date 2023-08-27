import {Block} from "/utils/block.ts";
export function getFormData(form: Block) {
	const formData: Record<string, string>= {};
	Object.keys(form.refs).forEach((key) => {
		const index: string = form.refs[key].props.name as string;
		if (index)
			formData[index] = form.refs[key].props.value as string;
	});
	console.log(formData);
	return true;
}
