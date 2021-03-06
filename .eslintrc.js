module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "jest": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "settings": {
        "react": {
            "version": "detect"
        }

    },

    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    },
    "parserOptions": {

        "ecmaVersion": 2019,
        "sourceType": "module",
    },
    "parser": "babel-eslint"
};
