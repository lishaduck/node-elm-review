const packageJson = require('../package.json');
const TestCli = require('./jest-helpers/cli');

test.concurrent('Running with --version', async ({expect}) => {
  const output = await TestCli.runWithoutTestMode('--version');
  expect(output.trimEnd()).toEqual(packageJson.version);
});

test.concurrent('Running with the shorthand -v', async ({expect}) => {
  const output = await TestCli.runWithoutTestMode('-v');
  expect(output.trimEnd()).toEqual(packageJson.version);
});
