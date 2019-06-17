module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "please add comments for state",
      recommended: true
    }
  },
  create: function(context) {
    return {
      AssignmentExpression(node) {
        const {left, right} = node;
        // state = {}
        if (left && left.type === 'Identifier' && left.name === 'state') {
          if (right && right.type === 'ObjectExpression' && right.properties) {
            const {properties} = right;
            properties.map((item) => {
              // 情况一：注释加在变量的上面
              const leadingComments = !item.leadingComments || item.leadingComments.length <= 0;
              // 情况二：注释加在逗号后面
              const trailingComments = !item.trailingComments || item.trailingComments.length <= 0;
              if (leadingComments && trailingComments) {
                context.report(node, "please add comments for state");
              }
            });
          }
        }

        // this.state = {}
        if (left && left.type === 'MemberExpression') {
          if (left.property && left.property.type === 'Identifier' && left.property.name === 'state') {
            if (right && right.type === 'ObjectExpression' && right.properties) {
              const {properties} = right;
              properties.map((item) => {
                // 情况一：注释加在变量的上面
                const leadingComments = !item.leadingComments || item.leadingComments.length <= 0;
                // 情况二：注释加在逗号后面
                const trailingComments = !item.trailingComments || item.trailingComments.length <= 0;
                if (leadingComments && trailingComments) {
                  context.report(node, "please add comments for state");
                }
              });
            }
          }
        }
      }
    };
  }
};
