module.exports = {
  // 扩展配置 ： '@commitlint/config-conventional'。 这表示该配置会基于它，进行自定义设置
  extends: ['@commitlint/config-conventional'],
  rules: {
    // "type-enum" 规则，它需要的提交信息类型
    // 数组参数解释：
    // 1. 2 转换为 level，表示如果发生错误，将停止提交，因为这是一个严重的问题
    // 2. "always" 转换为 applicable，意味着此规则总是应用的
    // 3. 提交类型数组，它指定了哪些提交消息类型是允许的
    'type-enum': [
      2,
      'always',
      [
        'build', // 影响构建系统或外部依赖的更改（例如：gulp，broccoli，npm）
        'ci', // 更改我们的持续集成文件和脚本（例如：Travis，Circle等）
        'chore', // 更新grunt任务等
        'docs', // 文档更改
        'feat', // 新功能
        'fix', // 修补bug
        'perf', // 提高性能的代码更改
        'refactor', // 既不修复错误也不添加功能的代码更改
        'revert', // 回滚先前的提交
        'style', // 不影响代码含义的更改（空格，格式化，缺少分号等）
        'test', // 增加测试
        'addLog', // 日志添加
      ],
    ],
  },
}
