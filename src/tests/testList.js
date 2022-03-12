import ObservableTest from "./observables/fireCallbackOnChange.js";
import FailingTest from "./observables/failingtest.js";

export default function () {
	return [
        ObservableTest,
        FailingTest
    ];
}
