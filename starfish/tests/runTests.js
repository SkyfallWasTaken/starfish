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

setTimeout(() => {
	console.log(
		`%cAll tests ran in ${(new Date().getTime() - start.getTime()) / 1000}s`,
		`color: ${failCount === 0 ? "green" : "red"}; font-weight: bold; font-size: 1.5rem;`
	);
}, 0);
