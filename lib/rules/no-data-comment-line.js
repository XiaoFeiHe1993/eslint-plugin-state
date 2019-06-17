module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "please add comments for data variate",
      recommended: true
    }
  },
  create: function (context) {
    return {
      Property(node) {
        const {key, value} = node;
        if (key && key.name === 'data' && value && value.type === 'FunctionExpression') {
          console.log('?????????????------????????', key.name, value.type);
        }
      },
      ReturnStatement(node) {
        const {argument} = node;
        console.log('?????????????????????');
        if (argument && argument.type === 'ObjectExpression') {
          context.report(node, "please add comments for data variate");
        }
      }
    };
  }
};
