const TestCli = require('./jest-helpers/cli');
const snapshotter = require('./snapshotter');

/**
 * @template {string} N
 * @param {N} name
 * @returns {`snapshots/flags/${N}.txt`}
 */
function testName(name) {
  return snapshotter.snapshotPath('flags', name);
}

test('Running with an unknown flag', async () => {
  const output = await TestCli.runAndExpectError('--watc');
  expect(output).toMatchFileSnapshot(testName('unknown-flag'));
});

test('Running with an unknown shorthand flag', async () => {
  const output = await TestCli.runAndExpectError('-u');
  expect(output).toMatchFileSnapshot(testName('unknown-shorthand-flag'));
});

test('Running with unknown flag --suppress', async () => {
  const output = await TestCli.runAndExpectError('--suppress');
  expect(output).toMatchFileSnapshot(testName('unknown-suppress-flag'));
});

test('Running --compiler without an argument', async () => {
  const output = await TestCli.runAndExpectError('--compiler');
  expect(output).toMatchFileSnapshot(testName('missing-argument-compiler'));
});

test('Running --config without an argument', async () => {
  const output = await TestCli.runAndExpectError('--config');
  expect(output).toMatchFileSnapshot(testName('missing-argument-config'));
});

test('Running --template without an argument', async () => {
  const output = await TestCli.runAndExpectError('--template');
  expect(output).toMatchFileSnapshot(testName('missing-argument-template'));
});

test('Running --elmjson without an argument', async () => {
  const output = await TestCli.runAndExpectError('--elmjson');
  expect(output).toMatchFileSnapshot(testName('missing-argument-elmjson'));
});

test('Running --report without an argument', async () => {
  const output = await TestCli.runAndExpectError('--report');
  expect(output).toMatchFileSnapshot(testName('missing-argument-report'));
});

test('Running --elm-format-path without an argument', async () => {
  const output = await TestCli.runAndExpectError('--elm-format-path');
  expect(output).toMatchFileSnapshot(
    testName('missing-argument-elm-format-path')
  );
});

test('Running --rules without an argument', async () => {
  const output = await TestCli.runAndExpectError('--rules');
  expect(output).toMatchFileSnapshot(testName('missing-argument-rules'));
});

test('Running --suppressed-rules without an argument', async () => {
  const output = await TestCli.runAndExpectError('--suppressed-rules');
  expect(output).toMatchFileSnapshot(
    testName('missing-argument-suppressed-rules')
  );
});

test('Running --ignore-dirs without an argument', async () => {
  const output = await TestCli.runAndExpectError('--ignore-dirs');
  expect(output).toMatchFileSnapshot(testName('missing-argument-ignore-dirs'));
});

test('Running --ignore-files without an argument', async () => {
  const output = await TestCli.runAndExpectError('--ignore-files');
  expect(output).toMatchFileSnapshot(testName('missing-argument-ignore-files'));
});

test('Running init --compiler without an argument', async () => {
  const output = await TestCli.runAndExpectError('init --compiler');
  expect(output).toMatchFileSnapshot(
    testName('missing-argument-init-compiler')
  );
});

test('Running init --config without an argument', async () => {
  const output = await TestCli.runAndExpectError('init --config');
  expect(output).toMatchFileSnapshot(testName('missing-argument-init-config'));
});

test('Running init --template without an argument', async () => {
  const output = await TestCli.runAndExpectError('init --template');
  expect(output).toMatchFileSnapshot(
    testName('missing-argument-init-template')
  );
});

test('Running new-package --compiler without an argument', async () => {
  const output = await TestCli.runAndExpectError('new-package --compiler');
  expect(output).toMatchFileSnapshot(
    testName('missing-argument-new-package-compiler')
  );
});

test('Running --github-auth with a bad value', async () => {
  const output = await TestCli.runAndExpectError('--github-auth=bad');
  expect(output).toMatchFileSnapshot(testName('github-auth-bad-argument'));
});

test('Running --report with an unknown value', async () => {
  const output = await TestCli.runAndExpectError('--report=unknown');
  expect(output).toMatchFileSnapshot(testName('report-unknown-argument'));
});

test('Running --template with a bad value', async () => {
  const output = await TestCli.runAndExpectError('--template=not-github-repo');
  expect(output).toMatchFileSnapshot(testName('template-bad-argument'));
});

test('Running init --template with a bad value', async () => {
  const output = await TestCli.runAndExpectError(
    'init --template=not-github-repo'
  );
  expect(output).toMatchFileSnapshot(testName('init-template-bad-argument'));
});

test('Using the same flag twice', async () => {
  const output = await TestCli.runAndExpectError('--config a/ --config b/');
  expect(output).toMatchFileSnapshot(testName('duplicate-flags'));
});

test('Using both --template and --offline (regular run)', async () => {
  const output = await TestCli.runAndExpectError(
    '--template jfmengels/elm-review-unused/example --offline'
  );
  expect(output).toMatchFileSnapshot(testName('template-and-offline-run'));
});

test('Using both --template and --offline (init)', async () => {
  const output = await TestCli.runAndExpectError(
    'init --template jfmengels/elm-review-unused/example --offline'
  );
  expect(output).toMatchFileSnapshot(testName('template-and-offline-init'));
});

test('Using both new-package and --offline', async () => {
  const output = await TestCli.runAndExpectError('new-package --offline');
  expect(output).toMatchFileSnapshot(testName('offline-new-package'));
});
