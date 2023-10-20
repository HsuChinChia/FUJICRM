const Theme = localStorage.getItem('Theme');

// 客製化路徑
const CUSTOM_ACCOUNT_FOLDER = process.env.VUE_APP_CUSTOM_ACCOUNT_FOLDER;
const VUE_APP_NAME = process.env.VUE_APP_NAME;
console.log('VUE_APP_NAME', VUE_APP_NAME);







export default [




  // {
  //   path: '/permission',
  //   component: () => import(/* webpackChunkName: "Theme" */`@/modules/FPKG-10000-Theme/layout/${Theme === null ? 'DEFAULT' : Theme}/index.vue`),
  //   children: [
  //     // 權限
  //     {
  //       path: 'access/info',
  //       name: 'access-info',
  //       component: () => import(/* webpackChunkName: "permission" */'./Permission/access/info.vue'),
  //       meta: {
  //         title: 'NODE_4',
  //         url: 'permission/access/info',
  //         toolbar: ['modify', 'role'],
  //       },
  //     },
  //     {
  //       path: 'access/modify',
  //       name: 'access-modify',
  //       component: () => import(/* webpackChunkName: "permission" */'./Permission/access/modify.vue'),
  //       meta: {
  //         title: 'NODE_4',
  //         url: 'permission/access/info',
  //         toolbar: ['info', 'save', 'role'],
  //       },
  //     },
  //     {
  //       path: 'role/lists',
  //       name: 'role-lists',
  //       component: () => import(/* webpackChunkName: "permission" */'./Permission/role/lists.vue'),
  //       meta: {
  //         description: 'Longways.permission.role_description',
  //         topic: 'Longways.permission.role',
  //         title: 'NODE_3',
  //         url: 'permission/role/lists',
  //         toolbar: ['search', 'advSearch', 'pager', 'create', 'delete'],
  //       },
  //     },
  //     {
  //       path: 'role/info/:p5_role_id',
  //       name: 'role-info',
  //       component: () => import(/* webpackChunkName: "permission" */'./Permission/role/info.vue'),
  //       meta: {
  //         backtrack: true,
  //         title: 'NODE_3',
  //         url: 'permission/role/lists',
  //         toolbar: ['modify'],
  //       },
  //     },
  //     {
  //       path: 'role/modify/:p5_role_id',
  //       name: 'role-modify',
  //       component: () => import(/* webpackChunkName: "permission" */'./Permission/role/modify.vue'),
  //       meta: {
  //         backtrack: true,
  //         title: 'NODE_3',
  //         url: 'permission/role/lists',
  //         toolbar: ['save', 'delete', 'info'],
  //       },
  //     },
  //   ],
  // },



  // {
  //   path: '/longways',
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "Account" */ `@/modules/FPKG-10000-Theme/layout/${Theme === null ? 'DEFAULT' : Theme
  //       }/index.vue`
  //     ),
  //   children: [

  //   ],
  // },
];
