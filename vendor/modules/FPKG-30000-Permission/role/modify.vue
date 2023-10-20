<template>
  <div class="detail-wrap">
    <div
      v-loading="store.state.loading.isShow"
      class="detail"
      style="min-width: 400px"
    >
      <el-form :model="form" id="modifyForm" ref="FORM" class="card">
        <div class="card-body">
          <el-form-item
            :label="$i18n.global.t(roleForm.name.label)"
            prop="role.p5_role_name"
            :rules="{
              required: true,
              message: $i18n.global.t('Util.isRequired', {
                label: $i18n.global.t(roleForm.name.label),
              }),
            }"
          >
            <el-input
              :placeholder="$i18n.global.t(roleForm.name.label)"
              v-model="form.role[roleForm.name.id]"
            />
          </el-form-item>

          <el-form-item
            :label="$i18n.global.t(roleForm.status.label)"
            prop="role.p5_role_status"
            :rules="roleForm.status.rule"
          >
            <el-switch
              v-model="form.role[roleForm.status.id]"
              :active-value="roleForm.status.options[0].value"
              :active-text="$i18n.global.t(roleForm.status.options[0].label)"
              :inactive-value="roleForm.status.options[1].value"
              :inactive-text="$i18n.global.t(roleForm.status.options[1].label)"
              inactive-color="#ff4949"
              active-color="#13ce66"
              class="w-100"
            />
          </el-form-item>

          <el-form-item
            :label="$i18n.global.t(roleForm.memo.label)"
            prop="role.p5_role_memo"
            :rules="roleForm.memo.rule"
          >
            <el-input
              :placeholder="$i18n.global.t(roleForm.memo.label)"
              v-model="form.role[roleForm.memo.id]"
            />
          </el-form-item>
          <input class="no-show" type="submit" />
        </div>
      </el-form>
    </div>
    <div class="detail" style="min-width: 600px">
      <permissionModify
        :node="form.node_f"
        :role_node_f="form.role_node_f"
        ref="permission"
      />
    </div>
  </div>
</template>

<script lang='ts'>
/* eslint-disable @typescript-eslint/camelcase */
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
} from 'vue';

import { utilTools } from '@/modules/FPKG-20000-Util/prototypes/utilTools';

import Modify from './Service/Modify';
import roleForm from './form';
import permissionModify from '../role-permission/modify.vue';
import DoModify from './Service/DoModify';
import Delete from './Service/Delete';

export default defineComponent({
  name: 'roleInfo',
  components: { permissionModify },
  setup(prop, context) {
    const data: any = reactive({
      roleForm: roleForm,
      form: {
        role: {
          p5_role_id: '',
          p5_role_status: '3',
          p5_role_name: '',
          p5_role_memo: '',
        },
      },
    });

    /**
     * getInfo 取得資料
     */
    const { screenWidth, store, proxy, CRUD } = utilTools();

    const getInfo = (): void => {
      const getter = new Modify({ p5_role_id: proxy.$route.params.p5_role_id });
      getter.get().then((d) => {
        data.form = d;
      });
    };

    const doDelete = async (item: any) => {
      const doDelete = (await new Delete(item).delete()) as any;
      if (doDelete.data.code === 0) {
        proxy.$router.push('/permission/role/lists');
      }
    };

    /** 送出表單 */
    const submitForm = async (formName: string) => {
      /** 測試模式判定 */
      const myForm: any = proxy.$refs[formName];
      myForm.validate((valid: boolean): void => {
        if (valid) {
          const getter = new DoModify(data.form);
          getter.put().then(() => {
            // getInfo();
          });
        } else {
          const msg: any = proxy.$i18n.global.t('Util.validateError');
          proxy.$message.error(msg);
        }
      });
    };

    onMounted(async () => {
      getInfo();

      proxy.$bus.$on('save', () => {
        proxy.submitForm('FORM');
      });
      proxy.$store.dispatch('setBread', {
        label: proxy.$i18n.global.t('Theme.modify'),
      });

      proxy.$bus.$on('info', () => {
        proxy.$router.push(
          `/permission/role/info/${proxy.$route.params.p5_role_id}`,
        );
      });

      /** 從bus偵測刪除行為(複選) */
      proxy.$bus.$on('delete', () => {
        doDelete(data.form.role);
      });
    });

    const refData = toRefs(data);

    return {
      submitForm,
      store,
      ...refData,
    };
  },
});

// @Component({
//   components: { permissionModify },
// })
// export default class roleModify extends Vue {
//   private loading: boolean = false;

//   private roleForm: Object = roleForm;

//   private form: typeDoModify.request = {
//     role: {},
//   };

//   get permission() {
//     return this.$getCrud('branch/permission/info');
//   }

//   /**
//    * getInfo 取得資料
//    */
//   public getInfo(): void {
//     this.loading = true;
//     const getter = new Modify({ p5_role_id: this.$route.params.p5_role_id });
//     getter.get().then((d) => {
//       this.form = d;
//       this.loading = false;
//     });
//   }

//   /** 設定權限 */
//   public setPermission() {
//     const per: any = this.$refs.permission;
//     per.submitForm();
//   }

//   /** 送出表單 */
//   public submitForm(formName: string) {
//     /** 測試模式判定 */
//     const myForm: any = this.$refs[formName];
//     myForm.validate((valid: boolean): void => {
//       if (valid) {
//         const getter = new DoModify(this.form);
//         getter.put().then(() => {
//           this.getInfo();
//         });
//       } else {
//         const msg: any = this.$i18n.global.t('Util.validateError');
//         this.$message.error(msg);
//       }
//     });
//   }

//   /** 刪除功能，可複選 */
//   public doDelete() {
//     const item: any = this.form;
//     const doDelete = new Delete(item);
//     doDelete.delete().then(() => {
//       this.$router.push('/permission/role/lists');
//     });
//   }

//   private mounted() {
//     this.$store.dispatch('setBread', {
//       label: this.$i18n.global.t('Theme.modify'),
//     });

//     this.$bus.$on('info', () => {
//       this.$router.replace(
//         `/permission/role/info/${this.$route.params.p5_role_id}`,
//       );
//     });

//     this.$bus.$on('save', () => {
//       this.submitForm('form');
//     });

//     /** 從bus偵測刪除行為(複選) */
//     this.$bus.$on('delete', () => {
//       this.doDelete();
//     });

//     this.getInfo();
//   }
// }
</script>
