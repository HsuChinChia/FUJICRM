<template>
  <el-table
    v-loading="$store.state.loading.isShow"
    :data="node"
    highlight-current-row
    fit
    border
    ref="modifyTable"
  >
    <!-- eslint-disable-next-line max-len -->
    <el-table-column
      fixed="left"
      header-align="center"
      prop="p4_node.p4_node_name"
      :label="$i18n.global.t('Permission.node')"
    >
      <template #default="scope">
        <div>
          <span v-for="i in scope.row.layer" :key="i"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
          >
          <span v-if="scope.row.layer == 0">@</span>
          {{ $i18n.global.t(`Permission.${scope.row.p4_node_code}`) }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="p3_bre_name" header-align="center" width="200px">
      <template v-slot:header="{ $index }">
        <label class="d-flex justify-content-center align-items-center mb-0">
          <input
            type="checkbox"
            name="vehicle3"
            value="Boat"
            @change="handleAllChange($event, $index)"
          />
          {{ $i18n.global.t("Permission.role.allPermission") }}
        </label>
      </template>
      <template #default="role">
        <div class="d-flex justify-content-around">
          <button
            @click="setRead(role.row.p4_node_id)"
            type="button"
            class="reset"
          >
            <icon
              :class="
                role_node_f[role.row.p4_node_id].includes(4)
                  ? 'text-info'
                  : 'text-disabled'
              "
              class="iconItem text-info"
              icon="fas fa-eye"
            />
          </button>
          <button
            @click="setCreate(role.row.p4_node_id)"
            type="button"
            class="reset"
          >
            <icon
              :class="
                role_node_f[role.row.p4_node_id].includes(8)
                  ? 'text-success'
                  : 'text-disabled'
              "
              class="iconItem"
              icon="fas fa-plus"
            />
          </button>
          <button
            @click="setModify(role.row.p4_node_id)"
            type="button"
            class="reset"
          >
            <icon
              :class="
                role_node_f[role.row.p4_node_id].includes(2)
                  ? 'text-primary'
                  : 'text-disabled'
              "
              class="iconItem"
              icon="fas fa-edit"
            />
          </button>
          <button
            @click="setDelete(role.row.p4_node_id)"
            type="button"
            class="reset"
          >
            <icon
              :class="
                role_node_f[role.row.p4_node_id].includes(1)
                  ? 'text-danger'
                  : 'text-disabled'
              "
              class="iconItem"
              icon="far fa-trash-alt"
            />
          </button>
        </div>
      </template>
    </el-table-column>
  </el-table>
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

export default defineComponent({
  name: "role-permission",
  props: {
    node: [],
    role_node_f: [],
  },
  setup(props: any, context) {
    let { screenWidth, store, proxy, CRUD } = utilTools();
    const data: any = reactive({});

    const hasPermission = (nodeCrud: number[] = [], crud: number): boolean => {
      const exist = nodeCrud.filter((c: any) => c === crud);
      if (exist.length) {
        return true;
      }
      return false;
    };

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
    const findPid = (pidArr: Array<Number>, PidData: any) => {
      // 拿當前nodeID從樹尋找
      if (PidData.p4_node_pid !== null) {
        pidArr.push(PidData.p4_node_pid);
        const PidData2 = props.node.filter(
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
    const findChid = (chidArr: Array<Number>, Data: any) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of Data.subs) {
        chidArr.push(item.p4_node_id);
        if (item.subs) {
          findChid(chidArr, item);
        }
      }
    };

    /**
     * read crudkey = 4
     */
    const setRead = (nodeID: number) => {
      const itemData = props.role_node_f[nodeID];

      // 添加值上去
      if (hasPermission(itemData, 4)) {
        /** 已有read權限，取消所有權限 */
        itemData[0] = undefined;
        itemData[1] = undefined;
        itemData[2] = undefined;
        itemData[3] = undefined;
        const chidArr: any = [];
        const Data = IEFind(props.node, nodeID);
        findChid(chidArr, Data);
        for (const item of chidArr) {
          props.role_node_f[item][0] = undefined;
          props.role_node_f[item][1] = undefined;
          props.role_node_f[item][2] = undefined;
          props.role_node_f[item][3] = undefined;
        }
      } else {
        /** 加入權限 */
        itemData[0] = 4;
        // this.$set(itemData, 0, 4);
        const pidArr: any = [];
        const chidArr: any = [];
        const PidData = IEFind(props.node, nodeID);
        findPid(pidArr, PidData);
        findChid(chidArr, PidData);
        const concat = pidArr.concat(chidArr);
        for (const item of concat) {
          if (!props.role_node_f[item].filter((x: any) => x === 4).length) {
            props.role_node_f[item][0] = 4;
          }
        }
      }
    };

    /**
     * create crudKey = 8
     */
    const setCreate = (nodeID: number) => {
      const itemData = props.role_node_f[nodeID];

      if (hasPermission(itemData, 8)) {
        itemData[1] = undefined;
        const chidArr: any = [];
        const Data = IEFind(props.node, nodeID);
        findChid(chidArr, Data);
        for (const item of chidArr) {
          props.role_node_f[item][1] = undefined;
        }
      } else {
        itemData[0] = 4;
        itemData[1] = 8;
        const pidArr: any = [];
        const chidArr: any = [];
        const PidData = IEFind(props.node, nodeID);
        findPid(pidArr, PidData);
        findChid(chidArr, PidData);
        const concat = pidArr.concat(chidArr);
        for (const item of concat) {
          props.role_node_f[item][0] = 4;
          props.role_node_f[item][1] = 8;
        }
      }
    };

    /**
     * modify crudkey = 2
     */
    const setModify = (nodeID: any, roleId: any) => {
      const itemData = props.role_node_f[nodeID];
      if (hasPermission(itemData, 2)) {
        itemData[2] = undefined;
        const chidArr: any = [];
        const Data = IEFind(props.node, nodeID);
        findChid(chidArr, Data);
        for (const item of chidArr) {
          props.role_node_f[item][2] = undefined;
        }
      } else {
        itemData[0] = 4;
        itemData[2] = 2;
        const pidArr: any = [];
        const chidArr: any = [];
        const PidData = IEFind(props.node, nodeID);
        findPid(pidArr, PidData);
        findChid(chidArr, PidData);
        const concat = pidArr.concat(chidArr);
        for (const item of concat) {
          props.role_node_f[item][0] = 4;
          props.role_node_f[item][2] = 2;
        }
      }
    };

    /**
     * Delete crudKey = 1
     */
    const setDelete = (nodeID: any, roleId: any) => {
      const itemData = props.role_node_f[nodeID];
      if (hasPermission(itemData, 1)) {
        itemData[3] = undefined;
        const chidArr: any = [];
        const Data = IEFind(props.node, nodeID);
        findChid(chidArr, Data);
        for (const item of chidArr) {
          props.role_node_f[item][3] = undefined;
        }
      } else {
        itemData[0] = 4;
        itemData[3] = 1;
        const pidArr: any = [];
        const chidArr: any = [];
        const PidData = IEFind(props.node, nodeID);
        findPid(pidArr, PidData);
        findChid(chidArr, PidData);
        const concat = pidArr.concat(chidArr);
        for (const item of concat) {
          props.role_node_f[item][0] = 4;
          props.role_node_f[item][3] = 1;
        }
      }
    };

    const handleAllChange = (e: any, index: number) => {
      const ids = props.node.map((x: any) => x.p4_node_id);
      if (e.target.checked) {
        ids.forEach((id: any) => {
          props.role_node_f[id] = [4, 8, 2, 1];
        });
      } else {
        ids.forEach((id: any) => {
          props.role_node_f[id] = [];
        });
      }
    };

    const refData = toRefs(data);
    return {
      store,
      ...refData,
      hasPermission,
      handleAllChange,
      setRead,
      setCreate,
      setModify,
      setDelete,
    };
  },
  methods: {},
});

</script>
<style lang="scss" scoped>
.iconItem {
  font-size: 1.2rem;
}
</style>
