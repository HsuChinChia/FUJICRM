/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import TreeMaker from '../converter/treeMaker';
import $http from '@/modules/FPKG-230000-BackendCore/prototypes/axios'; // 後端溝通
import errorCode from '../../../errorCode'; // 進行後端error code提示


type crud = number // crud




// validate
class Modify {
  private request: any;

  constructor(request?: object) {
    this.request = request;
  }

  public async get(): Promise<object> {
    const params = this.request;
    const res = await $http.get('permission/role/info', { params });
    if (res.data.code === 0) {
      const result: any = res.data.response;
      result.node_f = formater(res.data.response.node);
      /** 將目前角色的權限格式化並輸出 */
      const user_nodes = res.data.response.role_node
        .map(role_node_formater)
        .reduce(role_node_reducer, []);

      const role_node_f = InitNodes(result.node_f, user_nodes); // 再度格式化，填補空欄位
      result.role_node_f = role_node_f;
      return result;

    } try {
      throw errorCode(res.data);
    } catch (error) {
      return {};
    }


    // const getter = RPC.modify(this.request);
    // /* render to view */
    // return getter
    //   .then((res: MODIFY.AxiosResponse) => {
    //     const result: any = res.data.response;
    //     result.node_f = formater(res.data.response.node);

    //     /** 將目前角色的權限格式化並輸出 */
    //     const user_nodes = res.data.response.role_node
    //       .map(role_node_formater)
    //       .reduce(role_node_reducer, []);

    //     const role_node_f = InitNodes(result.node_f, user_nodes); // 再度格式化，填補空欄位
    //     result.role_node_f = role_node_f;
    //     return result;
    //   });
  }
}



export default Modify;

/** 回傳的單獨角色權限格式化 */
export function role_node_formater(node: any): node_f {
  const crud = node.p5_rnp_crud;
  const id = node.p5_rnp_p4_node_id;
  return { crud, id };
}


/** 將回傳的總NODE格式化 by NICK */
function formater(node: any) {
  const tree = new TreeMaker(node);
  return tree.result;
}

type node_f = { id: number, crud: number }

/**
 * 將該角色的權限與nodeID轉換
 * 變成 **以nodeID為index的陣列**
*/
function role_node_reducer(prev: crud[][], cur: node_f): crud[][] {
  const reduce = prev;
  const index = cur.id;
  reduce[index] = setCrud(cur.crud);
  return reduce;
}

/** 將純數字的crud，其權限值拆分轉換為 [4, 8, 2, 1] */
function setCrud(crud: number): number[] {
  const result = [];
  if (crud & 4) { result[0] = 4; }
  if (crud & 8) { result[1] = 8; }
  if (crud & 2) { result[2] = 2; }
  if (crud & 1) { result[3] = 1; }
  return result;
}

/** 進行空欄位項目的填補 */
function InitNodes(allNodes: any, curNodes: crud[][]): crud[][] {
  const resultNodes = curNodes;
  const nodeIDs: number[] = allNodes.map((x: any) => x.p4_node_id);
  nodeIDs.forEach((id) => {
    const exist = resultNodes[id];
    if (!exist) resultNodes[id] = [];
  });
  return resultNodes;
}
