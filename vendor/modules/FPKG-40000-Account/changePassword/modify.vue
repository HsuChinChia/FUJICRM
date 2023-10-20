<template>
  <div
    v-loading="$store.state.loading.isShow"
    class="py-3 px-5"
    style="max-width: 600px"
  >
    <div class="card">
      <div class="card-header">
        <i class="fas fa-key fa-fw" />
        {{ $i18n.global.t('Theme.changePass') }}
      </div>
      <div class="card-body">
        <el-form
          @submit.prevent="handleSubmitForm()"
          @reset.prevent="resetForm()"
          :model="form"
          ref="REF_FORM"
          label-width="120px"
        >
          <div class="card-body">
            <el-form-item
              :label="$i18n.global.t('Theme.newPassword')"
              prop="p3_ant_password"
              :rules="inputForm.newPassword.rule"
            >
              <el-input
                :placeholder="$i18n.global.t(inputForm.newPassword.label)"
                v-model="form['p3_ant_password']"
                type="password"
              />
            </el-form-item>
            <el-form-item
              :label="$i18n.global.t('Theme.newPasswordChk')"
              prop="p3_ant_password_confirm"
              :rules="rulePass"
            >
              <el-input
                :placeholder="$i18n.global.t(inputForm.newPasswordChk.label)"
                v-model="form['p3_ant_password_confirm']"
                type="password"
              />
            </el-form-item>
            <hr />
            <div>
              <el-button native-type="submit" type="success">
                <icon icon="fas fa-save" />
                {{ $i18n.global.t('Theme.save') }}
              </el-button>
              <el-button native-type="reset" class="border-0">
                <icon icon="fas fa-times" />
                {{ $i18n.global.t('Theme.cancel') }}
              </el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import inputForm from './form';
import { defineComponent, reactive, toRefs } from 'vue';
import $i18n from '@/modules/FPKG-230000-BackendCore/lang';
import ELFORM from '@/modules/FPKG-20000-Util/API/elForm/index';
import DoModify, { typeDoModify } from './Service/changePassword';

export default defineComponent({
  name: 'changePassword',
  setup() {
    const data = reactive({
      form: { p3_ant_password_confirm: '', p3_ant_password: '' },
    });

    const { REF_FORM, submitForm, reset } = ELFORM();

    /** 密碼確認檢查 */
    const validatePass = (
      rule: Record<string, string>,
      value: string,
      callback: Function,
    ) => {
      if (value === '') {
        callback(new Error($i18n.global.t('Theme.passwordAlert_1')));
      } else if (value !== data.form['p3_ant_password']) {
        callback(new Error($i18n.global.t('Theme.passwordAlert_2')));
      } else {
        callback();
      }
    };

    /** 密碼確認檢查 */
    const rulePass = {
      required: true,
      validator: validatePass,
      trigger: 'blur',
    };

    /** 送出表單 */
    const handleSubmitForm = async () => {
      await submitForm();
      await DoModify(data.form as typeDoModify.request);
    };

    const resetForm = () => {
      reset();
    };

    const refData = toRefs(data);

    return {
      ...refData,
      rulePass,
      handleSubmitForm,
      resetForm,
      inputForm,
      REF_FORM,
    };
  },
});
</script>