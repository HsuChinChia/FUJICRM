<template>
  <div class="bg-white rounded p-3">
    <div class="detail-wrap">
      <div
        v-loading="store.state.loading.isShow"
        class="detail"
        style="min-width: 400px"
      >
        <div class="card">
          <div class="list-group list-group-flush">
            <p class="list-group-item">
              <label class="font-weight-bold d-block">
                {{ $i18n.global.t(roleForm.name.label) }}
              </label>
              {{ form.role[roleForm.name.id] || "&nbsp;" }}
            </p>
            <p class="list-group-item">
              <label class="font-weight-bold d-block">
                {{ $i18n.global.t(roleForm.status.label) }}
              </label>
              <status
                :value="form.role[roleForm.status.id]"
                :options="roleForm.status.options"
              />
            </p>
            <p class="list-group-item">
              <label class="font-weight-bold d-block">
                {{ $i18n.global.t(roleForm.memo.label) }}
              </label>
              {{ form.role[roleForm.memo.id] || "&nbsp;" }}
            </p>
          </div>
        </div>
      </div>
      <div class="detail" style="min-width: 500px">
        <permission :node="form.node_f" :role_node_f="form.role_node_f" />
      </div>
    </div>
  </div>
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

import Modify from "./Service/Modify";
import Delete from "./Service/Delete";
import roleForm from "./form";
import permission from "../role-permission/info.vue";

export default defineComponent({
  name: "roleInfo",
  components: { permission },
  setup(prop, context) {
    const { screenWidth, store, proxy, CRUD } = utilTools();
    const data: any = reactive({
      roleForm: roleForm,
      form: {
        role: {
          p5_role_id: "",
          p5_role_status: "3",
          p5_role_name: "",
          p5_role_memo: "",
        },
      },
    });

    /**
     * getInfo 取得資料
     */
    const getInfo = (): void => {
      const getter = new Modify({ p5_role_id: proxy.$route.params.p5_role_id });
      getter.get().then((d) => {
        data.form = d;
      });
    };

    onMounted(async () => {
      getInfo();

      proxy.$store.dispatch("setBread", {
        label: proxy.$i18n.global.t("Theme.info"),
      });

      proxy.$bus.$on("modify", () => {
        proxy.$router.replace(
          `/permission/role/modify/${proxy.$route.params.p5_role_id}`
        );
      });
    });

    const refData = toRefs(data);

    return {
      store,
      ...refData,
    };
  },
});

// @Component({
//   components: { permission },
// })
// export default class roleModify extends Vue {
//   private loading: boolean = false;

//   private roleForm: Object = roleForm;

//   private form: typeDoModify.request = {
//     role: {
//       p5_role_id: '',
//       p5_role_status: '3',
//       p5_role_name: '',
//       p5_role_memo: '',
//     },
//   };

//   get permission() {
//     return this.$getCrud('permission/permission/info');
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
//         const msg: any = this.$t('Util.validateError');
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
//     /** 從bus偵測刪除行為(複選) */
//     this.$bus.$on('delete', () => {
//       this.doDelete();
//     });

//     this.getInfo();
//   }

//   private created() {
//     this.$store.dispatch('setBread', {
//       label: this.$t('Theme.info'),
//     });

//     this.$bus.$on('modify', () => {
//       this.$router.replace(
//         `/permission/role/modify/${this.$route.params.p5_role_id}`,
//       );
//     });
//   }
// }
</script>
