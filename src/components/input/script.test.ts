import sinon from "sinon";
import {expect, assert} from "chai";
import {Input} from "./script.ts";
import {InputProps} from "./../../types/common_types.ts";
import {checkError, checkError} from "./../../utils/form_utils.ts";

describe("Testing of HTML-structure", () => {
	let defaultInputParams: InputProps;

	beforeEach(() => {
		defaultInputParams = {
			id: "input_id",
			label: "Поле ввода",
			name: "input_name",
			type: "text",
			ref: "input_name",
			error: ""
		};
	});
	it("Component should return tag DIV", () => {
		const input = new Input(defaultInputParams);
		const element = input.element;
		expect(element).to.be.instanceof(window.HTMLDivElement);
	});
	it("Component should return DIV with class input-container", () => {
		const input = new Input(defaultInputParams);
		const element = input.element;
		assert(element?.classList.contains("input-container"));
	});
	it("Component should contain LABEL if not-not_empty is set", () => {
		defaultInputParams["not_empty"] = "yes";
		const input = new Input(defaultInputParams);
		const element = input.element;
		assert(element?.querySelector("label") !== null);
	});
	it("Component should contain LABEL if not-not_empty is not set", () => {
		const input = new Input(defaultInputParams);
		const element = input.element;
		assert(element?.querySelector("label") == null);
	});
	it("Input should take label-text from props label", () => {
		defaultInputParams["not_empty"] = "yes";
		const input = new Input(defaultInputParams);
		const element = input.element;
		assert(element?.querySelector("label")?.innerHTML == "Поле ввода");
	});
	it("Input should take value from props name", () => {
		const input = new Input(defaultInputParams);
		const element = input.element;
		assert(element?.querySelector("input")?.getAttribute("name") == "input_name");
	});
	it("Input should take id from props id", () => {
		const input = new Input(defaultInputParams);
		const element = input.element;
		assert(element?.querySelector("input")?.getAttribute("id") == "input_id");
	});
	it("Input should take type from props type", () => {
		const input = new Input(defaultInputParams);
		const element = input.element;
		assert(element?.querySelector("input")?.getAttribute("type") == "text");
	});
	it("Input should take data-validate from props data-validate", () => {
		defaultInputParams["validate_type"] = "not-empty,email";
		const input = new Input(defaultInputParams);
		const element = input.element;
		assert(element?.querySelector("input")?.dataset.validate == defaultInputParams["validate_type"]);
	});
});

describe.only("Event testing", () => {
	let defaultInputParams: InputProps;
    beforeEach(() => {
		defaultInputParams = {
			id: "input_id",
			label: "Поле ввода",
			name: "input_name",
			type: "text",
			ref: "input_name",
			error: ""
		};
	});

	/*
	it("When focus out checkError function is called", () => {
		//const checkError = sinon.fake.replace(checkError, "TestFormUtils.checkErrorTest", sinon.fake(foo.bar));
		// const spyFocusOut = sinon.spy("test");

		const inputComponent = new Input(defaultInputParams);
		const input = inputComponent.element?.querySelector("input");
        input?.blur();


		const spy = sinon.fake(test);
		wrapTest();
	    console.log(fake.calledOnce);
	});*/

	it("Test test()", () => {
		const spy = sinon.spy(test);
		wrapTest();
		assert(spy.calledOnce);
	});
});

describe.only("Testing getters & setters", () => {
	let defaultInputParams: InputProps;
	let input: Input;

	beforeEach(() => {
		defaultInputParams = {
			id: "input_id",
			label: "Поле ввода",
			name: "input_name",
			type: "text",
			ref: "input_name",
			error: "",
			validate_type: "not-empty,email"
		};
		input = new Input(defaultInputParams);
	});
	it("Getter name should return props name", () => {
		expect(input.name).to.eq("input_name");
	});
	it("Getter validate_type should return props validate_type", () => {
		expect(input.validate_type).to.eq("not-empty,email");
	});
	it("Getter value should return value", () => {
		input.element?.querySelector("input")?.setAttribute("value", "значение поля input");
		expect(input.value).to.eq("значение поля input");
	});

    it("Setter value should fill in INPUT tag", () => {
		input.value = "значение поля input";
		expect(input.element?.querySelector("input")?.value).to.eq("значение поля input");
	});


});

describe("Testing methods of parent class Block", () => {
    it("", () => {

    });
});
function wrapTest() {
	test();
	return true;
}
function test() {
	return true;
}
