<template>
  <el-form
    label-width="140px"
    v-loading="$store.state.loading.isShow"
    label-position=""
  >
    <el-form-item
      v-for="(item, key, index) in activeItem.p3_llg_device_f"
      :key="key"
      :inde="index"
      v-show="typeof item === 'string' || item == true"
      :label="$i18n.global.t(`Account.recordLogin.${key}`)"
    >
      <span v-if="item == true || item == false">
        <status :value="item" :options="options" />
      </span>
      <span v-else>
        {{ item }}
      </span>
    </el-form-item>
  </el-form>
</template>

<script lang='ts'>
import { reactive, toRefs } from "vue";
import inputForm from "./form";

export default {
  name: "account-record-login--Info",
  props: {
    activeItem: { type: Object, required: true },
  },
  setup() {
    const data = reactive({
      options: [
        {
          value: true,
          label: "Util.yes",
          icon: "fas fa-check",
          color: "success",
        },
        {
          value: false,
          label: "Util.no",
          icon: "fas fa-ban",
          color: "danger",
        },
      ],
    });

    const refData = toRefs(data);

    return {
      ...refData,
      inputForm,
    };
  },
};
</script>
