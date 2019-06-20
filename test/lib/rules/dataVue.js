/**
 * @author xiaofeihe
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-data-comment-line'),
  RuleTester = require('eslint').RuleTester;

const tool = require('../../../utils/index');

RuleTester.setDefaultConfig({
  parser: 'babel-eslint'
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('no-data-comment-line', rule, {
  valid: [
    `
     export default {
      data() {
        return {
          name: 'name' // 名字
        }
      }
    }
    `,
    `
     export default {
      data() {
        return {
          name: 'name', // 名字
        }
      }
    }
    `,
    `
     export default {
      data() {
        return {
          // 名字
          name: 'name'
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
        message: tool.VUE_DATA_TEXT,
        type: 'Property'
      }]
    },
    {
      code: `
        export default {
          data() {
            return {
              name: 'name',
              title: 'title', // this is a title
            }
          }
        }
      `,
      errors: [{
        message: tool.VUE_DATA_TEXT,
        type: 'Property'
      }]
    },
    {
      code: `
        export default {
          data() {
            return {
              name: 'name',
            }
          }
        }
      `,
      errors: [{
        message: tool.VUE_DATA_TEXT,
        type: 'Property'
      }]
    }
  ]
});
