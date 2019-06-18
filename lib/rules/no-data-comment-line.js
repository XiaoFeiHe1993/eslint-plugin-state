module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "please add comments for data variate",
      recommended: true
    }
  },
  create: function (context) {
    searchComments = (node, properties) => {
      properties.map((item) => {
        // 情况一：注释加在变量的上面
        const leadingComments = !item.leadingComments || item.leadingComments.length <= 0;
        // 情况二：注释加在后面
        const trailingComments = !item.trailingComments || item.trailingComments.length <= 0;
        if (leadingComments && trailingComments) {
          context.report(node, "please add comments for data variate");
        }
      });
    };

    return {
      ReturnStatement(node) {
        const {argument, parent} = node;
        if (parent && parent.type === 'BlockStatement') {
          const grandNode = parent.parent;
          if (grandNode && grandNode.parent && grandNode.parent.key && grandNode.parent.key.name === 'data') {
            if (argument && argument.type === 'ObjectExpression') {
              const {properties} = argument;
              searchComments(node, properties);
            }
          }
        }
      }
    };
  }
};
