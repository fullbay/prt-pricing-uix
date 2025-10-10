import js from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist", "coverage", ".__mf__temp", "src/graphql/generated/**"],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react: react,
      perfectionist: perfectionist,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      semi: ["error"],
      quotes: ["error", "double"],
      "object-curly-spacing": ["error", "always"],
      "react/prop-types": ["error", { skipUndeclared: true }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "keyword-spacing": ["error", { before: true, after: true }],
      "space-infix-ops": ["error"],
      "comma-spacing": ["error"],
      curly: ["error"],
      "handle-callback-err": ["error"],
      "no-multiple-empty-lines": ["error"],
      "one-var": ["error", "never"],
      "block-spacing": ["error"],
      camelcase: ["error"],
      "key-spacing": ["error"],
      "new-cap": ["error"],
      "new-parens": ["error"],
      "no-array-constructor": ["error"],
      "no-caller": ["error"],
      "no-debugger": ["error"],
      "no-delete-var": ["error"],
      "no-global-assign": ["error"],
      "no-lone-blocks": ["error"],
      "no-multi-spaces": ["error"],
      "no-mixed-spaces-and-tabs": ["error"],
      "no-multi-str": ["error"],
      "no-octal": ["error"],
      "no-path-concat": ["error"],
      "no-proto": ["error"],
      "no-redeclare": ["error"],
      "no-return-assign": ["error"],
      "no-self-compare": ["error"],
      "no-self-assign": ["error"],
      "no-sequences": ["error"],
      "no-shadow-restricted-names": ["error"],
      "no-template-curly-in-string": ["error"],
      "no-throw-literal": ["error"],
      "no-undef-init": ["error"],
      "no-unneeded-ternary": ["error"],
      "semi-spacing": ["error"],
      "rest-spread-spacing": ["error"],
      "spaced-comment": ["error"],
      "template-curly-spacing": ["error"],
      "use-isnan": ["error"],

      "perfectionist/sort-imports": ["error", { ignoreCase: true }],
      "perfectionist/sort-decorators": ["error", { ignoreCase: true }],
      "perfectionist/sort-enums": ["error", { ignoreCase: true }],
      "perfectionist/sort-array-includes": ["error", { ignoreCase: true }],
      "perfectionist/sort-named-imports": ["error", { ignoreCase: true }],
      "perfectionist/sort-variable-declarations": [
        "error",
        { ignoreCase: true },
      ],
      "perfectionist/sort-interfaces": ["error", { ignoreCase: true }],
    },
  }
);
