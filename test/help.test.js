const TestCli = require('./jest-helpers/cli');
const snapshotter = require('./snapshotter');

/**
 * @template {string} N
 * @param {N} name
 * @returns {`snapshots/help/${N}.txt`}
 */
function testName(name) {
  return snapshotter.snapshotPath('help', name);
}

test('--help', async () => {
  const output = await TestCli.run('--help');
  expect(output).toMatchFileSnapshot(testName('default'));
});

test('init --help', async () => {
  const output = await TestCli.run('init --help');
  expect(output).toMatchFileSnapshot(testName('init'));
});

test('suppress --help', async () => {
  const output = await TestCli.run('suppress --help');
  expect(output).toMatchFileSnapshot(testName('suppress'));
});

test('new-package --help', async () => {
  const output = await TestCli.run('new-package --help');
  expect(output).toMatchFileSnapshot(testName('new-package'));
});

test('new-rule --help', async () => {
  const output = await TestCli.run('new-rule --help');
  expect(output).toMatchFileSnapshot(testName('new-rule'));
});

test('prepare-offline --help', async () => {
  const output = await TestCli.run('prepare-offline --help');
  expect(output).toMatchFileSnapshot(testName('prepare-offline'));
});
