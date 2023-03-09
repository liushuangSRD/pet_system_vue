const manageRouter = {
  route: null,
  name: null,
  title: '宠物管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/manage/', // 文件路径
  order: 10,
  inNav: true,
  children: [
    {
      route: null,
      name: null,
      title: '宠物寄养',
      type: 'folder', // 类型: folder, tab, view
      icon: 'iconfont icon-tushuguanli',
      filePath: 'view/manage/', // 文件路径
      order: 1,
      inNav: true,
      children:[
        {
          title: '寄养列表',
          type: 'view',
          name: 'NoteCreate',
          route: '/farm/list',
          filePath: 'view/manage/farm-list.vue',
          inNav: true,
          icon: 'iconfont icon-tushuguanli',
        },
    
        {
          title: '添加寄养',
          type: 'view',
          name: 'NoteCreate',
          route: '/farm/add',
          filePath: 'view/manage/farm.vue',
          inNav: true,
          icon: 'iconfont icon-add',
        }, 
      ]
    },
    {
      route: null,
      name: null,
      title: '宠物领养',
      type: 'folder', // 类型: folder, tab, view
      icon: 'iconfont icon-tushuguanli',
      filePath: 'view/manage/', // 文件路径
      order: 2,
      inNav: true,
      children:[
        {
          title: '宠物领养',
          type: 'view',
          name: 'NoteCreate',
          route: '/adoption/list',
          filePath: 'view/manage/adoption-list.vue',
          inNav: true,
          icon: 'iconfont icon-tushuguanli',
        },
        {
          title: '添加领养',
          type: 'view',
          name: 'NoteCreate',
          route: '/adoption/add',
          filePath: 'view/manage/adoption.vue',
          inNav: true,
          icon: 'iconfont icon-add',
        }, 
      ]
    },

    {
      route: null,
      name: null,
      title: '宠物健康',
      type: 'folder', // 类型: folder, tab, view
      icon: 'iconfont icon-tushuguanli',
      filePath: 'view/manage/', // 文件路径
      order: 3,
      inNav: true,
      children:[
        {
          title: '宠物健康',
          type: 'view',
          name: 'NoteCreate',
          route: '/health/list',
          filePath: 'view/manage/health-list.vue',
          inNav: true,
          icon: 'iconfont icon-tushuguanli',
        },
    
        {
          title: '添加健康',
          type: 'view',
          name: 'NoteCreate',
          route: '/health/add',
          filePath: 'view/manage/health.vue',
          inNav: true,
          icon: 'iconfont icon-add',
        },  
      ]
    },
  ],
}

export default manageRouter
