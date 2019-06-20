const searchComments = (context, node, text) => {
  // 情况一：注释加在变量的上面
  const leadingComments = !node.leadingComments || node.leadingComments.length <= 0;
  // 情况二：注释加在后面
  const trailingComments = !node.trailingComments || node.trailingComments.length <= 0;
  // 情况三：注释在逗号后面，并且要判断是不是在下一个变量后面
  let existComments = false;
  let nextNode = null;
  const comments = context.getAllComments();
  if (comments && comments.length > 0) {
    // 找出下一个变量
    if (node.parent && node.parent.properties) {
      const {properties} = node.parent;
      for (let i = 0; i < properties.length - 1; i++) {
        if (node.start === properties[i].start && node.end === properties[i].end) {
          nextNode = properties[i + 1];
        }
      }
    }
    // 判断注释的位置
    comments.map((item) => {
      if (item.start > node.end && item.start > node.parent.start && item.end < node.parent.end) {
        existComments = true;
        // 如果该注释在下一个变量后面
        if (nextNode && item.start > nextNode.end) {
          existComments = false;
        }
      }
    });
  }
  if (leadingComments && trailingComments && !existComments) {
    context.report(node, text);
  }
};

// react error text
const REACT_STATE_TEXT = 'please add comments for state variate';

// vue error text
const VUE_DATA_TEXT = 'please add comments for data variate';

module.exports = {
  searchComments,
  REACT_STATE_TEXT,
  VUE_DATA_TEXT,
}
