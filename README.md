# eslint-plugin-state

if you not add comments for react state variate, it will show error

如果你没有给react state变量添加注释，那么eslint会提示一个错误，培养为变量写注释的好习惯

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-state`:

```
$ npm install eslint-plugin-state --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-state` globally.

## Usage

Add `state` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "state"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "state/no-state-comment-line": "error"
    }
}
```
