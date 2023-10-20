<template>
  <div>
    <el-table
      v-loading="$store.state.loading.isShow"
      v-if="screenWidth > 767"
      :data="tableData"
      :height="contentSize.height"
      :width="contentSize.width"
      stripe
      key="pc"
      highlight-current-row
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
      fit
      border
      size="mini"
    >
      <el-table-column
        :label="`${$i18n.global.t(inputForm.account.label)}(${$i18n.global.t(
          'Account.manage.name'
        )})`"
        :prop="inputForm.account.id"
        sortable="custom"
      >
        <template #default="prop">
          <div class="text-info hover" @click="accountRecord(prop.row)">
            {{ prop.row.p3_ant_account }}({{ prop.row.profile.p3_ape_name }})
          </div>
        </template>
      </el-table-column>

      <el-table-column
        :label="$i18n.global.t(inputForm.created_at.label)"
        :prop="inputForm.created_at.id"
        sortable="custom"
      />
      <el-table-column
        :label="$i18n.global.t(inputForm.login_at.label)"
        :prop="inputForm.login_at.id"
        sortable="custom"
      />
      <el-table-column
        :label="$i18n.global.t(inputForm.ip.label)"
        :prop="inputForm.ip.id"
        sortable="custom"
      />
      <el-table-column :label="$i18n.global.t('Util.operate')" width="240">
        <template #default="prop">
          <el-button
            v-if="CRUD & 4"
            @click="handleInfo(prop.row)"
            :title="$i18n.global.t('Util.view')"
            type="info"
            size="small"
          >
            <i class="el-icon-view" />
          </el-button>

          <el-button
            v-if="blacklist_crud === 8"
            @click="createBlockLists('IP', prop.row.p3_llg_ip)"
            :title="$i18n.global.t('Account.recordLogin.add_blick_lists')"
            type="danger"
            size="small"
          >
            <icon icon="fas fa-ban" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 手機板 -->
    <div v-else>
      <div
        v-if="(!tableData || !tableData.length) && !$store.state.loading.isShow"
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
        v-loading="$store.state.loading.isShow"
        style="margin: 5px"
        shadow="hover"
        v-for="(item, index) in tableData"
        :key="index"
      >
        <el-form>
          <el-form-item
            :label="`${$i18n.global.t(
              inputForm.account.label
            )}(${$i18n.global.t('Account.manage.name')})`"
          >
            <div class="text-info hover" @click="accountRecord(item)">
              {{ item.p3_ant_account }}({{ item.profile.p3_ape_name }})
            </div>
          </el-form-item>

          <el-form-item :label="$i18n.global.t(inputForm.created_at.label)">
            <span>{{ item[inputForm.created_at.id] }}</span>
          </el-form-item>
          <el-form-item :label="$i18n.global.t(inputForm.login_at.label)">
            <span>{{ item[inputForm.login_at.id] }}</span>
          </el-form-item>
          <el-form-item :label="$i18n.global.t(inputForm.ip.label)">
            <span>{{ item[inputForm.ip.id] }}</span>
          </el-form-item>
          <el-form-item :label="$i18n.global.t('Util.operate')">
            <el-button
              v-if="CRUD & 4"
              @click="handleInfo(item)"
              :title="$i18n.global.t('Util.view')"
              type="info"
              size="small"
            >
              <i class="el-icon-view" />
            </el-button>

            <el-button
              v-if="blacklist_crud === 8"
              @click="createBlockLists('IP', item.p3_llg_ip)"
              :title="
                $i18n.global.t('Account.recordLogin.add_blick_lists')
              "
              type="danger"
              size="small"
            >
              <icon icon="fas fa-ban" />
            </el-button>
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
    <el-dialog
      v-model="dialogInfo"
      :title="$i18n.global.t('Theme.info')"
      custom-class="RWD-Dialog"
    >
      <info
        @close="
          dialogInfo = false;
          activeItem = null;
        "
        :activeItem="activeItem"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, inject } from "vue";
import inputForm from "./form";
import Lists, { typeLists } from "./Service/Lists";
import advSearch from "./advSearch.vue";
import { utilTools } from "@/modules/FPKG-20000-Util/prototypes/utilTools";
import { useRoute, useRouter } from "vue-router";
import info from "./info.vue";
import CreateBlock from "@/modules/FPKG-370000-Blacklist/config/Service/Create";
import { ElMessage, ElMessageBox } from "element-plus";

export default defineComponent({
  name: "account-record-login--Lists",
  components: { advSearch, info },
  setup() {
    const data = reactive({
      tableData: [] as typeLists.item[],
      selected: [] as typeLists.item[],
      dialogAdvSearch: false,

      dialogInfo: false,
      activeItem: {} as object | null,
      blacklist_crud: 0,
    });
    const $route = useRoute();
    const $router = useRouter();
    const { screenWidth, proxy, CRUD, getCrud } = utilTools();

    // table選擇的項目
    const handleSelectionChange = (val: typeLists.item[]): void => {
      data.selected = val;
    };

    const getLists = async (params?: typeLists.request) => {
      data.tableData = [];
      const getter = await Lists(params);
      if (getter && Array.isArray(getter.list)) {
        data.tableData = getter.list;
      }
    };

    const handleInfo = (item: {}) => {
      data.dialogInfo = true;
      data.activeItem = item;
    };
    const accountRecord = (item: { p3_ant_id: number }) => {
      const query = { page: 1, search_p3_ant_id: item.p3_ant_id };
      $router.push({
        query,
      });
    };

    const sortChange = (
      column: Record<string, string | number | Record<string, string | number>>
    ) => {
      proxy.$store.commit("sortChange", column);
    };
    const createBlockLists = (
      type: string,
      content: string,
      p41_bst_sub_type?: string
    ) => {
      ElMessageBox.alert(`是否將IP ${content} 加入黑名單`, "是否添加黑名單", {
        confirmButtonText: "是",
      }).then(() => {
        const query = {
          p41_bst_type: type,
          p41_bst_content: content,
          p41_bst_sub_type: p41_bst_sub_type ? p41_bst_sub_type : undefined,
        };
        submitBlock(query);
      });
    };

    /** 添加黑名單 */
    const submitBlock = async (query: any) => {
      let p41_bst_feature = `${query.p41_bst_type}#${query.p41_bst_content}`;
      /** 通訊軟體則會額外插入通訊軟體名稱 */
      if (query.p41_bst_type === "COMMUNICATION_SOFTWARE") {
        p41_bst_feature = `${query.p41_bst_type}#${query.p41_bst_sub_type}#${query.p41_bst_content}`;
      }

      const getter = await CreateBlock({
        p41_bst_type: query.p41_bst_type,
        p41_bst_content: query.p41_bst_content,
        p41_bst_sub_type: query.p41_bst_sub_type,
        p41_bst_feature,
      });
      if (getter) {
        // $message.success($i18n.global.t("Util.createComplete"));
      }
    };

    onMounted(async () => {
      data.blacklist_crud = getCrud("blacklist/config/lists") & 8;

      /** 從bus偵測刪除行為(複選) */
      proxy.$bus.$on("advSearch", () => {
        data.dialogAdvSearch = true;
      });

      const query = $route.query;
      getLists(query);
    });
    const refData = toRefs(data);
    const contentSize = inject("contentSize");

    return {
      inputForm,
      ...refData,
      screenWidth,
      CRUD,
      getLists,
      contentSize,
      handleSelectionChange,
      handleInfo,
      sortChange,
      accountRecord,
      createBlockLists,
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