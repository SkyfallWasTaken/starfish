class Test {
	constructor(name, cb) {
		this.testName = name;
		this.cb = cb;
	}

	async execute() {
		try {
			const pass = await this.cb();
			if (!pass[0]) throw new Error("Test signaled failure:", pass[1]);
			console.log(`[pass] ${this.testName}`);
			return true;
		} catch (err) {
			if (err.toString() != `Error: ${randomString}`) {
				console.error(
					`[fail] ${this.testName}:\n${err}\nat:\n${err.stack
						.split("\n")
						.map((value) => `    ${value}`)
						.join("\n")}`
				);
				return false;
			}
			console.log(`[pass] ${this.testName}`);
			return true;
		}
	}
}

const randomString = Math.random()
	.toString(36)
	.replace(/[^a-z]+/g, "")
	.substring(6);

export async function test(name, cb) {
	return new Test(name, cb);
}

// from here it's all helper function for tests
async function assertEq(left, right) {
	if (left === right) return;
	throw new Error(
		`assertEq: "left" (${left}) is not equal to "right" (${right})`
	);
}

async function assertNotEq(left, right) {
	if (left != right) return;
	throw new Error(`assertNotEq: "left" (${left}) is equal to "right"`);
}

async function assertNaN(n) {
	if (n.isNaN()) return;
	throw new Error(`assertNaN: "n" (${n}) is a number`);
}

async function assertNotNaN(n) {
	if (!n.isNaN()) return;
	throw new Error(`assertNaN: "n" (${n}) is not a number`);
}

export { assertEq, assertNotEq, assertNaN, assertNotNaN };
