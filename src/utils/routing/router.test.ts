import {expect} from "chai";
import sinon from "sinon";
import Router from "/utils/routing/router.ts";
import {Block} from "/utils/block";


describe("Testing of function use()", () => {
	beforeEach(() => {
		Router.reset();
	});

	const getContentFake = sinon.fake.returns(global.window.document.createElement("div"));

	const BlockMock = class {
		getContent = getContentFake;
	} as unknown as typeof Block;
	it("Function use() should return Router instance", () => {
		const result = Router.use("/", BlockMock);
		expect(result).to.eq(Router);
	});
	it("Check length of array _routes", () => {
		Router.use("/", BlockMock).use("/", BlockMock);
		expect(Router.routeLength()).to.eq(2);
	});
});


