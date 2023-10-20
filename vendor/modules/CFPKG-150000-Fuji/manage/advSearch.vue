<template>
  <el-form @submit.prevent="advSearch" :model="form">
    <el-form-item
      :label="$i18n.global.t(inputForm.account.label)"
      prop="search_p3_ant_account"
    >
      <el-input
        :label="$i18n.global.t(inputForm.account.label)"
        v-model="form['search_p3_ant_account']"
      />
    </el-form-item>

    <el-form-item
      :label="$i18n.global.t(inputForm.status.label)"
      :prop="'search_p3_ant_status'"
    >
      <el-select
        v-model="form['search_p3_ant_status']"
        :clearable="true"
        class="w-100"
      >
        <el-option
          v-for="(item, index) in inputForm.status.options"
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
      <el-button @click="resetForm()" :title="$i18n.global.t('Theme.clean')">
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
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import inputForm from './form';

export default defineComponent({
  name: 'advSearch',
  setup(prop, context) {
    const data = reactive({
      form: {} as any,
    });
    const $router = useRouter();
    const $route = useRoute();

    const advSearch = () => {
      data.form.page = 1;
      const query = { ...$route.query, ...data.form };
      delete query.search_complex;
      context.emit('close');
      $router.push({ query });
    };

    const resetForm = () => {
      data.form = {};
      const { path } = $route;
      context.emit('close');
      $router.push(path);
    };

    onMounted(async () => {
      const { query } = $route;
      const querySetting = JSON.parse(JSON.stringify(query));
      data.form = querySetting;
    });

    const refData = toRefs(data);
    return {
      ...refData,
      advSearch,
      resetForm,
      inputForm,
    };
  },
});
</script>
