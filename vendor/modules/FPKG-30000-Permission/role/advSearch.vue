<template>
  <el-form
    @submit.prevent="advSearch"
    :model="form"
    id="searchForm"
    ref="searchForm"
  >
    <el-form-item :label="$i18n.global.t(LanguageForm.name.label)">
      <el-input
        :placeholder="$i18n.global.t(LanguageForm.name.label)"
        v-model="form['search_p3_bre_name']"
      />
    </el-form-item>

    <el-form-item
      :label="$i18n.global.t(LanguageForm.status.label)"
    >
      <el-select
        v-model="form['search_p3_bre_status']"
        :clearable="true"
        class="w-100"
      >
        <el-option
          v-for="(item, index) in LanguageForm.status.options"
          :key="'item' + index"
          :value="item.value"
          :label="$i18n.global.t(item.label)"
        />
      </el-select>
    </el-form-item>

    <hr />
    <div>
      <el-button
        :title="$i18n.global.t('Theme.search')"
        native-type="submit"
        type="success"
      >
        <icon icon="fas fa-search-plus"></icon>
        {{ $i18n.global.t('Theme.search') }}
      </el-button>
      <el-button @click="resetForm('searchForm')" :title="$i18n.global.t('Theme.clean')">
        <i class="el-icon-delete"></i>
        {{ $i18n.global.t('Theme.clean') }}
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

<script lang='ts'>
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { utilTools } from "@/modules/FPKG-20000-Util/prototypes/utilTools";
import LanguageForm from "./form";

export default defineComponent({
  name: "advSearch",
  setup(prop, context) {
    const data = reactive({
      form: {} as any,
    });

    let { screenWidth, proxy, CRUD } = utilTools();

    const advSearch = () => {
      data.form.page = 1;
      const query: any = { ...proxy.$route.query, ...data.form };
      delete query.search_complex;
      context.emit("close");
      proxy.$router.push({ query });
    };

    const resetForm = (formName: string) => {
      data.form = {};
      const { path } = proxy.$route;
      context.emit("close");
      proxy.$router.push(path);
    };

    onMounted(async () => {
      const { query } = proxy.$route;
      const querySetting = JSON.parse(JSON.stringify(query));
      data.form = querySetting;
    });

    const refData = toRefs(data);
    return {
      ...refData,
      advSearch,
      resetForm,
      LanguageForm,
    };
  },
});
</script>
