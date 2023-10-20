/* eslint-disable camelcase */
// import * as  MODIFY from '../../RPC/role-permission/declare/MODIFY'

export interface tree_result {
  p3_bne_id: number
  p3_bne_name: string
  p3_bne_p3_bch_id: number
  p3_bne_p4_node_id: number
  /** 排序 */
  p3_bne_sort: number
  p4_node: p4_node
}

export interface p4_node {
  layer: number
  layer2: number | null
  p4_node_id: number
  p4_node_memo: string | null
  p4_node_name: string
  p4_node_pid: number
  p4_node_route: null
  p4_node_sort: number
  p4_node_status: '3' | '-2'
  subs: tree_result[]
}

class treeMaker {
  public node: any = []

  constructor(node: p4_node[]) {
    this.node = node;
  }

  public async getPermission() {
    // 將Node變成樹
    const nodeTree: any = this.start(this.node);
    // 在將樹解呈扁平化
    const nodeData: any = [];
    this.reNode(nodeData, nodeTree);
    this.node = nodeData;
  }

  get result(): tree_result[] {
    // 將Node變成樹
    const nodeTree: any = this.start(this.node);
    // 在將樹解呈扁平化
    const nodeData: any = [];
    this.reNode(nodeData, nodeTree);
    return nodeData;
  }

  // 開始將扁平化路由變成樹
  // eslint-disable-next-line class-methods-use-this
  private start(node: p4_node[]) {
    const tree = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const item of node) {
      if (!item.p4_node_pid) {
        const newItem: any = item;
        newItem.subs = this.action(node, item.p4_node_id);
        newItem.layer = 0;
        tree.push(newItem);
      }
    }
    return tree;
  }

  private action(node: p4_node[], parentId: number, layer: number = 1) {
    const push = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const item of node) {
      if (item !== null && item.p4_node_pid === parentId) {
        const newItem: any = item;
        newItem.layer = layer;
        newItem.subs = this.action(
          node,
          item.p4_node_id,
          layer + 1,
        );
        push.push(newItem);
      }
    }
    return push;
  }

  /**
  * 解樹
  */
  private reNode(node: any, nodeTree: any) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of nodeTree) {
      node.push(item);
      if (item.subs) {
        item.layer2 = item.subs.length === 0 ? -1 : null;
        this.reNode(node, item.subs);
      }
    }
  }
}

export default treeMaker;
