const petTypeRouter = {
  route: null,
  name: null,
  title: '宠物种类',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/petType/', // 文件路径
  order: 5,
  inNav: true,
  children: [
    {
      title: '宠物种类列表',
      type: 'view',
      name: 'NoteCreate',
      route: '/petType/list',
      filePath: 'view/petType/petType-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '添加宠物种类',
      type: 'view',
      name: 'NoteCreate',
      route: '/petType/add',
      filePath: 'view/petType/petType.vue',
      inNav: true,
      icon: 'iconfont icon-add',
    },
  ],
}

export default petTypeRouter
