/**
 * @author xiaofeihe
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-state-comment-line'),
  RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  ecmaFeatures: {
    modules: true,
  },
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('no-state-comment-line', rule, {
  valid: [
    `
    state = {
      name: 'name' // 名字
    }
    `,
  ],
  invalid: [
    {
      code: `
      state = {
        name: 'name'
      }
      `,
      errors: [{
        message: 'please add comment line for state',
        type: 'AssignmentExpression'
      }]
    }
  ]
});