module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"eslint-config-google"
	],
	"overrides": [
		{
			"files": ['*.ts', '*.tsx'],
			"env": {
				"node": true
			},
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest"
	},
	"plugins": [
		"@typescript-eslint"
	],
	"rules": {
		"require-jsdoc" : 0,
		"max-len": "off",
		"indent": ["error", "tab"],
		"no-tabs": [
			"error",
			{
				allowIndentationTabs: true
			}
		],
		"quotes": ["error", "double"],
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/ban-types": "off",
		"@typescript-eslint/no-this-alias": "off",
		"comma-dangle": ["error", {
			"arrays": "never",
			"objects": "never",
			"imports": "never",
			"exports": "never",
			"functions": "never"
		}],
		"curly": "off"
	}
};
