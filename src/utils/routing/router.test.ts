import {expect} from "chai";
import sinon from "sinon";
import Router from "/src/utils/routing/router.ts";
import {Block} from "/utils/block.ts";

describe("Use test", () => {
	beforeEach(() => {
		Router.reset();
	});

	const getContentFake = sinon.fake.returns(global.window.document.createElement("div"));

	const BlockMock = class {
		getContent = getContentFake;
	} as unknown as typeof Block;

	it("use() should return Router instance", () => {
		const result = Router.use("/", BlockMock);
		expect(result).to.eq(Router);
	});
});
