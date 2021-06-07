const test = require("ava");
const execa = require("execa");
const fs = require("fs");
const {
	getBinPath,
} = require("get-bin-path");
const path = require("path");
const {
	promisify,
} = require("util");

const writeFile = promisify(fs.writeFile);

test("lines", async (t) => {
	const ffiGenerate = await getBinPath();
	let generated;

	try {
		await execa(
			ffiGenerate, [
				"--file",
				`${__filename}.h`,
				"--library",
				"does-not-matter",
			], {
				env: {
					DYLD_LIBRARY_PATH: undefined,
					LD_LIBRARY_PATH: undefined,
					PATH: `${path.join(__dirname, "failing-llvm-config")}:${process.env.PATH}`,
				},
			},
		);

		t.fail("Expected failing execution.");
	} catch (error) {
		t.is(error.exitCode, 1);
		t.is(error.timedOut, false);
		t.is(error.stdout.length, 0);

		generated = error.stderr;
	}

	await writeFile(__filename + ".output.js", generated);

	t.assert(generated.includes("Error: Command failed with exit code 123: llvm-config --libdir"));
});
