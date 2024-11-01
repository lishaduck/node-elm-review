const path = require('node:path');
const TestCli = require('./jest-helpers/cli');
const snapshotter = require('./snapshotter');

/**
 * @template {string} N
 * @param {N} name
 * @returns {`snapshots/review/${N}.txt`}
 */
function testName(name) {
  return snapshotter.snapshotPath('review', name);
}

test('Regular run from inside the project', async ({expect}) => {
  const output = await TestCli.runAndExpectError('', {
    project: 'project-with-errors/'
  });
  expect(output).toMatchFileSnapshot(testName('review-with-errors'));
});

test('Regular run from inside the project (JSON output)', async ({expect}) => {
  const output = await TestCli.runAndExpectError('', {
    project: 'project-with-errors/',
    report: 'json'
  });
  expect(output).toMatchFileSnapshot(testName('review-with-errors-json'));
});

test('Regular run from inside the project (ndjson output)', async ({
  expect
}) => {
  const output = await TestCli.runAndExpectError('', {
    project: 'project-with-errors/',
    report: 'ndjson'
  });
  expect(output).toMatchFileSnapshot(testName('review-with-errors-ndjson'));
});

test('Running using other configuration (without errors)', async ({expect}) => {
  const output = await TestCli.run(
    '--config ../config-that-triggers-no-errors',
    {project: 'project-with-errors/'}
  );
  expect(output).toMatchFileSnapshot(testName('no-errors'));
});

test('Regular run using --elmjson and --config', async ({expect}) => {
  const output = await TestCli.runAndExpectError(
    '--elmjson project-with-errors/elm.json --config project-with-errors/review',
    {cwd: path.resolve(__dirname, '.')}
  );
  expect(output).toMatchFileSnapshot(testName('run-with-elmjson-flag'));
});

test('Running in a project using ES2015 modules', async ({expect}) => {
  const output = await TestCli.runAndExpectError('', {
    project: 'project-using-es2015-module'
  });
  expect(output).toMatchFileSnapshot(testName('config-es2015-modules'));
});

test('Using an empty configuration', async ({expect}) => {
  const output = await TestCli.runAndExpectError('--config ../config-empty', {
    project: 'project-with-errors'
  });
  expect(output).toMatchFileSnapshot(testName('config-empty'));
});

test('Using a configuration with a missing direct elm-review dependency', async ({
  expect
}) => {
  const output = await TestCli.runAndExpectError(
    '--config ../config-without-elm-review',
    {project: 'project-with-errors'}
  );
  expect(output).toMatchFileSnapshot(testName('without-elm-review'));
});

test('Using a configuration with an outdated elm-review package', async ({
  expect
}) => {
  const output = await TestCli.runAndExpectError(
    '--config ../config-for-outdated-elm-review-version',
    {project: 'project-with-errors'}
  );
  expect(output).toMatchFileSnapshot(testName('outdated-version'));
});

test('Using a configuration which fails due to unknown module', async ({
  expect
}) => {
  const output = await TestCli.runAndExpectError(
    '--config ../config-error-unknown-module',
    {project: 'project-with-errors'}
  );
  expect(output).toMatchFileSnapshot(testName('config-error-unknown-module'));
});

test('Using a configuration which fails due to syntax error', async ({
  expect
}) => {
  const output = await TestCli.runAndExpectError(
    '--config ../config-syntax-error',
    {project: 'project-with-errors'}
  );
  expect(output).toMatchFileSnapshot(testName('config-syntax-error'));
});

test('Using a configuration which fails due to configuration error', async ({
  expect
}) => {
  const output = await TestCli.runAndExpectError(
    '--config ../config-configuration-error',
    {project: 'project-with-errors'}
  );
  expect(output).toMatchFileSnapshot(testName('config-configuration-error'));
});

test('Using a configuration which fails due to debug remnants', async ({
  expect
}) => {
  const output = await TestCli.runAndExpectError(
    '--config ../config-error-debug',
    {project: 'project-with-errors'}
  );
  expect(output).toMatchFileSnapshot(testName('config-error-debug'));
});

test('Running on project with unknown file', async ({expect}) => {
  const output = await TestCli.runAndExpectError(
    '--config ../config-that-triggers-no-errors unknown-target',
    {project: 'project-with-errors'}
  );
  expect(output).toMatchFileSnapshot(testName('run-with-unknown-target'));
});

test('Running on project with a directory ending in .elm (without arg)', async ({
  expect
}) => {
  const output = await TestCli.run(
    '--config ../config-that-triggers-no-errors',
    {project: 'project-with-dir-ending-in-elm'}
  );
  expect(output).toMatchFileSnapshot(testName('src.elm-project-without-arg'));
});

test('Running on project with a directory ending in .elm (with arg)', async ({
  expect
}) => {
  const output = await TestCli.run(
    '--config ../config-that-triggers-no-errors src.elm',
    {project: 'project-with-dir-ending-in-elm'}
  );
  expect(output).toMatchFileSnapshot(testName('src.elm-project-with-arg'));
});
