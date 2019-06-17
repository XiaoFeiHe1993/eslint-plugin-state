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
        const tokens = context.getTokens(node);
        console.log(tokens);
        const {left, right} = node;
        // state = {}
        if (left && left.type === 'Identifier' && left.name === 'state') {
          // 情况一：注释加在变量的上面
          if (right && right.type === 'ObjectExpression' && right.properties) {
            const {properties} = right;
            let commentIndex = -1;
            properties.map((item) => {
              tokens.map((temp, index) => {
                console.log('type:', temp.type);
                if (item.start === temp.start) {
                  commentIndex = index;
                }
              });
              console.log('commentIndex:', commentIndex);
              console.log('commentIndex:', tokens[commentIndex - 1].type);
              if (commentIndex < 0 || tokens[commentIndex - 1].type !== 'CommentLine') {
                context.report(node, "please add comment line for state");
              }
            });
          }

          // 情况二：注释加在逗号后面
          if (right && right.type === 'ObjectExpression' && right.properties) {
            const {properties} = right;
            properties.map((item) => {
              // context.report(node, "please add comment line for state");
            });
          }
        }

        // this.state = {}
        if (left && left.type === 'MemberExpression') {
          if (left.property && left.property.type === 'Identifier' && left.property.name === 'state') {
            // 情况一：注释加载变量的上面

            // 情况二：注释加载逗号后面
          }
        }
      }
    };
  }
};
