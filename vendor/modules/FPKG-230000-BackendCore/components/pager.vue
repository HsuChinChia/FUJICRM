<template>
  <div class="my-1 d-flex flex-wrap justify-content-between align-items-center">
    <div class="my-2">
      <el-input
        v-if="showSearch"
        @search="submitPage('search')"
        @keyup.esc="
          search_complex = '';
          submitPage('search');
        "
        :placeholder="placeholder || $i18n.global.t('Theme.keyword')"
        :title="$i18n.global.t('Theme.keyword')"
        v-model="search_complex"
        type="search"
      >
        <template #append>
          <el-button
            @click="submitPage('search')"
            icon="el-icon-search"
            :title="$i18n.global.t('Theme.search')"
            size="mini"
          />
        </template>
      </el-input>
    </div>

    <div v-if="page_num > 1" class="pager" style="min-width: 300px">
      <button
        :class="{ disable: page === 1 }"
        :title="$i18n.global.t('Theme.firstPage')"
        type="button"
        @click="submitPage('firstPage')"
      >
        <icon icon="fas fa-angle-double-left"></icon>
      </button>
      <button
        :title="$i18n.global.t('Theme.prevPage')"
        :class="{ disable: page === 1 }"
        type="button"
        @click="submitPage('prevPage')"
      >
        <icon icon="fas fa-angle-left"></icon>
      </button>
      <form @submit.prevent="submitPage('goPage')" class="showPage">
        <input
          v-model="page"
          :title="$i18n.global.t('Theme.currentPage')"
          type="number"
          autocomplete="off"
          class="paginator el-input__inner"
          :min="1"
          :max="page_num"
        />
        /{{ page_num }}
      </form>
      <button
        :title="$i18n.global.t('Theme.nextPage')"
        :class="{ disable: page === page_num }"
        type="button"
        @click="submitPage('nextPage')"
      >
        <icon icon="fas fa-angle-right"></icon>
      </button>
      <button
        :class="{ disable: page === page_num }"
        :title="$i18n.global.t('Theme.lastPage')"
        type="button"
        @click="submitPage('lastPage')"
      >
        <icon icon="fas fa-angle-double-right"></icon>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive, computed, PropType } from "vue";
/**
 * 通用型 pager
 * 包含搜尋與分頁功能，且能在大於 300px 的容器中使用
 * 不依賴 vuex ，需仰賴父組件的 prop
 */
export default defineComponent({
  name: "account-info-pager",
  /** 回傳搜尋參數給父組件 */
  emits: ["searching"],
  props: {
    /** 接收後端經典型列表頁的 paginator */
    paginator: {
      type: Object as PropType<pageinator>,
      default: () => ({}),
    },
    placeholder: {
      type: String,
      default: "",
    },
    showSearch: {
      type: Boolean,
      default: true,
    },
  },
  setup(prop, { emit }) {
    const data = reactive({
      page: 1,
      search_complex: "",
    });

    /* 後端回傳，總頁數 */
    const page_num = computed(() => {
      if (prop.paginator?.page_num) {
        return prop.paginator.page_num;
      }
      return 1;
    });

    /** 觸發搜尋 */
    const getLists = (query: Record<string, string | number>) => {
      emit("searching", query);
    };

    const submitPage = async (feature: string) => {
      const { search_complex, page } = data;
      const num = Number(page_num.value);
      let query: Record<string, string | number> = { search_complex, page };
      switch (feature) {
        case "goPage":
          data.page = data.page > num ? num : data.page;
          query = { search_complex, page: data.page };
          getLists(query);
          break;
        case "firstPage":
          data.page = 1;
          query = { search_complex, page: data.page };
          getLists(query);
          break;
        case "prevPage":
          data.page = page - 1 > 1 ? page - 1 : 1;
          query = { search_complex, page: data.page };
          getLists(query);
          break;
        case "nextPage":
          data.page = Number(page) + 1 > num ? num : Number(page) + 1;
          query = { search_complex, page: data.page };
          getLists(query);
          break;
        case "lastPage":
          data.page = page_num.value;
          query = { search_complex, page: page_num.value };
          getLists(query);
          break;
        case "search":
          query = { search_complex, page: 1 };
          getLists(query);
          break;
        default:
          getLists(query);
          break;
      }
    };

    const refData = toRefs(data);

    return {
      ...refData,
      submitPage,
      page_num,
    };
  },
});
</script>

<style lang="scss" scoped>
$active: #648dda;
$border: #999;
$text: #666;

@mixin borderBtn($color) {
  button {
    @content;
    padding: 0 0.2rem;
    color: $text;
    background: #fff;
    border: 1px solid $color;
    border-radius: 0.3rem;
    transition: all 0.3s;
    max-width: 50px;
    & + button {
      margin-left: 0.5rem;
    }
    &:hover {
      background: lighten($color: $active, $amount: 10%);
      color: #fff;
    }
    &:focus,
    &:active {
      background: $active;
      color: #fff;
      border-color: transparent;
    }
  }
}
//大版
@mixin xl() {
  @media all and (min-width: 1200px) {
    @content;
  }
}

//中版
@mixin md() {
  @media all and (min-width: 768px) {
    @content;
  }
}

//小平板
@mixin sm() {
  @media all and (min-width: 768px) and (max-width: 1119px) {
    @content;
  }
}
//手機
@mixin xs() {
  @media all and (max-width: 767px) {
    @content;
  }
}
.pager {
  text-align: center;
  // 頁數
  button {
    &.disable {
      color: #ccc;
      border-color: #ccc;
      pointer-events: none;
    }
  }
  .paginator {
    padding: 0;
    width: 50px;
    height: 28px;
    text-align: center;
  }
  // 移除 input number 上下箭頭
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }

  .showPage {
    max-width: 150px;
    vertical-align: middle;
    display: inline-block;
    padding: 0 1rem;
    margin: 0;
    color: $text;
    @include xs {
      text-align: center;
    }
    .current {
      color: $active;
      @include md {
        display: inline-block;
        font-weight: bold;
        transform: translateY(0.2rem);
        font-size: 150%;
        font-style: italic;
      }
    }
  }
  @include borderBtn($border);

  @include xs {
    display: flex;
    vertical-align: middle;
    width: 100%;
    & > * {
      flex: 1 1 auto;
      font-size: 150%;
    }
  }
}
</style>
