/**
 * @author xiaofeihe
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-data-comment-line'),
  RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  parser: 'babel-eslint'
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('no-state-comment-line', rule, {
  valid: [
    `
     export default {
      data() {
        return {
          name: 'name' // 名字
        }
      }
    }
    `
  ],
  invalid: [
    {
      code: `
        export default {
          data() {
            return {
              name: 'name'
            }
          }
        }
      `,
      errors: [{
        message: 'please add comments for data variate',
        type: 'ReturnStatement'
      }]
    }
  ]
});
