<template>
  <el-form @submit.prevent="advSearch" @reset.prevent="resetForm" :model="form">
    <el-form-item
      :label="$i18n.global.t(inputForm.account.label)"
      :prop="inputForm.account.searchId"
    >
      <el-input
        :placeholder="$i18n.global.t(inputForm.account.label)"
        :label="$i18n.global.t(inputForm.account.label)"
        v-model="form[inputForm.account.searchId]"
      />
    </el-form-item>
    <el-form-item
      :label="$i18n.global.t(inputForm.ip.label)"
      :prop="inputForm.ip.searchId"
    >
      <el-input
        :placeholder="$i18n.global.t(inputForm.ip.label)"
        :label="$i18n.global.t(inputForm.ip.label)"
        v-model="form[inputForm.ip.searchId]"
      />
    </el-form-item>
    <el-form-item
      prop="search_p3_llg_created_at_start"
      :label="$i18n.global.t('Account.recordLogin.login_at_start')"
    >
      <el-date-picker
        class="w-100"
        @change="formatTime($event, 'search_p3_llg_created_at_start')"
        :placeholder="$i18n.global.t('Account.recordLogin.login_at_start')"
        v-model="form['search_p3_llg_created_at_start']"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
      />
    </el-form-item>
    <el-form-item
      prop="search_p3_llg_created_at_end"
      :label="$i18n.global.t('Account.recordLogin.login_at_end')"
    >
      <el-date-picker
        class="w-100"
        @change="formatTime($event, 'search_p3_llg_created_at_end')"
        :placeholder="$i18n.global.t('Account.recordLogin.login_at_end')"
        v-model="form['search_p3_llg_created_at_end']"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
      />
    </el-form-item>
    <hr />
    <div>
      <el-button
        :title="$i18n.global.t('Theme.search')"
        native-type="submit"
        type="success"
      >
        <icon icon="fas fa-search-plus"></icon>
        {{ $i18n.global.t("Theme.search") }}
      </el-button>
      <el-button native-type="reset" :title="$i18n.global.t('Theme.clean')">
        <i class="el-icon-delete"></i>
        {{ $i18n.global.t("Theme.clean") }}
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
  </el-form>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import inputForm from "./form";
import DAY from "dayjs";

export default defineComponent({
  name: "account-record-login--Search",
  setup(prop, { emit }) {
    const data = reactive({
      form: {} as any,
    });
    const $router = useRouter();
    const $route = useRoute();

    const advSearch = () => {
      const query = {
        ...$route.query,
        ...data.form,
        search_complex: undefined,
        page: 1,
      };
      $router.push({ query });
      emit("close");
    };

    const resetForm = () => {
      data.form = {};
      const { path } = $route;
      emit("close");
      $router.push(path);
    };
    const formatTime = (date: string, key: string) => {
      if (date) {
        data.form[key] = DAY(date).format("YYYY-MM-DD HH:mm:ss");
      }
    };

    onMounted(async () => {
      const { query } = $route;
      data.form = { ...(query as Record<string, string>) };
    });

    onBeforeRouteUpdate((to) => {
      const { query } = to;
      data.form = { ...(query as Record<string, string>) };
    });

    const refData = toRefs(data);
    return {
      ...refData,
      advSearch,
      resetForm,
      inputForm,
      formatTime,
    };
  },
});
</script>
