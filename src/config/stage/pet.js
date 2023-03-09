const petRouter = {
  route: null,
  name: null,
  title: '宠物信息',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/pet/', // 文件路径
  order: 4,
  inNav: true,
  children: [
    {
      title: '宠物信息列表',
      type: 'view',
      name: 'NoteCreate',
      route: '/pet/list',
      filePath: 'view/pet/pet-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '添加宠物',
      type: 'view',
      name: 'NoteCreate',
      route: '/pet/add',
      filePath: 'view/pet/pet.vue',
      inNav: true,
      icon: 'iconfont icon-add',
    },
  ],
}

export default petRouter
