module.exports = {
    parser: '@typescript-eslint/parser', // an eslint parser allow eslint to lint typescript source code
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        "browser": true,
        "node": true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
    ],
    plugins: [
        "react"
    ],
    rules: {
        'react/react-in-jsx-scope': 0,
        'react/jsx-uses-react': 0,
        "no-unused-vars": 0,
    },
    globals: {
        CustomAxiosRequestConfig: true
    }
};
