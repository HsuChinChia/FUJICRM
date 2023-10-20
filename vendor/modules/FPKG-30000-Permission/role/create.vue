<template>
  <el-form @submit.prevent="submitForm('FORM')" :model="form" ref="FORM">
    <el-form-item
      :label="$i18n.global.t(LanguageForm.name.label)"
      :prop="LanguageForm.name.id"
      :rules="{
        required: true,
        message: $i18n.global.t('Util.isRequired', {
          label: $i18n.global.t(LanguageForm.name.label),
        }),
      }"
    >
      <el-input
        :placeholder="$i18n.global.t(LanguageForm.name.label)"
        v-model="form[LanguageForm.name.id]"
      />
    </el-form-item>

    <el-form-item
      :label="$i18n.global.t(LanguageForm.memo.label)"
      :prop="LanguageForm.memo.id"
      :rules="LanguageForm.memo.rule"
    >
      <el-input
        :placeholder="$i18n.global.t(LanguageForm.memo.label)"
        v-model="form[LanguageForm.memo.id]"
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
        {{ $i18n.global.t("Theme.saveAndReturn") }}
      </el-button>
      <el-button
        :title="$i18n.global.t('Theme.keepCreate')"
        @click="keepCreate = true"
        native-type="submit"
      >
        <icon icon="fas fa-plus"></icon>
        {{ $i18n.global.t("Theme.keepCreate") }}
      </el-button>
      <el-button
        @click="$emit('close')"
        :title="$i18n.global.t('Theme.cancel')"
        class="border-0"
      >
        <icon icon="fas fa-times"></icon>
        {{ $i18n.global.t("Theme.cancel") }}
      </el-button>
    </div>
    <input type="submit" class="no-show" />
  </el-form>
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

import Create from "./Service/Create";
import LanguageForm from "./form";

export default defineComponent({
  name: "Create",
  setup(prop, context) {
    const { screenWidth, proxy, CRUD } = utilTools();
    const data = reactive({
      form: {
        p5_role_status: "3",
        p5_role_name: "",
        p5_role_memo: "",
      } as any,
      keepCreate: false,
    });

    /** 送出表單 */
    const submitForm = (formName: string) => {
      const myForm: any = proxy.$refs[formName];
      myForm.validate((valid: boolean): void => {
        if (valid) {
          const getter = new Create(data.form);
          getter.post().then(() => {
            if (!data.keepCreate) {
              proxy.$emit("close");
            }
            resetForm(formName);
            proxy.$emit("update");
            data.keepCreate = false;
          });
        } else {
          const msg: any = proxy.$i18n.global.t("Util.validateError");
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
      LanguageForm,
      submitForm,
    };
  },
});

// @Component
// export default class roleCreate extends Vue {
//   private roleForm: Object = roleForm;

//   private form: typeCreate.request = {
//     p5_role_status: '3',
//     p5_role_name: '',
//     p5_role_memo: '',
//   };

//   private keepCreate: boolean = false; // 判定: 繼續新增

//   /** 送出表單 */
//   public submitForm(formName: string) {
//     const myForm: any = this.$refs[formName];
//     myForm.validate((valid: boolean): void => {
//       if (valid) {
//         const getter = new Create(this.form);
//         getter.post().then(() => {
//           if (!this.keepCreate) {
//             this.$emit('close');
//           }
//           this.resetForm(formName);
//           this.$emit('update');
//           this.keepCreate = false;
//         });
//       } else {
//         const msg: any = this.$i18n.global.t('Util.validateError');
//         this.$message.error(msg);
//       }
//     });
//   }

//   private resetForm(formName: string) {
//     const myForm: any = this.$refs[formName];
//     myForm.resetFields();
//   }
// }
</script>
