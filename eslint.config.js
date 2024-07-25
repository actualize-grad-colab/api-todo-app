import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import jest from "eslint-plugin-jest";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  // strict and stylistic rules increase the arbiratry code struggles
  ...tseslint.configs.stylisticTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    // disable type-aware linting on JS files like this one
    files: ["test/**/*.js"],
    ...jest.configs["flat/all"],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      // turn off other type-aware rules
      "deprecation/deprecation": "off",
      "@typescript-eslint/internal/no-poorly-typed-ts-props": "off",

      // turn off rules that don't apply to JS code
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },
);
