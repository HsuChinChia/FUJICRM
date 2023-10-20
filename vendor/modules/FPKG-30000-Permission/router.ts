
const Theme = localStorage.getItem('Theme');


const route = [
  {
    path: '/permission',
    component: () => import(/* webpackChunkName: "Theme" */`@/modules/FPKG-10000-Theme/layout/${Theme === null ? 'DEFAULT' : Theme}/index.vue`),
    children: [
      // 權限
      {
        path: 'access/info',
        name: 'access-info',
        component: () => import(/* webpackChunkName: "permission" */'@/modules/FPKG-30000-Permission/access/info.vue'),
        meta: {
          title: 'NODE_4',
          url: 'permission/access/info',
          toolbar: ['modify', 'role'],
        },
      },
      {
        path: 'access/modify',
        name: 'access-modify',
        component: () => import(/* webpackChunkName: "permission" */'@/modules/FPKG-30000-Permission/access/modify.vue'),
        meta: {
          title: 'NODE_4',
          url: 'permission/access/info',
          toolbar: ['info', 'save', 'role'],
        },
      },
      {
        path: 'role/lists',
        name: 'role-lists',
        component: () => import(/* webpackChunkName: "permission" */'@/modules/FPKG-30000-Permission/role/lists.vue'),
        meta: {
          title: 'NODE_3',
          url: 'permission/role/lists',
          toolbar: ['search', 'advSearch', 'pager', 'create', 'delete'],
        },
      },
      {
        path: 'role/info/:p5_role_id',
        name: 'role-info',
        component: () => import(/* webpackChunkName: "permission" */'@/modules/FPKG-30000-Permission/role/info.vue'),
        meta: {
          title: 'NODE_3',
          url: 'permission/role/lists',
          toolbar: ['modify'],
        },
      },
      {
        path: 'role/modify/:p5_role_id',
        name: 'role-modify',
        component: () => import(/* webpackChunkName: "permission" */'@/modules/FPKG-30000-Permission/role/modify.vue'),
        meta: {
          title: 'NODE_3',
          url: 'permission/role/lists',
          toolbar: ['save', 'delete', 'info'],
        },
      },
    ],
  },
];

export default route;
