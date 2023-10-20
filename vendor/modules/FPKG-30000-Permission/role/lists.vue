<template>
  <div>
    <el-table
      v-loading="store.state.loading.isShow"
      v-if="screenWidth > 767"
      :data="tableData"
      :height="contentSize.height"
      :width="contentSize.width"
      stripe
      @selection-change="handleSelectionChange"
      key="pc"
      highlight-current-row
      fit
      border
      size="mini"
    >
      <el-table-column type="selection" fixed="left" width="40" />
      <el-table-column
        fixed="left"
        :prop="roleForm.name.id"
        :label="$i18n.global.t(roleForm.name.label)"
      />
      <el-table-column
        :prop="roleForm.memo.id"
        :label="$i18n.global.t(roleForm.memo.label)"
      />
      <el-table-column
        width="100"
        :prop="roleForm.status.id"
        :label="$i18n.global.t(roleForm.status.label)"
      >
        <template #default="prop">
          <status
            :value="prop.row[roleForm.status.id]"
            :options="roleForm.status.options"
          />
        </template>
      </el-table-column>

      <el-table-column :label="$i18n.global.t('Util.operate')" width="200">
        <template #default="prop">
          <router-link
            v-if="CRUD & 4"
            :to="`/permission/role/info/${prop.row.p5_role_id}`"
            :title="$i18n.global.t('Util.view')"
            class="el-button el-button--info el-button--small"
          >
            <i class="el-icon-view" />
          </router-link>
          <router-link
            v-if="CRUD & 2"
            :to="`/permission/role/modify/${prop.row.p5_role_id}`"
            :title="$i18n.global.t('Util.edit')"
            class="el-button el-button--success el-button--small"
          >
            <icon icon="fas fa-edit" />
          </router-link>
          <el-button
            v-if="CRUD & 1 && prop.row.p5_role_specific === 'CUSTOM'"
            @click="doDelete(prop.row)"
            :title="$i18n.global.t('Util.delete')"
            type="danger"
            size="small"
          >
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 手機板 -->
    <div v-else>
      <h3 v-if="!tableData">{{ $i18n.global.t("Util.noData") }}</h3>
      <el-card
        v-loading="$store.state.loading.isShow"
        style="margin: 5px"
        shadow="hover"
        v-for="(item, index) in tableData"
        :key="index"
      >
        <el-form ref="ROLEForm">
          <el-form-item :label="$i18n.global.t(roleForm.name.label)">
            <span>{{ item[roleForm.name.id] }}</span>
          </el-form-item>

          <el-form-item :label="$i18n.global.t(roleForm.memo.label)">
            <span>{{ item[roleForm.memo.id] }}</span>
          </el-form-item>

          <el-form-item :label="$i18n.global.t(roleForm.status.label)">
            <status
              :value="item[roleForm.status.id]"
              :options="roleForm.status.options"
            />
          </el-form-item>

          <el-form-item :label="$i18n.global.t('Util.operate')">
            <router-link
              v-if="CRUD & 4"
              :to="`/permission/role/info/${item.p5_role_id}`"
              :title="$i18n.global.t('Util.view')"
              class="el-button el-button--info el-button--small"
            >
              <i class="el-icon-view" />
            </router-link>

            <router-link
              v-if="CRUD & 2"
              :to="`/permission/role/modify/${item.p5_role_id}`"
              :title="$i18n.global.t('Util.edit')"
              class="el-button el-button--success el-button--small"
            >
              <icon icon="fas fa-edit" />
            </router-link>

            <el-button
              v-if="CRUD & 1 && item.p5_role_specific === 'CUSTOM'"
              @click="doDelete(item)"
              :title="$i18n.global.t('Util.delete')"
              type="danger"
              size="small"
            >
              <i class="el-icon-delete"></i>
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <el-dialog
      v-model="dialogCreate"
      :title="$i18n.global.t('Theme.create')"
      custom-class="RWD-Dialog"
    >
      <create @close="dialogCreate = false" @update="getLists" />
    </el-dialog>

    <el-dialog
      v-model="dialogAdvSearch"
      :title="$i18n.global.t('Theme.AdvancedSearch')"
      custom-class="RWD-Dialog"
    >
      <advSearch @close="dialogAdvSearch = false" />
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
  nextTick,
  onErrorCaptured,
  onMounted,
  onBeforeMount,
  onBeforeUpdate,
  onUpdated,
  computed,
  unref,
  getCurrentInstance,
  inject,
} from "vue";

import { utilTools } from "@/modules/FPKG-20000-Util/prototypes/utilTools";
import Lists from "./Service/Lists";
import Delete from "./Service/Delete";
import roleForm from "./form.json";
import create from "./create.vue";
import advSearch from "./advSearch.vue";

export default defineComponent({
  name: "role",
  components: { advSearch, create },
  setup(prop, context) {
    const { screenWidth, store, proxy, CRUD } = utilTools();
    const data: any = reactive({
      roleForm: roleForm,
      tableData: [],
      selected: [],
      dialogCreate: false,
      dialogAdvSearch: false,
    });

    // table選擇的項目
    const handleSelectionChange = (val: Array<Record<string, any>>): void => {
      data.selected = val;
    };

    /** 取得列表 */
    const getLists = async (params?: Record<string, any> | undefined) => {
      const getter = await new Lists(params).get();
      data.tableData = getter.list;
    };

    const doDelete = async (item: any) => {
      const doDelete = (await new Delete(item).delete()) as any;
      if (doDelete.data.code === 0) {
        data.selected = [];
        getLists();
      }
    };

    onMounted(async () => {
      /** 從bus偵測新增行為 */
      proxy.$bus.$on("create", () => {
        data.dialogCreate = true;
      });

      /** 從bus偵測刪除行為(複選) */
      proxy.$bus.$on("delete", () => {
        doDelete(data.selected);
      });

      /** 從bus偵測刪除行為(複選) */
      proxy.$bus.$on("advSearch", () => {
        data.dialogAdvSearch = true;
      });
      getLists();
    });

    const refData = toRefs(data);
    const contentSize = inject("contentSize");

    return {
      ...refData,
      screenWidth,
      store,
      proxy,
      CRUD,
      contentSize,
      getLists,
      handleSelectionChange,
      doDelete,
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
    const params = {
      ...to.query,
      ...to.params,
    };
    /** 取得搜尋參數: 從 query, params, user設定 進行整理 */
    this.getLists(params);
  },
});
</script>
