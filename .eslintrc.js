module.exports = {
    "extends": [
        'prettier',
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    "env": {
        "browser": true,
        "node": true,
        "jasmine": true,
        "jest": true,
        "es2021": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        'default-case': 0,
        'eol-last': 0,
        'indent': 0,
        'no-console': 0,
        'no-plusplus': 0,
        'no-script-url': 0,
        // 禁止不必要的转义字符
        "no-useless-escape": 0,
        "no-control-regex": 0
    }
}
