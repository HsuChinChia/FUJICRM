import $store from '@/modules/FPKG-50000-Vuex/index'; // lists 與axios溝通
import $http from '@/modules/FPKG-230000-BackendCore/prototypes/axios'; // lists 與axios溝通
// import IconRoute from '@/modules/FPKG-40000-Account/login/IconRoute.json';

const IconRoute = [] as any;
interface data {
  name?: string;
  path?: string;
  lang?: string;
  ring?: boolean;
}


const action = (node: any, parentId: number, layer = 1) => {
  const push = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const item of node) {
    if (item != null && item.p4_node_pid === parentId) {
      item.layer = layer;
      item.index = item.p4_node_route
        ? `/${item.p4_node_route}`
        : `${item.p4_node_id}`;
      item.subs = action(node, item.p4_node_id, layer + 1);
      push.push(item);
    }
  }
  return push;
}

// 開始將扁平化路由變成樹
// eslint-disable-next-line class-methods-use-this
const start = async (node: any) => {
  const tree = [];
  for (const item of node) {
    if (!item.p4_node_pid) {
      item.subs = action(node, item.p4_node_id);
      item.index = item.p4_node_route
        ? `/${item.p4_node_route}`
        : `${item.p4_node_id}`;

      item.layer = 0;
      tree.push(item);
    }
  }
  return tree;
}




const socket = async (data: data) => {
  const user = await $http.get('frontendAdapter/common/backstage');
  const userInfo = user.data.response;
  const node: any = userInfo.p5_role_node.sort(
    (a: any, b: any) => a.p4_node_sort - b.p4_node_sort
  );
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  // 拿出本地ICON路由表 添加上去
  for (const route of node) {
    for (const icon of IconRoute) {
      if (route.p4_node_code === icon.p4_node_code) {
        route.icon = icon.icon;
      }
    }
  }
  // 做跟登入一樣的事整理節點
  const nodeList = JSON.stringify(node);
  localStorage.setItem('Node', nodeList);
  const nodeTree: any = await start(node);
  // 整理成樹再存進localStorage
  localStorage.setItem('NodeTree', JSON.stringify(nodeTree));
  $store.dispatch('userInfo', userInfo);
};



export default { socket };
