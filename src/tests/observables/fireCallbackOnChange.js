import { test } from "../testHelper.js";
import Observable from "../../observables.js";

const Test =
	test("Observable only fires callback when value is changed", async () => {
		const observable = new Observable(1);
		await observable.subscribe((value) => {
			if (value === 1) throw new Error("Callback fired when value is the same");
			
		});

		observable.value = 1;
		observable.value = 2;
	});

export { Test as default };
