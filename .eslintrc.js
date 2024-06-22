module.exports = {
  root: true,
  extends: [
    'xo', // Should we also use eslint-config-xo-typescript?
    'turbo',
    'plugin:n/recommended',
    'plugin:security/recommended-legacy',
    'plugin:promise/recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['n', 'security', 'promise', 'unicorn', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname
  },
  env: {
    node: true
  },
  ignorePatterns: [
    '**/node_modules/',
    '**/elm-stuff/',
    'test/run-snapshots',
    'test/snapshots',
    'test/temporary',
    'vendor/node-elm-compiler.js',
    'vendor/exit.js',
    '.eslintrc.js',
    'new-package/elm-review-package-tests/check-previews-compile.js'
  ],
  rules: {
    complexity: 'off',
    'import/extensions': 'off',
    indent: 'off',
    'comma-dangle': 'off',
    curly: 'off',
    quotes: 'off',
    'arrow-body-style': 'off',
    'prettier/prettier': 'off',
    'object-shorthand': 'off',
    'operator-linebreak': 'off',
    'max-params': 'off',
    'arrow-parens': 'off',
    'no-warning-comments': 'off',
    'prefer-const': 'off',
    'promise/no-return-in-finally': 'error',
    'promise/valid-params': 'error',
    'promise/prefer-await-to-then': 'off',
    'no-return-await': 'off',
    'unicorn/no-fn-reference-in-iterator': 'off',
    'unicorn/no-reduce': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-node-protocol': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    'default-case': 'off',
    'n/shebang': 'off', // TODO [eslint-plugin-n@>=17]: Turn on 'n/hashbang'. For now, `shebang` is buggy.

    // TODO: Promise rules that should eventually get turned on.
    'promise/catch-or-return': 'off',
    'promise/always-return': 'off',

    // TODO: Security issues that should eventually get fixed.
    'security/detect-object-injection': 'off',
    'security/detect-non-literal-fs-filename': 'off',
    'security/detect-non-literal-require': 'off',
    'security/detect-unsafe-regex': 'off' // TODO: Add `eslint-plugin-regexp` and fix these issues.
  },
  overrides: [
    {
      files: ['./new-package/**/*.js'],
      rules: {
        'n/no-process-exit': 'off'
      }
    }
  ],
  globals: {
    test: 'readonly',
    expect: 'readonly'
  }
};
