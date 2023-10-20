<template>
  <el-form
    v-loading="$store.state.loading.isShow"
    @submit.prevent="handleSubmitForm()"
    :model="form"
    :label-width="screenWidth > 757 ? '100px' : ''"
    ref="REF_FORM"
  >
    <div class="detail rounded p-3">
      <div class="card mb-3">
        <div
          class="card-body d-flex flex-column justify-content-center align-items-center"
        >
          <el-form-item
            class="col-lg-6"
            :label="$i18n.global.t('Account.manage.account')"
            prop="p3_ant_account"
          >
            <el-input
              disabled
              :placeholder="$i18n.global.t('Account.manage.account')"
              v-model="form.p3_account['p3_ant_account']"
            />
          </el-form-item>
          <el-form-item
            class="col-lg-6"
            :label="$i18n.global.t('Account.manage.password')"
            prop="p3_ant_password"
          >
            <el-input
              show-password
              type="password"
              :placeholder="$i18n.global.t('Account.manage.not_confirm')"
              v-model="form['p3_ant_password']"
            />
          </el-form-item>

          <el-form-item
            class="col-lg-6"
            :label="$i18n.global.t('Theme.role')"
            prop="p3_ant_account"
          >
            <el-select
              v-model="form.p5_role_f"
              multiple
              :placeholder="$i18n.global.t('Theme.role')"
            >
              <el-option
                v-for="item in roleList"
                :key="item.p5_role_id"
                :label="item.p5_role_name"
                :value="item.p5_role_id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="col-lg-6" :label="$i18n.global.t('Util.status')">
            <el-switch
              v-model="form.p3_account.p3_ant_status"
              :active-value="'3'"
              :inactive-value="'-2'"
              inactive-color="#ff4949"
              active-color="#13ce66"
            />
          </el-form-item>

          <el-form-item
            class="col-lg-6"
            :label="$i18n.global.t(inputForm.name.label)"
            :rules="inputForm.name.rules"
            :prop="`p3_account.${inputForm.name.id}`"
          >
            <el-input
              :placeholder="$i18n.global.t(inputForm.name.label)"
              v-model="form.p3_account[inputForm.name.id]"
            />
          </el-form-item>

          <el-form-item
            class="col-lg-6"
            :label="$i18n.global.t(inputForm.tel.label)"
            :prop="`p3_account.${inputForm.tel.id}`"
            :rules="inputForm.tel.rules"
          >
            <el-input
              :placeholder="$i18n.global.t(inputForm.tel.label)"
              v-model="form.p3_account[inputForm.tel.id][0]"
            />
          </el-form-item>

          <el-form-item
            class="col-lg-6"
            :label="$i18n.global.t(inputForm.mail.label)"
            :prop="`p3_account.${inputForm.mail.id}`"
            :rules="inputForm.mail.rules"
          >
            <el-input
              :placeholder="$i18n.global.t(inputForm.mail.label)"
              v-model="form.p3_account[inputForm.mail.id][0]"
            />
          </el-form-item>
          <el-form-item
            class="col-lg-6"
            :label="$i18n.global.t('Util.memo')"
            prop="p3_ant_memo"
          >
            <el-input
              type="textarea"
              :placeholder="$i18n.global.t('Util.memo')"
              v-model="form.p3_account['p3_ant_memo']"
            />
          </el-form-item>
          <el-form-item class="col-lg-6">
            <el-button
              @click="handleSubmitForm()"
              class="custom_save"
              size="medium"
              type="primary"
              >{{ $i18n.global.t("Theme.save") }}</el-button
            >
            <el-button @click="$router.go(-1)" size="medium">{{
              $i18n.global.t("Theme.cancel")
            }}</el-button>
          </el-form-item>
        </div>
      </div>
    </div>
    <input type="submit" class="no-show" />
  </el-form>
</template>

<script lang='ts'>
import { reactive, toRefs, onMounted } from "vue";
import Modify from "./Service/Modify";
import inputForm from "./form";
import { utilTools } from "@/modules/FPKG-20000-Util/prototypes/utilTools";
import Create, { typeCreate } from "./Service/Create";
import DoModify from "./Service/DoModify";
import ELFORM from "@/modules/FPKG-20000-Util/API/elForm/index";
/* import DAY from 'dayjs'; */

const PROFILE_TYPE: "SIMPLE" | "FULL" = "SIMPLE";

export default {
  name: "Modify",
  setup() {
    const { screenWidth, proxy } = utilTools();
    const { REF_FORM, submitForm } = ELFORM();
    const data = reactive({
      roleList: [] as typeCreate.item[],
      form: {
        p3_account: {
          cp9_cape_tel: [],
          cp9_cape_email: [],
        },
      } as any,
    });

    /**
     * getInfo 取得資料
     */
    const getInfo = async () => {
      const { p3_ant_id } = proxy.$route.query;
      const getter = await Modify({ p3_ant_id });
      data.form = getter;
    };

    /** 取得列表 */
    const getCreate = async () => {
      const getter = await Create();
      data.roleList = getter.list;
    };

    /** 送出表單 */
    const handleSubmitForm = async () => {
      await submitForm();
      const form = {
        p3_ant_id: data.form.p3_account.p3_ant_id,
        p3_ant_password: data.form.p3_ant_password,
        p3_ant_status: data.form.p3_account.p3_ant_status,
        p3_ant_memo: data.form.p3_account.p3_ant_memo,
        p5_role_id: data.form.p5_role_f,
        cp9_cape_name: data.form.p3_account.cp9_cape_name,
        cp9_cape_birthday: data.form.p3_account.cp9_cape_birthday,
        cp9_cape_gender: data.form.p3_account.cp9_cape_gender,
        cp9_cape_tel: data.form.p3_account.cp9_cape_tel,
        cp9_cape_email: data.form.p3_account.cp9_cape_email,
        p3_ant_account_type: data.form.p3_account.p3_ant_account_type,
      };

      const getter = await DoModify(form);
      if (getter) getInfo();
    };

    /*     const formatTime = (date: string, key?: string) => {
      if (date) {
        data.form.p3_account['cp9_cape_birthday'] = DAY(date).format(
          'YYYY-MM-DD',
        );
      }
    }; */

    onMounted(() => {
      /** 從bus偵測刪除行為(複選) */
      proxy.$bus.$on("info", () => {
        proxy.$router.push(
          `/longways/account-system/info?p3_ant_id=${proxy.$route.query.p3_ant_id}`
        );
      });
      proxy.$bus.$on("save", () => {
        handleSubmitForm();
      });
      getInfo();
      getCreate();
    });

    const refData = toRefs(data);

    return {
      ...refData,
      screenWidth,
      REF_FORM,
      handleSubmitForm,
      PROFILE_TYPE,
      inputForm,
    };
  },
};
</script>
