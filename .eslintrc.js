// @ts-check
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
    env: {
        browser: true,
        es2021: true,
		node: true,
    },

    extends: [
        "eslint:recommended",
		"plugin:import/errors",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
		"prettier",
    ],

    parser: "@typescript-eslint/parser",
    parserOptions: {
		project: "./tsconfig.json",
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: "module"
    },

    plugins: [
		"import",
		"jsx-a11y",
        "react",
		"react-hooks",
        "@typescript-eslint",
    ],

    rules: {
		"react/prop-types": ["off"],
		"@typescript-eslint/no-unsafe-assignment": ["off"],
		"@typescript-eslint/no-unsafe-member-access": ["off"],
    },

	settings: {
		"react": {
			version: "detect",
		},

		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx", ".scss"],
		},

		"import/resolver": {
			typescript: {
				alwaysTryTypes: true,
			}
		}

	}
});
