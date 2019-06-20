const tool = require('../../utils/index');

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: tool.VUE_DATA_TEXT,
      recommended: true
    }
  },
  create: function (context) {
    return {
      Property(node) {
        const {parent} = node;
        if (parent && parent.type === 'ObjectExpression') {
          const returnNode = parent.parent;
          if (returnNode && returnNode.type === 'ReturnStatement') {
            const blockNode = returnNode.parent;
            if (blockNode && blockNode.type === 'BlockStatement') {
              const functionNode = blockNode.parent;
              if (functionNode && functionNode.type === 'FunctionExpression') {
                const dataNode = functionNode.parent;
                if (dataNode && dataNode.key && dataNode.key.name === 'data') {
                  tool.searchComments(context, node, tool.VUE_DATA_TEXT);
                }
              }
            }
          }
        }
      }
    };
  }
};
