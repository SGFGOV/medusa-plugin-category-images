module.exports = {
    extends: ["plugin:@typescript-eslint/recommended", "prettier"],
    plugins: ["@typescript-eslint", "prettier"],

    env: {
        node: true,
        commonjs: true
    },
    rules: {
        "prettier/prettier": [
            "error",
            {
                "endOfLine": "auto",
                "quoteProps": "consistent",
                "printWidth": 80,
                "editor.formatOnSave": true,
                "proseWrap": "always",
                "tabSize": 4,
                "tabWidth": 4,
                "requireConfig": false,
                "useTabs": false,
                "trailingComma": "none",
                "bracketSpacing": true,
                "jsxBracketSameLine": false,
                "semi": true
            },
            {
                usePrettierrc: true
            }
        ],
        "object-curly-spacing": [2, "always"],
        "quotes": [2, "double", { avoidEscape: true }],
        "curly": [2, "all"],
        "new-cap": "off",
        "require-jsdoc": "off",
        "semi": "error",
        "no-unused-expressions": "off",
        "camelcase": "off",
        "no-invalid-this": "off"
    },
    overrides: [
        {
            files: ["*.ts"],
            parser: "@typescript-eslint/parser",
            plugins: ["@typescript-eslint/eslint-plugin"],
            extends: [
                "plugin:@typescript-eslint/recommended",
                "eslint:recommended",
                "eslint-config-prettier",
                "google",
                "prettier"
            ],
            rules: {
                "valid-jsdoc": [
                    "error",
                    {
                        requireParamType: false,
                        requireReturnType: false,
                        prefer: {
                            arg: "param",
                            argument: "param",
                            class: "constructor",
                            return: "return",
                            virtual: "abstract"
                        }
                    }
                ],
                "@typescript-eslint/explicit-function-return-type": ["error"],
                "@typescript-eslint/no-non-null-assertion": ["off"]
            }
        }
    ]
};
