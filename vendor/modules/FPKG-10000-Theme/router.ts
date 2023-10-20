
const Theme = localStorage.getItem('Theme');

const router = [
  {
    path: '/theme',
    component: () => import(/* webpackChunkName: "Theme" */`@/modules/FPKG-10000-Theme/layout/${Theme === null ? 'DEFAULT' : Theme}/index.vue`),
    children: [
    ],
    meta: {
      title: 'NODE_2',
      url: 'account/manage/lists',
      toolbar: ['search', 'advSearch', 'pager', 'create', 'delete'],
    },
  },
];

export default router;
