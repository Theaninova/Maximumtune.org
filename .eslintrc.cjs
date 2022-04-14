module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:unicorn/recommended",
  ],
  plugins: ["eslint-plugin-unicorn", "svelte3", "@typescript-eslint"],
  ignorePatterns: ["*.cjs"],
  overrides: [{files: ["*.svelte"], processor: "svelte3/svelte3"}],
  rules: {
    "unicorn/filename-case": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/number-literal-case": "off",
    "unicorn/no-array-callback-reference": "off",
    "unicorn/no-await-expression-member": "off",
    "unicorn/prefer-object-from-entries": "off",
    "unicorn/prevent-abbreviations": [
      "warn",
      {
        replacements: {
          ref: false,
          i: false,
        },
      },
    ],
    "unicorn/no-nested-ternary": "off",
    "unicorn/better-regex": "off",

    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/lines-between-class-members": ["error", "always"],
    "@typescript-eslint/no-explicit-any": "error",
  },
  settings: {
    "svelte3/typescript": () => require("typescript"),
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
}
