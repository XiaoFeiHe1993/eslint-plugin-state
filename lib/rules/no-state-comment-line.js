module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "please add comment line for state",
      recommended: true
    }
  },
  create: function(context) {
    return {
      AssignmentExpression(node) {
        const {left, right} = node;
        // state = {}
        if (left && left.type === 'Identifier' && left.name === 'state') {
          // 情况一：注释加载变量的上面
          if (right && right.properties) {
            const {properties} = right;
            properties.map((item) => {
              // context.report(node, "please add comment line for state");
            });
          }

          // 情况二：注释加载逗号后面
        }

        // this.state = {}
        if (left && left.type === 'MemberExpression') {
          // 情况一：注释加载变量的上面

          // 情况二：注释加载逗号后面
        }
      }
    };
  }
};
