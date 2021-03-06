<p align="center">
  <a href="https://github.com/node-ffi-packager"><img src="https://raw.githubusercontent.com/node-ffi-packager/resources/master/logotype/node-ffi-packager.svg?sanitize=true" alt="node-ffi-packager logotype, impossible cubes in green" width="256" border="0" /></a>
</p>

<p align="center">
  <a href="https://github.com/node-ffi-packager/node-ffi-generate">README</a> &middot; <a href="./CHANGELOG.md">Changelog</a> &middot; <a href="./DEVELOP.md">Development</a>
</p>

# [Forked version of `node-ffi-generate`](https://github.com/node-ffi-packager/node-ffi-generate) development

- Follow [git-flow](https://danielkummer.github.io/git-flow-cheatsheet/) and use [git-flow-avh](https://github.com/petervanderdoes/gitflow-avh).
- Tests are required for both bug fixes and features.
  - For bugs, please first commit a test proving the bug.

## Setup

```shell
git flow init -d

npm install

# NOTE: exporting for temporary use during development.
export LD_LIBRARY_PATH="$(llvm-config --libdir)"

npm run --silent test

# NOTE: when done with development.
unset LD_LIBRARY_PATH
```

## Testing

- Using `ffi-generate` requires the path to `libclang.so` (or `.dylib`, `.dll` on other systems) to be set, so the [dynamic linker](https://en.wikipedia.org/wiki/Dynamic_linker) (used via [`ffi-napi`](https://github.com/node-ffi-napi/ref-napi)) can find it.
  - Setting [`LD_LIBRARY_PATH`](https://en.wikipedia.org/wiki/Environment_variable#$LD_LIBRARY_PATH) (or `DYLD_LIBRARY_PATH` on macOS) is required to load the `ffi-generate` _library_ (from [`index.js`](./index.js)).
  - The `ffi-generate` _executable_ (in [`bin/ffi-generate.js`](./bin/ffi-generate.js)) sets the environment variable automatically.
- Tests are executed using [`ava`](https://github.com/avajs/ava).

```shell
# NOTE: run all tests in a single directory.
npm run --silent test:ava -- test/unit/struct/*.js
```

## Debug logging

- Enable (some) additional debugging output to `stderr` by setting the `DEBUG` environment variable to `ffi-generate:*`.
- Uses [`debug`](https://github.com/visionmedia/debug), and can also be used to debug other packages which also use `debug`.
  - Enable all `debug` logging with `DEBUG='*'`. Will yield _a lot_ more output.

```shell
# NOTE: exporting for temporary use during development.
export DEBUG='ffi-generate:*'

./bin/ffi-generate.js --library 'mylibrary' --file ./examples/programmatic-usage/simple/mylibrary.h

# NOTE: when done with development.
unset DEBUG
```

## Code coverage

- At the end of the tests, you will see a code coverage report generated by [`nyc`](https://github.com/istanbuljs/nyc).
  - The total code coverage percentages are enforced. See [`.nycrc.json`](./.nycrc.json).
- If you have executed the tests locally, there should also be a [code coverage report](./coverage/lcov-report/index.html) (link only works locally) in the `coverage/` directory.
  - Ensure that your added or changed lines of code in each commit are executed at least once.

---

`node-ffi-generate` Copyright &copy; 2011, 2012, 2013, 2014 [Timothy J Fontaine](https://github.com/tjfontaine), &copy; 2020, 2021 [Joel Purra](https://joelpurra.com/). Released under [MIT License](https://opensource.org/licenses/MIT).
