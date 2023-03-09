const ruleRouter = {
  route: null,
  name: null,
  title: '规范管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/rule/', // 文件路径
  order: 6,
  inNav: true,
  children: [
    {
      title: '规范列表',
      type: 'view',
      name: 'NoteCreate',
      route: '/rule/list',
      filePath: 'view/rule/rule-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '添加规范',
      type: 'view',
      name: 'NoteCreate',
      route: '/rule/add',
      filePath: 'view/rule/rule.vue',
      inNav: true,
      icon: 'iconfont icon-add',
    },
  ],
}

export default ruleRouter
