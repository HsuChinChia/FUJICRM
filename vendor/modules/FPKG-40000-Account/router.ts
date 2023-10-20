const Theme = localStorage.getItem('Theme');

// 客製化路徑
const CUSTOM_ACCOUNT_FOLDER = process.env.VUE_APP_CUSTOM_ACCOUNT_FOLDER;
export default [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'NODE_LOGIN',
    },
    component: () =>
      import(
        /* webpackChunkName: "Account" */ '@/modules/FPKG-40000-Account/login/login.vue'
      ),
  },
  {
    path: '/account',
    component: () =>
      import(
        /* webpackChunkName: "Account" */ `@/modules/FPKG-10000-Theme/layout/${Theme === null ? 'DEFAULT' : Theme
        }/index.vue`
      ),
    children: [
      // {
      //   path: 'manage/test1',
      //   name: 'manage-test1',
      //   component: () => import(/* webpackChunkName: "Account" */'@/modules/FPKG-40000-Account/manage/test1.vue'),
      //   meta: {
      //     title: 'NODE_2',
      //     url: 'account/manage/lists',
      //     toolbar: ['search', 'advSearch', 'pager', 'create', 'delete'],
      //   },
      // },
      // {
      //   path: 'manage/test2',
      //   name: 'manage-test2',
      //   component: () => import(/* webpackChunkName: "Account" */'@/modules/FPKG-40000-Account/manage/test2.vue'),
      //   meta: {
      //     title: 'NODE_2',
      //     url: 'account/manage/lists',
      //     toolbar: ['search', 'advSearch', 'pager', 'create', 'delete'],
      //   },
      // },

      {
        path: 'manage/lists',
        name: 'manage-lists',
        component: () =>
          import(
            /* webpackChunkName: "Account" */ '@/modules/FPKG-40000-Account/manage/lists.vue'
          ),
        meta: {
          title: 'NODE_2',
          url: 'account/manage/lists',
          toolbar: ['search', 'advSearch', 'pager', 'create', 'delete'],
        },
      },
      {
        path: 'manage/create',
        name: 'account-Create',
        component: () => import(  /* webpackChunkName: "Account" */`@/modules/${CUSTOM_ACCOUNT_FOLDER || 'FPKG-40000-Account'}/manage/create.vue`),

        meta: {
          title: 'NODE_2',
          url: 'account/manage/lists',
          toolbar: ['keepCreate', 'saveAndGo'],
        },
      },

      {
        path: 'manage/modify',
        name: 'manage-modify',
        component: () => import( /* webpackChunkName: "Account" */`@/modules/${CUSTOM_ACCOUNT_FOLDER || 'FPKG-40000-Account'}/manage/modify.vue`),


        meta: {
          title: 'NODE_2',
          url: 'account/manage/lists',
          toolbar: ['save', 'info'],
        },
      },
      {
        path: 'manage/info',
        name: 'manage-info',
        component: () => import( /* webpackChunkName: "Account" */`@/modules/${CUSTOM_ACCOUNT_FOLDER || 'FPKG-40000-Account'}/manage/info.vue`),


        meta: {
          title: 'NODE_2',
          url: 'account/manage/lists',
          toolbar: ['modify'],
        },
      },
      {
        path: '/changePassword',
        name: 'changePassword',
        component: () =>
          import(
            /* webpackChunkName: "Account" */ './changePassword/modify.vue'
          ),
        meta: {
          title: 'NODE_2',
          url: 'account/manage/lists',
          // toolbar: ['save'],
        },
      },
      {
        path: 'record-login/lists',
        name: 'record-login/lists',
        component: () =>
          import(
            /* webpackChunkName: "Account" */ './record-login/lists.vue'
          ),
        meta: {
          title: 'NODE_102',
          url: 'account/record-login/lists',
          toolbar: ['search', 'advSearch', 'pager'],

        },
      },
    ],
  },
];
