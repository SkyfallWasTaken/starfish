import { test, assertEq } from "../testHelper.js";

const Test = test("auto-failing test", async () => {
	assertEq(1, 1);
    return [false, 1]
});

export { Test as default };
