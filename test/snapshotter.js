/**
 * @template {string} G
 * @template {string} N
 * @param {G} group
 * @param {N} name
 * @returns {`snapshots/${G}/${N}.txt`}
 */
function snapshotPath(group, name) {
  return `snapshots/${group}/${name}.txt`;
}

module.exports = {
  snapshotPath
};
