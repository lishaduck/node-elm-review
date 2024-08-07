/*
 * exit
 * https://github.com/cowboy/node-exit
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 */

'use strict';

/**
 * @param {number} exitCode
 * @param {Array<NodeJS.WriteStream>} [streams]
 * @returns {never}
 */
module.exports = function exit(exitCode, streams = []) {
  if (!streams) {
    streams = [process.stdout, process.stderr];
  }
  var drainCount = 0;
  // Actually exit if all streams are drained.
  // @ts-expect-error(TS2534): This is really `never | void`, but TS isn't smart enough to deal with that later on.
  /** @return {never} */
  function tryToExit() {
    if (drainCount === streams.length) {
      process.exit(exitCode);
    }
  }
  streams.forEach(function (stream) {
    // Count drained streams now, but monitor non-drained streams.
    if (stream.writableLength === 0) {
      drainCount++;
    } else {
      stream.write('', 'utf-8', function () {
        drainCount++;
        tryToExit();
      });
    }
    // Prevent further writing.
    stream.write = () => true;
  });
  // If all streams were already drained, exit now.
  tryToExit();
  // In Windows, when run as a Node.js child process, a script utilizing
  // this library might just exit with a 0 exit code, regardless. This code,
  // despite the fact that it looks a bit crazy, appears to fix that.
  process.on('exit', function () {
    process.exit(exitCode);
  });
};
