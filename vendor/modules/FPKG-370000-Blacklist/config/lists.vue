<template>
  <div>
    <el-table
      v-loading="store.state.loading.isShow"
      v-if="screenWidth > 767"
      :data="tableData"
      :height="contentSize.height"
      :width="contentSize.width"
      stripe
      key="pc"
      highlight-current-row
      @selection-change="handleSelectionChange"
      fit
      border
      size="mini"
    >
      <el-table-column type="selection" width="40" />
      <el-table-column
        width="100"
        :prop="inputForm.type.id"
        :label="$i18n.global.t(inputForm.type.label)"
      >
        <template #default="prop">
          <status
            :value="prop.row[inputForm.type.id]"
            :options="inputForm.type.options"
          />
        </template>
      </el-table-column>
      <el-table-column
        :prop="inputForm.content.id"
        :label="$i18n.global.t(inputForm.content.label)"
      >
        <template #default="prop">
          <strong v-if="prop.row[inputForm.commName.id]">
            <status
              :value="prop.row[inputForm.commName.id]"
              :options="inputForm.commName.options"
            />
          </strong>
          {{ prop.row[inputForm.content.id] }}
        </template>
      </el-table-column>

      <el-table-column :label="$i18n.global.t(inputForm.creator.label)">
        <template #default="prop">
          {{ prop.row.creator?.p3_ape_name }}
          ({{ prop.row.creator?.p3_ant_account }})
        </template>
      </el-table-column>

      <el-table-column
        :prop="inputForm.memo.id"
        :label="$i18n.global.t(inputForm.memo.label)"
      />

      <el-table-column :label="$i18n.global.t('Util.operate')" width="80">
        <template #default="prop">
          <el-button
            v-if="CRUD & 1"
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
    <template v-else>
      <h3 v-if="!tableData">{{ $i18n.global.t("Util.noData") }}</h3>
      <el-card
        v-loading="store.state.loading.isShow"
        style="margin: 5px"
        shadow="hover"
        v-for="(item, index) in tableData"
        :key="index"
      >
        <el-form>
          <el-form-item :label="$i18n.global.t(inputForm.type.label)">
            <status
              :value="item[inputForm.type.id]"
              :options="inputForm.type.options"
            />
          </el-form-item>

          <el-form-item :label="$i18n.global.t(inputForm.content.label)">
            <strong v-if="item[inputForm.commName.id]">
              <status
                :value="item[inputForm.commName.id]"
                :options="inputForm.commName.options"
              />:
            </strong>
            <span>{{ item[inputForm.content.id] }}</span>
          </el-form-item>

          <el-form-item :label="$i18n.global.t(inputForm.creator.label)">
            <span>
              {{ item.creator?.p3_ape_name }} ({{
                item.creator?.p3_ant_account
              }})
            </span>
          </el-form-item>

          <el-form-item :label="$i18n.global.t(inputForm.memo.label)">
            <span>{{ item[inputForm.memo.id] }}</span>
          </el-form-item>

          <el-form-item :label="$i18n.global.t('Util.operate')">
            <el-button
              v-if="CRUD & 1"
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
    </template>
    <el-dialog
      v-model="dialogCreate"
      :title="$i18n.global.t('Theme.create')"
      custom-class="RWD-Dialog"
    >
      <create @close="dialogCreate = false" @update="getLists($route.query)" />
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

<script lang="ts">
/* eslint-disable @typescript-eslint/no-use-before-define */
import { defineComponent, reactive, toRefs, onMounted, inject } from "vue";

import inputForm from "./form";
import Lists from "./Service/Lists";
import Delete from "./Service/Delete";
import advSearch from "./advSearch.vue";
import create from "./create.vue";
import { utilTools } from "@/modules/FPKG-20000-Util/prototypes/utilTools";
import { typeList } from "./Service/Lists";

export default defineComponent({
  name: "blackList",
  components: { advSearch, create },
  setup(prop, context) {
    const data = reactive({
      tableData: [] as typeList.item[],
      selected: [] as typeList.item[],
      dialogCreate: false,
      dialogAdvSearch: false,
    });

    // table選擇的項目
    const handleSelectionChange = (val: typeList.item[]): void => {
      data.selected = val;
    };

    const getLists = async (
      params?: Record<string, string | string[] | number>
    ) => {
      const getter = await Lists(params);
      if (getter) data.tableData = getter.list;
    };

    const doDelete = async (item: typeList.item | typeList.item[]) => {
      const doDelete = await Delete(item);
      if (doDelete) {
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

    const { screenWidth, store, proxy, CRUD } = utilTools();
    const refData = toRefs(data);
    const contentSize = inject("contentSize");

    return {
      inputForm,
      ...refData,
      screenWidth,
      store,
      proxy,
      CRUD,
      ...context,
      getLists,
      contentSize,
      doDelete,
      handleSelectionChange,
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
    const params = {
      ...to.query,
      ...to.params,
    };
    /** 取得搜尋參數: 從 query, params, user設定 進行整理 */
    this.getLists(params as Record<string, string | number>);
  },
});
</script>
