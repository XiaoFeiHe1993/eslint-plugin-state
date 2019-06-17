module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "中国大陆工时规管现况（标准工时）： 一天工作时间为 8 小时，平均每周工时不超过 40 小时",
      category: "中华人民共和国劳动法",
      recommended: true
    }
  },
  create: function(context) {
    return {
      Program(node) {
        const hours = new Date().getHours();
        const dayOfWeek = new Date().getDay();

        if (hours < 9) {
          context.report(node, "每天 9:00 之前禁止代码变更");
        }

        if (hours > 18) {
          context.report(node, "每天 18:00 之后禁止代码变更");
        }

        if (dayOfWeek === 0 || dayOfWeek === 6) {
          context.report(node, "周六周日 禁止代码变更");
        }
      }
    };
  }
};
