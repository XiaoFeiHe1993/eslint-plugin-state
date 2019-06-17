# eslint-plugin-nns

add comment line for this.state

## Feature list

 * if you not add comment line for state, it will show suggestion

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

Add `nns` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

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

## Supported Rules

* Fill in provided rules here
