<template>
  <div class="pager flex justify-items-center">
    <el-pagination
      :hide-on-single-page="false"
      v-model:currentPage="paginator"
      :page-size="perpage"
      :page-sizes="[10, 20, 50, 100]"
      background
      layout="total, prev, pager, next,sizes"
      :total="page_count"
      :pager-count="5"
      @size-change="submitPerpage"
      @current-change="submitPage"
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";

import pager from "./API/pager";

export default defineComponent({
  name: "Pagination",
  setup() {
    const data = reactive({
      breadcrumb: [],
    });
    const {
      paginator,
      perpage,
      page_num,
      page_count,
      submitPage,
      submitPerpage,
    } = pager();

    const refData = toRefs(data);
    return {
      ...refData,
      paginator,
      perpage,
      page_num,
      page_count,
      submitPage,
      submitPerpage,
    };
  },
});
</script>

<style lang="scss"></style>
