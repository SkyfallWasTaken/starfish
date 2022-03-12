import testList from "./testList.js";

console.log(
	"%cStarting test runner",
	"color: green; font-weight: bold; font-size: 2rem;"
);

const start = new Date();

let failCount = 0;
testList().forEach(async (test) => {
	const pass = await (await test).execute();
	if (!pass) failCount++;
});