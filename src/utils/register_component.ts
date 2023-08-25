import Handlebars from "handlebars";
import {HelperOptions} from "handlebars";
import {Block} from "/utils/block.ts";

export function registerComponent(name: string, Component: Block) {
	if (name in Handlebars.helpers) {
		throw `The ${name} component is already registered!`;
	}

	Handlebars.registerHelper(name, function(this: unknown, {hash, data, fn}: HelperOptions) {
		console.log("---data---");
		console.log(data);
		//console.log(hash);
		
		const component = new Component(hash);
		const dataAttribute = `data-id="${component.id}"`;
		if ("ref" in hash) {
			if (!data.root.__refs)
				data.root.__refs = [];
			data.root.__refs[hash.ref] = component;
			console.log("++++++++");
			console.log(data.root.__refs);
		}
		if (!data.root.__children)
			data.root.__children = [];
		data.root.__children.push({
			component,
			embed(fragment: DocumentFragment) {
				const plug = fragment.querySelector(`[data-id='${component.id}']`);
				if (!plug) {
					return;
				} else {
					component.getContent()?.append(...Array.from(plug.childNodes));
					plug.replaceWith(component.getContent());
				}
				
			}
		});
		const contents = fn ? fn(this) : "";

		return `<div ${dataAttribute}>${contents}</div>`;
	});
}
