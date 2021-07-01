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
		"scss/at-rule-no-unknown": true,
		"plugin/no-unsupported-browser-features": [true, { severity: "error" }],
	}
};
