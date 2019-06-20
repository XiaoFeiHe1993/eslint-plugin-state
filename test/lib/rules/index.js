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
  parser: 'babel-eslint'
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('no-state-comment-line', rule, {
  valid: [
    `
      state = {
        // 名字
        name: 'name'
      }
    `,
    `
      state = {
        name: 'name' // 名字
      }
    `,
    `
      this.state = {
        // 名字
        name: 'name'
      }
    `,
    `
      this.state = {
        name: 'name' // 名字
      }
    `,
    `
      class Welcome extends React.Component {
        state = {
          name: 'name', // 名字
        };
      }
    `,
    `
      class Welcome extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            name: 'name', // 名字
          };
        }
      }
    `,
    `
      this.state = {
        name: 'name', // 名字
      }
    `
  ],
  invalid: [
    {
      code: `
        state = {
          name: 'name'
        }
      `,
      errors: [{
        message: 'please add comments for state variate',
        type: 'Property'
      }]
    },
    {
      code: `
        this.state = {
          name: 'name'
        }
      `,
      errors: [{
        message: 'please add comments for state variate',
        type: 'Property'
      }]
    },
    {
      code: `
        class Welcome extends React.Component {
          state = {
            name: 'name'
          };
        }
      `,
      errors: [{
        message: 'please add comments for state variate',
        type: 'Property'
      }]
    },
    {
      code: `
        this.state = {
          name: 'name',
          title: 'title', // this is a title
        }
      `,
      errors: [{
        message: 'please add comments for state variate',
        type: 'Property'
      }]
    },
    {
      code: `
        state = {
          name: 'name',
          title: 'title', // this is a title
        }
      `,
      errors: [{
        message: 'please add comments for state variate',
        type: 'Property'
      }]
    }
  ]
});
