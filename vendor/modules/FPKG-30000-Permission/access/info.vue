<template>
  <div>
    <el-table
      v-loading="$store.state.loading.isShow"
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
            <span v-for="i in scope.row.layer" :key="i"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
            >
            {{ $i18n.global.t(`Permission.${scope.row.p4_node_code}`) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(rolename, key) in role"
        prop="p5_role_name"
        :index="rolename.p5_role_id"
        :key="key"
        :label="rolename.p5_role_name"
        header-align="center"
        width="200px"
      >
        <template #default="role">
          <div class="d-flex justify-content-around">
            <span>
              <icon
                :class="
                  checkedData[role.row.p4_node_id][role.column.index][0] === 4
                    ? 'text-info'
                    : 'text-disabled'
                "
                class="iconItem"
                icon="fas fa-eye"
              />
            </span>
            <span>
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
            <span>
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
            <span>
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

export default defineComponent({
  name: "permission",
  props: {
    node: Array,
    role_node_f: Array,
  },
  setup(props, context) {
    const { screenWidth, store, proxy, CRUD } = utilTools();
    const contentSize = inject("contentSize");

    const data: any = reactive({
      node: null,
      role: [],
      roleList: [],
      checkedData: [],
      dialogRole: false,
    });

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

    onMounted(() => {
      getPermission();
      proxy.$bus.$on("modify", (params: any) => {
        proxy.$router.push({ name: "access-modify" });
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
    };
  },
});
</script>




<style lang="scss" scoped>
.iconItem {
  font-size: 1.2rem;
}
</style>
