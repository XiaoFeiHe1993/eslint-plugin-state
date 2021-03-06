const searchComments = (context, node, text) => {
  // 情况一：注释加在变量的上面
  const leadingComments = !node.leadingComments || node.leadingComments.length <= 0;
  // 情况二：注释加在后面
  const trailingComments = !node.trailingComments || node.trailingComments.length <= 0;
  // 情况三：注释在逗号后面，并且要判断是不是在下一个变量后面
  let existComments = false;
  let nextNode = null;
  let beforeBode = null;
  const comments = context.getAllComments();
  if (comments && comments.length > 0) {
    if (node.parent && node.parent.properties) {
      const {properties} = node.parent;
      // 找出下一个变量
      for (let i = 0; i < properties.length - 1; i++) {
        if (node.start === properties[i].start && node.end === properties[i].end) {
          nextNode = properties[i + 1];
        }
      }
      // 找出上一个变量
      for (let k = 1; k < properties.length; k++) {
        if (node.start === properties[k].start && node.end === properties[k].end) {
          beforeBode = properties[k - 1];
        }
      }
    }

    // 判断注释的位置
    comments.map((item) => {
      // 注释在节点后面
      if (item.start > node.end && item.start > node.parent.start && item.end < node.parent.end) {
        if (nextNode && item.end < nextNode.start) {
          existComments = true;
        } else if (!nextNode) {
          existComments = true;
        }
      }
      // 注释在节点前面
      if (item.end < node.start && item.start > node.parent.start && item.end < node.parent.end) {
        if (beforeBode && item.start > beforeBode.end) {
          existComments = true;
        } else if (!beforeBode) {
          existComments = true;
        }
      }
    });
  }
  if (!existComments) {
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
