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

test.concurrent('--help', async ({expect}) => {
  const output = await TestCli.run('--help');
  expect(output).toMatchFileSnapshot(testName('default'));
});

test.concurrent('init --help', async ({expect}) => {
  const output = await TestCli.run('init --help');
  expect(output).toMatchFileSnapshot(testName('init'));
});

test.concurrent('suppress --help', async ({expect}) => {
  const output = await TestCli.run('suppress --help');
  expect(output).toMatchFileSnapshot(testName('suppress'));
});

test.concurrent('new-package --help', async ({expect}) => {
  const output = await TestCli.run('new-package --help');
  expect(output).toMatchFileSnapshot(testName('new-package'));
});

test.concurrent('new-rule --help', async ({expect}) => {
  const output = await TestCli.run('new-rule --help');
  expect(output).toMatchFileSnapshot(testName('new-rule'));
});

test.concurrent('prepare-offline --help', async ({expect}) => {
  const output = await TestCli.run('prepare-offline --help');
  expect(output).toMatchFileSnapshot(testName('prepare-offline'));
});
