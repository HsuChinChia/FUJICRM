const THEME_NAME = process.env.VUE_APP_THEME;
const Theme = localStorage.getItem('Theme');

export default [
  {
    path: '/blacklist',
    component: () =>
      import(
      /* webpackChunkName: "paymentFlow" */ `@/modules/FPKG-10000-Theme/layout/${Theme === null ? 'DEFAULT' : Theme
        }/index.vue`
      ),
    children: [
      {
        path: 'config/lists',
        name: 'config-lists',
        component: () =>
          import(/* webpackChunkName: "Blacklist" */ './config/lists.vue'),
        props: true,
        meta: {
          title: 'NODE_105',
          url: 'blacklist/config/lists',
          toolbar: ['search', 'advSearch', 'delete', 'create'],
          placeholder: 'Blacklist.content',
        },
      },
    ],
  },
];
