<template>
  <el-form
    v-loading="$store.state.loading.isShow"
    @submit.prevent="handleSubmitForm()"
    :model="form"
    :label-width="screenWidth > 757 ? '110px' : ''"
    ref="REF_FORM"
  >
    <div class="detail" style="width: 100%">
      <div class="card mb-3">
        <div class="card-header">
          {{ $i18n.global.t("Util.create") }}
        </div>
        <div class="card-body d-lg-flex flex-wrap">
          <el-form-item
            class="col-lg-6 col-xl-4"
            :label="$i18n.global.t('Account.manage.account')"
            prop="p3_ant_account"
            :rules="{
              required: true,
              message: $i18n.global.t('Util.isRequired', {
                label: $i18n.global.t('Account.manage.account'),
              }),
            }"
          >
            <el-input
              :placeholder="$i18n.global.t('Account.manage.account')"
              v-model="form['p3_ant_account']"
            />
          </el-form-item>
          <el-form-item
            class="col-lg-6 col-xl-4"
            :label="$i18n.global.t('Account.manage.password')"
            prop="p3_ant_password"
            :rules="{
              required: true,
              message: $i18n.global.t('Util.isRequired', {
                label: $i18n.global.t('Account.manage.password'),
              }),
            }"
          >
            <el-input
              show-password
              type="password"
              :placeholder="$i18n.global.t('Account.manage.password')"
              v-model="form['p3_ant_password']"
            />
          </el-form-item>

          <el-form-item
            class="col-lg-6 col-xl-4"
            :label="$i18n.global.t('Theme.role')"
            prop="p3_ant_account"
          >
            <el-select
              v-model="form.p5_role_id"
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

          <el-form-item
            class="col-lg-6 col-xl-4"
            :label="$i18n.global.t('Util.status')"
          >
            <el-switch
              v-model="form.p3_ant_status"
              :active-value="'3'"
              :inactive-value="'-2'"
              inactive-color="#ff4949"
              active-color="#13ce66"
            />
          </el-form-item>

          <el-form-item
            class="col-lg-12 col-xl-12"
            :label="$i18n.global.t('Util.memo')"
            prop="p3_ant_memo"
          >
            <el-input
              type="textarea"
              :placeholder="$i18n.global.t('Util.memo')"
              v-model="form['p3_ant_memo']"
            />
          </el-form-item>
          <el-divider>
            <i class="el-icon-mobile-phone"></i>
            {{ $i18n.global.t("Account.manage.profile") }}
          </el-divider>

          <div class="w-100 d-lg-flex flex-wrap">
            <template v-if="PROFILE_TYPE === 'SIMPLE'">
              <el-form-item
                class="col-lg-6 col-xl-4"
                :label="$i18n.global.t(inputForm.name.label)"
                :prop="inputForm.name.id"
                :rules="inputForm.name.rules"
              >
                <el-input
                  :placeholder="$i18n.global.t(inputForm.name.label)"
                  v-model="form[inputForm.name.id]"
                />
              </el-form-item>

              <el-form-item
                class="col-lg-6 col-xl-4"
                :label="$i18n.global.t(inputForm.tel.label)"
                :prop="inputForm.tel.id"
                :rules="inputForm.tel.rules"
              >
                <el-input
                  :placeholder="$i18n.global.t(inputForm.tel.label)"
                  v-model="form[inputForm.tel.id][0]"
                />
              </el-form-item>

              <el-form-item
                class="col-lg-6 col-xl-4"
                :label="$i18n.global.t(inputForm.mail.label)"
                :prop="inputForm.mail.id"
                :rules="inputForm.mail.rules"
              >
                <el-input
                  :placeholder="$i18n.global.t(inputForm.mail.label)"
                  v-model="form[inputForm.mail.id][0]"
                />
              </el-form-item>
            </template>

            <template v-if="PROFILE_TYPE === 'FULL'">
              <el-form-item
                class="col-lg-6 col-xl-4"
                :label="$i18n.global.t('Account.manage.birthday')"
              >
                <el-date-picker
                  class="w-100"
                  v-model="form.p3_ape_birthday"
                  type="date"
                  format="YYYY-MM-DD"
                  :placeholder="$i18n.global.t('Account.manage.birthday')"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item
                class="col-lg-6 col-xl-4"
                :label="$i18n.global.t('Account.manage.gender')"
              >
                <el-select
                  v-model="form['p3_ape_gender']"
                  :placeholder="$i18n.global.t('Account.manage.gender')"
                >
                  <el-option
                    v-for="item in inputForm.gender.options"
                    :key="item.value"
                    :label="$i18n.global.t(item.label)"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </div>
        </div>
      </div>
    </div>
  </el-form>
</template>
<script lang='ts'>
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { utilTools } from "@/modules/FPKG-20000-Util/prototypes/utilTools";
import ELFORM from "@/modules/FPKG-20000-Util/API/elForm/index";
import { useRouter } from "vue-router";
import DAY from "dayjs";
import Create, { typeCreate } from "./Service/Create";
import DoCreate, { typeDoCreate } from "./Service/doCreate";
import inputForm from "./form";

const PROFILE_TYPE: "SIMPLE" | "FULL" = "SIMPLE";

export default defineComponent({
  name: "account-Create",
  setup() {
    const { screenWidth, proxy } = utilTools();
    const { REF_FORM, reset, submitForm } = ELFORM();
    const router = useRouter();
    const data = reactive({
      form: {
        p3_ant_status: "3",
        p3_ant_account: "",
        p3_ant_password: "",
        p3_ape_name: "",
        p5_role_id: [],
        p3_ape_tel: [],
        p3_ape_email: [],
      } as typeDoCreate.request_full,
      roleList: [] as typeCreate.item[],
      keepCreate: false,
    });

    /** 取得角色列表 */
    const getCreate = async () => {
      const getter = await Create();
      data.roleList = getter.list;
    };

    /** 依照輸入模式 SIMPLE | FULL 進行送出前的格式化 */
    const preformater = (data: typeDoCreate.request) => {
      const IS_FULL = false;
      if (IS_FULL) {
        const FULL = data as typeDoCreate.request_full;
        /** 生日格式化 */
        return {
          ...FULL,
          p3_ape_birthday: DAY(FULL.p3_ape_birthday).format("YYYY-MM-DD"),
        };
      }

      const SIMPLE = data as typeDoCreate.request_simple;
      return SIMPLE;
    };

    /** 送出表單 */
    const handleSubmitForm = async () => {
      await submitForm();
      const getter = await DoCreate(preformater(data.form));
      if (getter) {
        if (!data.keepCreate) {
          router.push("/account/manage/lists");
        }
        resetForm();
        data.keepCreate = false;
      }
    };

    /** 清除表單 */
    const resetForm = () => {
      reset();
    };

    onMounted(() => {
      getCreate();
      proxy.$bus.$on("saveAndGo", () => {
        handleSubmitForm();
      });

      proxy.$bus.$on("keepCreate", () => {
        data.keepCreate = true;
        handleSubmitForm();
      });
    });

    const refData = toRefs(data);

    return {
      ...refData,
      handleSubmitForm,
      screenWidth,
      REF_FORM,
      inputForm,
      PROFILE_TYPE,
    };
  },
});
</script>
