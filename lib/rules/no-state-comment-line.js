const tool = require('../../utils/index');

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: tool.REACT_STATE_TEXT,
      recommended: true
    }
  },
  create: function (context) {
    return {
      Property(node) {
        const {parent} = node;
        if (parent && parent.type === 'ObjectExpression') {
          const grandNode = parent.parent;
          if (grandNode && grandNode.type === 'AssignmentExpression') {
            // state = {}
            if (grandNode.left && grandNode.left.name === 'state') {
              tool.searchComments(context, node, tool.REACT_STATE_TEXT);
            }
            // this.state = {}
            if (grandNode.left && grandNode.left.type === 'MemberExpression') {
              const {property} = grandNode.left;
              if (property && property.name === 'state') {
                tool.searchComments(context, node, tool.REACT_STATE_TEXT);
              }
            }
          }
          if (grandNode && grandNode.type === 'ClassProperty') {
            // state = {}
            if (grandNode.key && grandNode.key.name === 'state') {
              tool.searchComments(context, node, tool.REACT_STATE_TEXT);
            }
          }
        }
      }
    };
  }
};
