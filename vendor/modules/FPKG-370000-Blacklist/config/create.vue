<template>
  <el-form
    @submit.prevent="submitForm('FORM')"
    :model="form"
    id="form"
    ref="FORM"
    label-width="120px"
  >
    <el-form-item
      :label="$i18n.global.t(inputForm.type.label)"
      :prop="inputForm.type.id"
      :rules="inputForm.type.rules"
    >
      <el-select v-model="form[inputForm.type.id]">
        <el-option
          v-for="(item, index) in inputForm.type.options"
          :key="'item' + index"
          :value="item.value"
          :label="$i18n.global.t(item.label)"
        />
      </el-select>
    </el-form-item>

    <!-- 送出時不會有這段 -->
    <el-form-item
      v-if="form[inputForm.type.id] === 'COMMUNICATION_SOFTWARE'"
      :label="$i18n.global.t(inputForm.commName.label)"
      :prop="inputForm.commName.id"
      :rules="inputForm.commName.rules"
    >
      <el-select v-model="form[inputForm.commName.id]">
        <el-option
          v-for="(item, index) in inputForm.commName.options"
          :key="'comm' + index"
          :value="item.value"
          :label="$i18n.global.t(item.label)"
        />
      </el-select>
    </el-form-item>

    <el-form-item
      :label="$i18n.global.t(inputForm.content.label)"
      :prop="inputForm.content.id"
      :rules="inputForm.content.rules"
    >
      <el-input
        :placeholder="$i18n.global.t(inputForm.content.label)"
        v-model="form[inputForm.content.id]"
      />
    </el-form-item>

    <el-form-item :label="$i18n.global.t(inputForm.memo.label)" :prop="inputForm.memo.id">
      <el-input
        type="textarea"
        :placeholder="$i18n.global.t(inputForm.memo.label)"
        v-model="form[inputForm.memo.id]"
      />
    </el-form-item>

    <hr />
    <div>
      <el-button
        :title="$i18n.global.t('Theme.saveAndReturn')"
        native-type="submit"
        type="success"
      >
        <icon icon="fas fa-save"></icon>
        {{ $i18n.global.t('Theme.saveAndReturn') }}
      </el-button>
      <el-button
        :title="$i18n.global.t('Theme.keepCreate')"
        @click="keepCreate = true"
        native-type="submit"
      >
        <icon icon="fas fa-plus"></icon>
        {{ $i18n.global.t('Theme.keepCreate') }}
      </el-button>
      <el-button
        @click="$emit('close')"
        :title="$i18n.global.t('Theme.cancel')"
        class="border-0"
      >
        <icon icon="fas fa-times"></icon>
        {{ $i18n.global.t('Theme.cancel') }}
      </el-button>
    </div>
  </el-form>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { utilTools } from '@/modules/FPKG-20000-Util/prototypes/utilTools';
import { typeCreate } from './Service/Create';
import Create from './Service/Create';
import inputForm from './form';

export default defineComponent({
  name: 'Create blocklist',
  setup() {
    const { proxy } = utilTools();
    const data = reactive({
      form: {} as typeCreate.request,
      keepCreate: false,
    });

    /** 送出前產生 request 所需的特徵 */
    const formater = (form: typeof data.form): typeCreate.request => {
      let p41_bst_feature = `${form.p41_bst_type}#${form.p41_bst_content}`;
      /** 通訊軟體則會額外插入通訊軟體名稱 */
      if (form.p41_bst_type === 'COMMUNICATION_SOFTWARE') {
        p41_bst_feature = `${form.p41_bst_type}#${form.p41_bst_sub_type}#${form.p41_bst_content}`;
      }

      return {
        p41_bst_type: form.p41_bst_type,
        p41_bst_content: form.p41_bst_content,
        p41_bst_memo: form.p41_bst_memo,
        p41_bst_sub_type: form.p41_bst_sub_type,
        p41_bst_feature,
      };
    };

    /** 送出表單 */
    const submitForm = (formName: string) => {
      const myForm: any = proxy.$refs[formName];
      myForm.validate(async (valid: boolean) => {
        if (valid) {
          const getter = await Create(formater(data.form));
          if (getter) {
            if (!data.keepCreate) {
              proxy.$emit('close');
            }
            resetForm(formName);
            proxy.$emit('update');
            data.keepCreate = false;
          }
        } else {
          const msg: any = proxy.$i18n.global.t('Util.validateError');
          proxy.$message.error(msg);
        }
      });
    };

    const resetForm = (formName: string) => {
      const myForm: any = proxy.$refs[formName];
      myForm.resetFields();
    };

    const refData = toRefs(data);
    return {
      ...refData,
      inputForm,
      submitForm,
    };
  },
});
</script>
