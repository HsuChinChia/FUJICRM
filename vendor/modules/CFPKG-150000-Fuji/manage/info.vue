<template>
  <el-form
    v-loading="$store.state.loading.isShow"
    :label-width="screenWidth > 757 ? '120px' : ''"
    class="detail-wrap"
  >
    <div class="detail" style="width: 100%">
      <div class="card mb-3">
        <div class="card-header">
          {{ $i18n.global.t("Util.info") }}
        </div>
        <div class="card-body d-lg-flex flex-wrap">
          <el-form-item
            :label="$i18n.global.t(manageForm.account.label)"
            class="col-lg-6 col-xl-4"
          >
            {{ form.p3_account["p3_ant_account"] || "&nbsp;" }}
          </el-form-item>

          <el-form-item
            :label="$i18n.global.t(manageForm.role_name.label)"
            class="col-lg-6 col-xl-4"
          >
            <el-tag
              class="me-1"
              effect="dark"
              type="info"
              size="medium"
              v-for="(item, index) in form.p5_role"
              :key="index"
            >
              {{ item.p5_role_name }}
            </el-tag>
          </el-form-item>

          <el-form-item
            :label="$i18n.global.t(manageForm.created_at.label)"
            class="col-lg-6 col-xl-4"
          >
            {{ form.p3_account[manageForm.created_at.id] || "&nbsp;" }}
          </el-form-item>

          <el-form-item
            :label="$i18n.global.t(manageForm.status.label)"
            class="col-lg-6 col-xl-4"
          >
            <status
              :value="form.p3_account[manageForm.status.id]"
              :options="manageForm.status.options"
            />
          </el-form-item>

          <el-form-item
            :label="$i18n.global.t(manageForm.memo.label)"
            class="col-lg-12 col-xl-12"
          >
            {{ form.p3_account[manageForm.memo.id] || "&nbsp;" }}
          </el-form-item>

          <el-divider>
            <i class="el-icon-mobile-phone" />
            {{ $i18n.global.t("Account.manage.profile") }}
          </el-divider>
          <template v-if="PROFILE_TYPE === 'SIMPLE'">
            <div class="w-100 d-lg-flex flex-wrap">
              <el-form-item
                :label="$i18n.global.t('Account.manage.name')"
                class="col-lg-6 col-xl-4"
              >
                {{ form.p3_account["cp9_cape_name"] || "&nbsp;" }}
              </el-form-item>

              <el-form-item
                :label="$i18n.global.t('Account.manage.tel')"
                class="col-lg-6 col-xl-4"
              >
                <span>
                  {{ form.p3_account.cp9_cape_tel[0] }}
                </span>
              </el-form-item>
              <el-form-item label="email" class="col-lg-6 col-xl-4">
                <span>
                  {{ form.p3_account.cp9_cape_email[0] }}
                </span>
              </el-form-item>
            </div>
          </template>

          <template v-if="PROFILE_TYPE === 'FULL'">
            <el-form-item
              :label="$i18n.global.t('Account.manage.birthday')"
              class="col-lg-6 col-xl-4"
            >
              {{ form.p3_account["cp9_cape_birthday"] || "&nbsp;" }}
            </el-form-item>

            <el-form-item
              :label="$i18n.global.t('Account.manage.gender')"
              class="col-lg-6 col-xl-4"
            >
              <status
                :value="form.p3_account['cp9_cape_gender']"
                :options="manageForm.gender.options"
              />
            </el-form-item>
          </template>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script lang='ts'>
import { reactive, toRefs, onMounted } from "vue";
import Modify from "./Service/Modify";
import manageForm from "./form";
import { useRoute, useRouter } from "vue-router";
import { utilTools } from "@/modules/FPKG-20000-Util/prototypes/utilTools";
import inputForm from "./form";

const PROFILE_TYPE: "SIMPLE" | "FULL" = "SIMPLE";

export default {
  name: "account-manage-info",
  setup() {
    const { screenWidth, proxy } = utilTools();
    const $route = useRoute();
    const $router = useRouter();

    const data: any = reactive({
      manageForm: manageForm,
      form: {
        p3_account: {
          cp9_cape_email: "",
          cp9_cape_tel: "",
        },
        p5_role: {},
      },
    });

    /**
     * getInfo 取得資料
     */
    const getInfo = async (): Promise<void> => {
      const { p3_ant_id } = $route.query;
      if (!p3_ant_id) return;
      const getter = await Modify({ p3_ant_id: Number(p3_ant_id) });
      data.form = getter;
    };

    onMounted(() => {
      /** 從bus偵測刪除行為(複選) */
      proxy.$bus.$on("modify", () => {
        $router.push(
          `/longways/account-system/modify?p3_ant_id=${$route.query.p3_ant_id}`
        );
      });
      getInfo();
    });

    const refData = toRefs(data);

    return {
      ...refData,
      screenWidth,
      PROFILE_TYPE,
      inputForm,
    };
  },
};
</script>
