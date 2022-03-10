import init from "../starfish/index.js";
import testList from "../starfish/tests/testList.js";

await init("/src/components/tests/App.html", "App");

const table = document.getElementById("tests");

let count = -1;
testList().forEach(async (test) => {
	count++;
	const row = document.createElement("tr");
	const testName = document.createElement("td");
	testName.textContent = (await test).testName;
	row.appendChild(testName);
	const testResult = document.createElement("td");
	testResult.id = `result-id-${count}`;
	row.appendChild(testResult);
	table.appendChild(row);
});
