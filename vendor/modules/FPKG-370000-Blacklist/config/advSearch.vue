<template>
  <el-form @submit.prevent="advSearch" :model="form">
    <el-form-item
      :label="$i18n.global.t(searchForm.type.label)"
      :prop="searchForm.type.searchId"
    >
      <el-select
        v-model="form[searchForm.type.searchId]"
        :clearable="true"
        class="w-100"
      >
        <el-option
          v-for="(item, index) in searchForm.type.options"
          :key="'item' + index"
          :value="item.value"
          :label="$i18n.global.t(item.label)"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      :label="$i18n.global.t(searchForm.content.label)"
      :prop="searchForm.content.searchId"
    >
      <el-input
        :placeholder="$i18n.global.t(searchForm.content.label)"
        v-model="form[searchForm.content.searchId]"
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

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { utilTools } from '@/modules/FPKG-20000-Util/prototypes/utilTools';
import searchForm from './form';

export default defineComponent({
  name: 'advSearch',
  setup(prop, context) {
    const data = reactive({
      searchForm: searchForm,
      form: {} as any,
    });

    const { proxy } = utilTools();

    const advSearch = () => {
      data.form.page = 1;
      const query: any = { ...proxy.$route.query, ...data.form };
      delete query.search_complex;
      context.emit('close');
      proxy.$router.push({ query });
    };

    const resetForm = () => {
      data.form = {};
      const { path } = proxy.$route;
      context.emit('close');
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
    };
  },
});
</script>
