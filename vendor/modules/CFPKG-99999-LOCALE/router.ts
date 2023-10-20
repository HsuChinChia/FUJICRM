const Theme = localStorage.getItem('Theme');

export default [
  {
    path: '/test',
    component: () =>
      import(/* webpackChunkName: "TradeUnionInfo" */ './TEST.vue'),

    children: [
    ],
  },
];
