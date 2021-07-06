module.exports = {
	extends: [
		"stylelint-config-recommended",
		"stylelint-a11y/recommended",
		"stylelint-config-recess-order",
		"stylelint-config-prettier",
	],

	plugins: [
		"stylelint-a11y",
		"stylelint-scss",
		"stylelint-no-unsupported-browser-features",
	],

	rules: {
		"at-rule-no-unknown": null,
		"no-invalid-position-at-import-rule": [false],
		"no-duplicate-selectors": [true, { ignore: ":root" }],
		"scss/at-rule-no-unknown": [true, { ignoreAtRules: ["use"] }],
		"plugin/no-unsupported-browser-features": [true, { severity: "error" }],
	}
};
