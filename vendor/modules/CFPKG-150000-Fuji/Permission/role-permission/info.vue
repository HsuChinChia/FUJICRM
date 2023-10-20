<template>
  <el-table
    v-loading="store.state.loading.isShow"
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
      <template #default="prop">
        <div>
          <span v-for="i in prop.row.layer" :key="i"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
          >
          <span v-if="prop.row.layer == 0">@</span>
          {{ $i18n.global.t(`Permission.${prop.row.p4_node_code}`) }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="p3_bre_name" header-align="center" width="200px">
      <template #default="role">
        <div class="d-flex justify-content-around">
          <span>
            <icon
              :class="
                hasPermission(role_node_f[role.row.p4_node_id], 4)
                  ? 'text-info'
                  : 'text-disabled'
              "
              class="iconItem text-info"
              icon="fas
            fa-eye"
            />
          </span>
          <span>
            <icon
              :class="
                hasPermission(role_node_f[role.row.p4_node_id], 8)
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
                hasPermission(role_node_f[role.row.p4_node_id], 2)
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
                hasPermission(role_node_f[role.row.p4_node_id], 1)
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
    node: Array,
    role_node_f: Array,
  },
  setup(props, context) {
    let { screenWidth, store, proxy, CRUD } = utilTools();
    const data: any = reactive({});

    const hasPermission = (nodeCrud: number[] = [], crud: number): boolean => {
      const self = this;
      const exist = nodeCrud.filter((c: any) => c === crud);
      if (exist.length) {
        return true;
      }
      return false;
    };

    const refData = toRefs(data);
    return {
      store,
      ...refData,
      hasPermission,
    };
  },
});
</script>
 <style lang="scss" scoped>
.iconItem {
  font-size: 1.2rem;
}
</style>
