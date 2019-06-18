module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "please add comments for state variate",
      recommended: true
    }
  },
  create: function (context) {
    searchComments = (node) => {
      // 情况一：注释加在变量的上面
      const leadingComments = !node.leadingComments || node.leadingComments.length <= 0;
      // 情况二：注释加在后面
      const trailingComments = !node.trailingComments || node.trailingComments.length <= 0;
      // 情况三：注释在逗号后面
      let existComments = false;
      const comments = context.getAllComments();
      if (comments && comments.length > 0) {
        comments.map((item) => {
          if (item.start > node.end && item.start > node.parent.start && item.end < node.parent.end) {
            existComments = true;
          }
        });
      }
      if (leadingComments && trailingComments && !existComments) {
        context.report(node, "please add comments for state variate");
      }
    };

    return {
      Property(node) {
        const {parent} = node;
        if (parent && parent.type === 'ObjectExpression') {
          const grandNode = parent.parent;
          if (grandNode && grandNode.type === 'AssignmentExpression') {
            // state = {}
            if (grandNode.left && grandNode.left.name === 'state') {
              searchComments(node);
            }
            // this.state = {}
            if (grandNode.left && grandNode.left.type === 'MemberExpression') {
              const {property} = grandNode.left;
              if (property && property.name === 'state') {
                searchComments(node);
              }
            }
          }
          if (grandNode && grandNode.type === 'ClassProperty') {
            // state = {}
            if (grandNode.key && grandNode.key.name === 'state') {
              searchComments(node);
            }
          }
        }
      }
    };
  }
};
