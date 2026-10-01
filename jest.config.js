const path = require('node:path');

const project = name => ({
  displayName: name,
  // Same transform config, so share one transform cache dir (as Backstage CLI does).
  id: 'swc',
  rootDir: path.join(__dirname, 'packages', name),
  cacheDirectory: path.join(__dirname, '.jc'),
  transform: { '\\.js$': '@swc/jest' },
  // Transform node_modules too (nanoid is ESM-only).
  transformIgnorePatterns: [],
});

module.exports = { projects: [project('a'), project('b')] };
