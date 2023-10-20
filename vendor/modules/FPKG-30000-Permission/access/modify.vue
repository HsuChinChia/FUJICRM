<template>
  <div>
    <el-table
      v-loading="store.state.loading.isShow"
      :data="node"
      :height="contentSize.height"
      :width="contentSize.width"
      highlight-current-row
      fit
      border
      ref="modifyTable"
    >
      <!-- eslint-disable-next-line max-len -->
      <el-table-column
        fixed="left"
        header-align="center"
        width="200"
        prop="p4_node.p4_node_name"
        :label="$i18n.global.t('Permission.node')"
      >
        <template #default="scope">
          <div>
            <!-- eslint-disable-next-line max-len -->
            <span v-for="i in scope.row.layer" :key="i"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
            >
            {{ $i18n.global.t(`Permission.${scope.row.p4_node_code}`) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-for="rolename in role"
        prop="p5_role_name"
        :index="rolename.p5_role_id"
        :key="rolename.p5_role_id"
        :label="rolename.p5_role_name"
        header-align="center"
        width="200px"
      >
        <template v-slot:header="{}">
          <span class="d-flex justify-content-center align-items-center">
            <input
              type="checkbox"
              name="vehicle3"
              value="Boat"
              @change="handleChange($event, rolename.p5_role_id)"
            />
            {{ rolename.p5_role_name }}
          </span>
        </template>
        <template #default="role">
          <div class="d-flex justify-content-around">
            <span @click="read(role.row.p4_node_id, role.column.index)">
              <icon
                :class="
                  checkedData[role.row.p4_node_id][role.column.index].includes(
                    4
                  )
                    ? 'text-info'
                    : 'text-disabled'
                "
                class="iconItem"
                icon="fas fa-eye"
              />
            </span>
            <span @click="create(role.row.p4_node_id, role.column.index)">
              <icon
                :class="
                  checkedData[role.row.p4_node_id][role.column.index][1] === 8
                    ? 'text-success'
                    : 'text-disabled'
                "
                class="iconItem"
                icon="fas fa-plus"
              />
            </span>
            <span @click="modify(role.row.p4_node_id, role.column.index)">
              <icon
                :class="
                  checkedData[role.row.p4_node_id][role.column.index][2] === 2
                    ? 'text-primary'
                    : 'text-disabled'
                "
                class="iconItem"
                icon="fas fa-edit"
              />
            </span>
            <span @click="Delete(role.row.p4_node_id, role.column.index)">
              <icon
                :class="
                  checkedData[role.row.p4_node_id][role.column.index][3] === 1
                    ? 'text-danger'
                    : 'text-disabled'
                "
                class="iconItem"
                icon="far fa-trash-alt"
              />
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogRole"
      :title="$i18n.global.t('Util.role')"
      custom-class="RWD-Dialog"
    >
      <el-checkbox-group v-model="role" size="small">
        <el-checkbox-button
          v-for="(role, index) in roleList"
          :label="role"
          :key="index"
          >{{ role.p5_role_name }}</el-checkbox-button
        >
      </el-checkbox-group>
    </el-dialog>
  </div>
</template>
<script lang='ts'>
import {
  watch,
  defineComponent,
  ref,
  reactive,
  toRefs,
  onMounted,
  inject,
} from "vue";
import { utilTools } from "@/modules/FPKG-20000-Util/prototypes/utilTools";
import $http from "@/modules/FPKG-230000-BackendCore/prototypes/axios";
import Qs from "qs";

export default defineComponent({
  name: "permission",
  props: {
    node: Array,
    role_node_f: Array,
  },
  setup(props, { root }: any) {
    const { screenWidth, store, proxy, CRUD } = utilTools();
    const contentSize = inject("contentSize");

    const data: any = reactive({
      node: null,
      role: [],
      roleList: [],
      checkedData: [],
      dialogRole: false,
    });

    /** 代替IE無法使用find */
    const IEFind = (items: any, key: number) => {
      const result = items.filter((item: any) => item.p4_node_id === key);
      if (result.length) {
        return result[0];
      }
      return null;
    };

    /**
     * 尋找爸爸之旅
     */
    const findPid = (pidArr: Array<number>, PidData: any) => {
      // 拿當前nodeID從樹尋找
      if (PidData.p4_node_pid !== null) {
        pidArr.push(PidData.p4_node_pid);
        const PidData2 = data.node.filter(
          (item: any) => item.p4_node_id === PidData.p4_node_pid
        );
        if (PidData2.length && typeof PidData2[0] === "object") {
          findPid(pidArr, PidData2[0]);
        }
      }
    };

    /**
     * 尋找孩子之旅
     */
    const findChid = (chidArr: Array<number>, Data: any) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of Data.subs) {
        chidArr.push(item.p4_node_id);
        if (item.subs) {
          findChid(chidArr, item);
        }
      }
    };

    /**
     * read
     */
    const read = (nodeID: number, roleId: number) => {
      const itemData = data.checkedData[nodeID][roleId];
      // 添加值上去
      if (itemData[0]) {
        const chidArr: never[] = [];
        const Data = IEFind(data.node, nodeID);

        itemData[0] = undefined;
        itemData[1] = undefined;
        itemData[2] = undefined;
        itemData[3] = undefined;

        findChid(chidArr, Data);
        // eslint-disable-next-line no-restricted-syntax
        for (const item of chidArr) {
          data.checkedData[item][roleId][0] = undefined;
          data.checkedData[item][roleId][1] = undefined;
          data.checkedData[item][roleId][2] = undefined;
          data.checkedData[item][roleId][3] = undefined;
        }
      } else {
        itemData[0] = 4;
        const pidArr: any = [];
        const chidArr: any = [];
        const PidData = IEFind(data.node, nodeID);
        findPid(pidArr, PidData);
        findChid(chidArr, PidData);
        const concat = pidArr.concat(chidArr);
        // eslint-disable-next-line no-restricted-syntax
        for (const item of concat) {
          data.checkedData[item][roleId][0] = 4;
        }
      }
    };

    /**
     * create
     */
    const create = (nodeID: any, roleId: any) => {
      const itemData = data.checkedData[nodeID][roleId];
      if (itemData[1]) {
        itemData[1] = undefined;
        const chidArr: any = [];
        const Data = IEFind(data.node, nodeID);
        findChid(chidArr, Data);
        // eslint-disable-next-line no-restricted-syntax
        for (const item of chidArr) {
          data.checkedData[item][roleId][1] = undefined;
        }
      } else {
        itemData[0] = 4;
        itemData[1] = 8;
        const pidArr: any = [];
        const chidArr: any = [];
        const PidData = IEFind(data.node, nodeID);
        findPid(pidArr, PidData);
        findChid(chidArr, PidData);
        const concat = pidArr.concat(chidArr);
        // eslint-disable-next-line no-restricted-syntax
        for (const item of concat) {
          data.checkedData[item][roleId][0] = 4;
          data.checkedData[item][roleId][1] = 8;
        }
      }
    };

    /**
     * modify
     */
    const modify = (nodeID: any, roleId: any) => {
      const itemData = data.checkedData[nodeID][roleId];
      if (itemData[2]) {
        itemData[2] = undefined;
        const chidArr: any = [];
        const Data = IEFind(data.node, nodeID);
        findChid(chidArr, Data);
        // eslint-disable-next-line no-restricted-syntax
        for (const item of chidArr) {
          data.checkedData[item][roleId][2] = undefined;
        }
      } else {
        itemData[0] = 4;
        itemData[2] = 2;
        const pidArr: any = [];
        const chidArr: any = [];
        const PidData = IEFind(data.node, nodeID);
        findPid(pidArr, PidData);
        findChid(chidArr, PidData);
        const concat = pidArr.concat(chidArr);
        // eslint-disable-next-line no-restricted-syntax
        for (const item of concat) {
          data.checkedData[item][roleId][0] = 4;
          data.checkedData[item][roleId][2] = 2;
        }
      }
    };

    /**
     * Delete
     */
    const Delete = (nodeID: any, roleId: any) => {
      const itemData = data.checkedData[nodeID][roleId];
      if (itemData[3]) {
        itemData[3] = undefined;
        const chidArr: any = [];
        const Data = IEFind(data.node, nodeID);
        findChid(chidArr, Data);
        // eslint-disable-next-line no-restricted-syntax
        for (const item of chidArr) {
          data.checkedData[item][roleId][3] = undefined;
        }
      } else {
        itemData[0] = 4;
        itemData[3] = 1;
        const pidArr: any = [];
        const chidArr: any = [];
        const PidData = IEFind(data.node, nodeID);
        findPid(pidArr, PidData);
        findChid(chidArr, PidData);
        const concat = pidArr.concat(chidArr);
        // eslint-disable-next-line no-restricted-syntax
        for (const item of concat) {
          data.checkedData[item][roleId][0] = 4;
          data.checkedData[item][roleId][3] = 1;
        }
      }
    };

    const handleChange = (e: any, index: number) => {
      if (e.target.checked) {
        Object.keys(data.node).forEach((item) => {
          data.checkedData[data.node[item].p4_node_id][index] = [4, 8, 2, 1];
        });
      } else {
        Object.keys(data.node).forEach((item) => {
          data.checkedData[data.node[item].p4_node_id][index] = [];
        });
      }
    };

    const hasPermission = (nodeCrud: number[] = [], crud: number): boolean => {
      const self = this;
      const exist = nodeCrud.filter((c: any) => c === crud);
      if (exist.length) {
        return true;
      }
      return false;
    };

    const action = (node: any, parentId: number, layer = 1) => {
      const push = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const item of node) {
        if (item != null && item.p4_node_pid === parentId) {
          item.layer = layer;
          item.subs = action(node, item.p4_node_id, layer + 1);
          push.push(item);
        }
      }
      return push;
    };

    /** 開始將扁平化路由變成樹 */
    const start = (node: any) => {
      const tree = [];
      for (const item of node) {
        if (!item.p4_node_pid) {
          item.subs = action(node, item.p4_node_id);
          item.layer = 0;
          tree.push(item);
        }
      }

      return tree;
    };

    /**
     * 解樹
     */
    const reNode = (node: any, nodeTree: any) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of nodeTree) {
        node.push(item);
        if (item.subs) {
          item.layer2 = item.subs.length === 0 ? -1 : null;
          reNode(node, item.subs);
        }
      }
    };

    /**
     * getPermission
     */
    const getPermission = async () => {
      const res = await $http.get("permission/access/info");
      data.roleList = res.data.response.role;

      // this.node = res.data.response.node;
      // 將Node變成樹
      const nodeTree: any = start(res.data.response.node);
      // 在將樹解呈扁平化
      const nodeData: any = [];
      reNode(nodeData, nodeTree);
      data.node = nodeData;
      // 建立一個多維陣列 第一維:樹的ID 第二維:角色ID
      // eslint-disable-next-line no-restricted-syntax
      for (const nodeKey of data.node) {
        data.checkedData[nodeKey.p4_node_id] = [];
        for (const roleKey of data.roleList) {
          data.checkedData[nodeKey.p4_node_id][roleKey.p5_role_id] = [];
        }
      }

      // 取得以設定的資料
      const roleNode = res.data.response.role_node;

      // eslint-disable-next-line no-restricted-syntax
      for (const roleId in roleNode) {
        for (const item in roleNode[roleId]) {
          const CRUD: any = [];

          // eslint-disable-next-line no-bitwise
          const info =
            roleNode[roleId][item] & 0x4
              ? roleNode[roleId][item] & 0x4
              : undefined;
          CRUD[0] = info;
          const add =
            roleNode[roleId][item] & 0x8
              ? roleNode[roleId][item] & 0x8
              : undefined;
          CRUD[1] = add;
          const edit =
            roleNode[roleId][item] & 0x2
              ? roleNode[roleId][item] & 0x2
              : undefined;
          CRUD[2] = edit;
          const del =
            roleNode[roleId][item] & 0x1
              ? roleNode[roleId][item] & 0x1
              : undefined;
          CRUD[3] = del;
          data.checkedData[item][roleId] = CRUD;
        }
      }
    };

    const roleModify = async () => {
      const postData: any = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const key in data.checkedData) {
        if (data.checkedData[key].length !== 0) {
          // eslint-disable-next-line no-restricted-syntax
          for (const innerKey in data.checkedData[key]) {
            if (
              typeof data.checkedData[key][innerKey] !== "undefined" &&
              data.checkedData[key][innerKey].length > 0
            ) {
              if (postData[key] === undefined) {
                postData[key] = [];
              }
              let CRUD = 0;
              // eslint-disable-next-line no-restricted-syntax
              for (const CRUDKey of data.checkedData[key][innerKey]) {
                if (CRUDKey !== undefined) {
                  CRUD += CRUDKey;
                }
              }

              postData[key][innerKey] = CRUD;
            }
          }
        }
      }

      // eslint-disable-next-line camelcase
      const set_data = postData;
      const res = await $http.put(
        "permission/access/doModify",
        Qs.stringify({
          set_data,
        })
      );
    };

    onMounted(() => {
      getPermission();
      proxy.$bus.$on("info", (params: any) => {
        proxy.$router.push({ name: "access-info" });
      });

      proxy.$bus.$on("save", (params: any) => {
        roleModify();
      });
      proxy.$bus.$on("role", () => {
        proxy.dialogRole = true;
      });
    });

    const refData = toRefs(data);
    return {
      store,
      ...refData,
      hasPermission,
      contentSize,
      handleChange,
      read,
      create,
      modify,
      Delete,
    };
  },
});
</script>


<style lang="scss" scoped>
.iconItem {
  font-size: 1.2rem;
  &:hover {
    cursor: pointer;
  }
}
</style>
