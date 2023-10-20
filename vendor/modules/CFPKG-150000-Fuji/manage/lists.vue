<template>
  <div class="bg-white rounded p-3">
    <div v-if="screenWidth > 767">
      <ListsToolBar
        :btn_name="$i18n.global.t('Longways.create_account')"
        class="mb-3"
      />

      <el-table
        v-loading="store.state.loading.isShow"
        :data="tableData"
        stripe
        key="pc"
        highlight-current-row
        @selection-change="handleSelectionChange"
        size="mini"
      >
        <el-table-column label="#" type="index" width="50" />
        <el-table-column
          :prop="inputForm.account.id"
          :label="$i18n.global.t(inputForm.account.label)"
        />
        <el-table-column :label="$i18n.global.t('Account.manage.name')">
          <template #default="prop">
            <div v-if="prop.row.profile">
              {{ prop.row.profile.cp9_cape_name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :prop="inputForm.role_name.id"
          :label="$i18n.global.t(inputForm.role_name.label)"
        >
          <template #default="prop">
            <div>
              <el-tag
                class="me-1"
                effect="plain"
                type="info"
                size="medium"
                v-for="(item, index) in prop.row.p5_role"
                :key="index"
              >
                {{ item.p5_role_name }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          :prop="inputForm.created_at.id"
          :label="$i18n.global.t(inputForm.created_at.label)"
        />
        <el-table-column
          :prop="inputForm.memo.id"
          :label="$i18n.global.t(inputForm.memo.label)"
        />
        <el-table-column
          width="100"
          :prop="inputForm.status.id"
          :label="$i18n.global.t(inputForm.status.label)"
        >
          <template #default="prop">
            <status
              :value="prop.row[inputForm.status.id]"
              :options="inputForm.status.options"
            />
          </template>
        </el-table-column>

        <el-table-column :label="$i18n.global.t('Util.operate')" width="240">
          <template #default="prop">
            <BtnInfo
              @click="
                $router.push(
                  `/longways/account-system/info/?p3_ant_id=${prop.row.p3_ant_id}`
                )
              "
            />
            <BtnEdit
              @click="
                $router.push(
                  `/longways/account-system/modify/?p3_ant_id=${prop.row.p3_ant_id}`
                )
              "
            />
            <BtnDelete @click="doDelete(prop.row)" />
          </template>
        </el-table-column>
      </el-table>
      <div class="text-right p-3">
        <Pagination />
      </div>
    </div>

    <!-- 手機板 -->
    <div v-else>
      <div
        v-if="(!tableData || !tableData.length) && !store.state.loading.isShow"
        class="p-3"
      >
        <div class="p-5 bg-light rounded-3">
          <div class="container-fluid py-5">
            <h3 class="mb-3">{{ $i18n.global.t("Util.noData") }}</h3>
            <hr />
            <el-button @click="$router.go(-1)" type="primary">
              <i class="fa-fw fas fa-chevron-left"></i>
              {{ $i18n.global.t("Theme.back") }}
            </el-button>
          </div>
        </div>
      </div>
      <el-card
        v-loading="store.state.loading.isShow"
        style="margin: 5px"
        shadow="hover"
        v-for="(item, index) in tableData"
        :key="index"
      >
        <el-form>
          <el-form-item :label="$i18n.global.t(inputForm.account.label)">
            <span>{{ item[inputForm.account.id] }}</span>
          </el-form-item>
          <el-form-item :label="$i18n.global.t('Account.manage.name')">
            <span v-if="item.profile">
              {{ item.profile.cp9_cape_name }}
            </span>
          </el-form-item>

          <el-form-item :label="$i18n.global.t(inputForm.created_at.label)">
            <span>{{ item[inputForm.created_at.id] }}</span>
          </el-form-item>

          <el-form-item :label="$i18n.global.t(inputForm.role_name.label)">
            <el-tag
              class="me-1"
              effect="plain"
              type="info"
              size="medium"
              v-for="(item, index) in item.p5_role"
              :key="index"
            >
              {{ item.p5_role_name }}
            </el-tag>
          </el-form-item>

          <el-form-item :label="$i18n.global.t(inputForm.memo.label)">
            <span>{{ item[inputForm.memo.id] }}</span>
          </el-form-item>

          <el-form-item :label="$i18n.global.t(inputForm.status.label)">
            <status
              :value="item[inputForm.status.id]"
              :options="inputForm.status.options"
            />
          </el-form-item>

          <el-form-item :label="$i18n.global.t('Util.operate')">
            <BtnInfo
              @click="
                $router.push(
                  `/longways/account-system/info/?p3_ant_id=${item.p3_ant_id}`
                )
              "
            />
            <BtnEdit
              @click="
                $router.push(
                  `/longways/account-system/modify/?p3_ant_id=${item.p3_ant_id}`
                )
              "
            />
            <BtnDelete @click="doDelete(item)" />
          </el-form-item>
        </el-form>
      </el-card>
    </div>
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
import { defineComponent, reactive, toRefs, onMounted, inject } from "vue";

import inputForm from "./form";
import Lists, { typeLists } from "./Service/Lists";
import Delete from "./Service/Delete";
import Kick from "./Service/Kick";
import advSearch from "./advSearch.vue";
import { utilTools } from "@/modules/FPKG-20000-Util/prototypes/utilTools";
import ListsToolBar from "@/modules//FPKG-10000-Theme/layout/WEBRTC/components/toolbar/lists_toolbar.vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "manage-lists",
  components: {
    advSearch,
    ListsToolBar,
    Pagination,
 
  },
  setup() {
    const data = reactive({
      tableData: [] as typeLists.item_f[],
      selected: [] as typeLists.item_f[],
      dialogCreate: false,
      dialogAdvSearch: false,
      paginator: {},
    });
    const route = useRoute();

    // table選擇的項目
    const handleSelectionChange = (val: typeLists.item_f[]): void => {
      data.selected = val;
    };

    const getLists = async (params?: typeLists.request) => {
      data.tableData = [];
      const getter = await Lists(params);
      data.tableData = getter.list;
      data.paginator = getter.paginator;
    };

    const doDelete = async (item: typeLists.item_f[]) => {
      const doDelete = await Delete(item);
      if (doDelete) {
        data.selected = [];
        getLists();
      }
    };

    const doKick = async (item: typeLists.item_f) => {
      await new Kick(item).kick();
    };

    onMounted(async () => {
      /** 從bus偵測新增行為 */
      proxy.$bus.$on("create", () => {
        proxy.$router.push("/longways/account-system/create");
      });

      /** 從bus偵測刪除行為(複選) */
      proxy.$bus.$on("delete", () => {
        doDelete(data.selected);
      });

      /** 從bus偵測刪除行為(複選) */
      proxy.$bus.$on("advSearch", () => {
        data.dialogAdvSearch = true;
      });
      const query = route.query;

      getLists(query);
    });
    const { screenWidth, store, proxy, CRUD } = utilTools();
    const refData = toRefs(data);
    const contentSize = inject("contentSize");

    return {
      inputForm,
      ...refData,
      screenWidth,
      store,
      CRUD,
      getLists,
      contentSize,
      doDelete,
      handleSelectionChange,
      doKick,
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