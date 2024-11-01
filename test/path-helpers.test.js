const PathHelpers = require('../lib/path-helpers');

test.concurrent(
  'should leave the path untouched if it does not contain odd characters',
  ({expect}) => {
    const input = 'some-folder123';
    const output = PathHelpers.format(input);
    expect(output).toEqual(input);
  }
);

test.concurrent('should escape single quotes', ({expect}) => {
  const input = "Don't-do-that";
  const output = PathHelpers.format(input);
  expect(output).toEqual("Don\\'t-do-that");
});

test.concurrent('should escape double quotes', ({expect}) => {
  const input = 'Don"t-do-that';
  const output = PathHelpers.format(input);
  expect(output).toEqual('Don\\"t-do-that');
});

test.concurrent('should escape spaces', ({expect}) => {
  const input = 'some path';
  const output = PathHelpers.format(input);
  expect(output).toEqual('some\\ path');
});

test.concurrent('should escape *', ({expect}) => {
  const input = 'some*path';
  const output = PathHelpers.format(input);
  expect(output).toEqual('some\\*path');
});
