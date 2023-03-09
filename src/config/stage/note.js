const noteRouter = {
  route: null,
  name: null,
  title: '通知管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/note/', // 文件路径
  order: 3,
  inNav: true,
  permission: ['超级管理员独有权限'],
  children: [
    {
      title: '通知列表',
      type: 'view',
      name: 'NoteCreate',
      route: '/note/list',
      filePath: 'view/note/note-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
      permission: ['超级管理员独有权限'],
    },
    {
      title: '添加通知',
      type: 'view',
      name: 'NoteCreate',
      route: '/note/add',
      filePath: 'view/note/note.vue',
      inNav: true,
      icon: 'iconfont icon-add',
      permission: ['超级管理员独有权限'],
    },
  ],
}

export default noteRouter
