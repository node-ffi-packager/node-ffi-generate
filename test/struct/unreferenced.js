const test = require("ava");
const fs = require("fs");
const {
	promisify,
} = require("util");

const assertExpectedLines = require("../helper/assert-expected-lines");

const writeFile = promisify(fs.writeFile);

test("lines", async (t) => {
	const {
		generate,
	} = require("../..");

	const generated = await generate({
		filename: `${__filename}.h`,
		library: "unreferenced",
	});

	await writeFile(__filename + ".output.js", generated.serialized);

	t.is(generated.unmapped.length, 0);

	const expected = "const types = {};";

	assertExpectedLines(t, expected, generated.serialized);
});
