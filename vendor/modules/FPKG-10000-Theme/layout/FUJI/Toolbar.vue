<template>
  <component
    :is="screenWidth > 768 ? 'div' : 'el-drawer'"
    v-model="toolbar"
    @closed="
      toolbar = false;
      $bus.$emit('toolbar', toolbar);
      $store.dispatch('settoolbar', false);
    "
    :append-to-body="false"
    :show-close="false"
    direction="btt"
    size="auto"
    :style="styleObj"
    class="toolbar"
    custom-class="toolbar"
  >
    <div class="toolbarArea">
      <div class="breadcrumbs">
        <div
          v-for="(bread, index) in breadcrumb"
          :key="'bread' + index"
          class="d-inline-block"
        >
          <icon v-if="index !== 0" icon="fas fa-chevron-right"></icon>
          <router-link
            :class="{ current: breadcrumb.length === index + 1 }"
            :to="bread.href ? `/${bread.href}` : `${$route.fullPath}`"
          >
            <icon :icon="bread.icon"></icon>
            {{ breadSubstring(bread.label) }}</router-link
          >
        </div>
      </div>
      <div v-if="getCrud('pager')" class="pager">
        <button
          :class="{ disable: paginator === 1 }"
          :title="$i18n.global.t('Theme.firstPage')"
          type="button"
          @click="
            submitPage('firstPage');
            $store.dispatch('settoolbar', false);
          "
        >
          <icon icon="fas fa-angle-double-left"></icon>
        </button>
        <button
          :title="$i18n.global.t('Theme.prevPage')"
          :class="{ disable: paginator === 1 }"
          type="button"
          @click="
            submitPage('prevPage');
            $store.dispatch('settoolbar', false);
          "
        >
          <icon icon="fas fa-angle-left"></icon>
        </button>
        <p class="showPage" :title="$i18n.global.t('Theme.currentPage')">
          <!-- <span class="current">3</span> -->
          <input
            v-on:keyup.enter="submitPage('goPage')"
            class="paginator el-input__inner"
            v-model="paginator"
            type="number"
            autocomplete="off"
            :min="1"
            :max="page_num"
          />
          /{{ page_num }}
        </p>
        <button
          :title="$i18n.global.t('Theme.nextPage')"
          :class="{ disable: paginator === page_num }"
          type="button"
          @click="
            submitPage('nextPage');
            $store.dispatch('settoolbar', false);
          "
        >
          <icon icon="fas fa-angle-right"></icon>
        </button>
        <button
          :class="{ disable: paginator === page_num }"
          :title="$i18n.global.t('Theme.lastPage')"
          type="button"
          @click="
            submitPage('lastPage');
            $store.dispatch('settoolbar', false);
          "
        >
          <icon icon="fas fa-angle-double-right"></icon>
        </button>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="toolbarArea">
      <div class="tools">
        <button
          ref="tools-create"
          v-if="getCrud('create')"
          @click="
            $bus.$emit('create');
            $store.dispatch('settoolbar', false);
          "
          :title="$i18n.global.t('Theme.create')"
          type="button"
          class="el-button el-button--primary el-button--small group-item"
        >
          <icon icon="fas fa-plus"></icon>
          <span v-if="$route.name == 'vendor-supplier-commodity-lists'">{{
            $i18n.global.t('Vendor.supplier.add_commodity')
          }}</span>
          <span v-else>{{ $i18n.global.t('Theme.create') }}</span>
        </button>

        <button
          v-if="getCrud('info')"
          @click="
            $bus.$emit('info');
            $store.dispatch('settoolbar', false);
          "
          :title="$i18n.global.t('Theme.info')"
          type="button"
          class="el-button el-button--info el-button--small group-item"
        >
          <icon icon="fas fa-eye"></icon>
          <span>{{ $i18n.global.t('Theme.info') }}</span>
        </button>

        <button
          v-if="getCrud('modify')"
          @click="
            $bus.$emit('modify');
            $store.dispatch('settoolbar', false);
          "
          :title="$i18n.global.t('Theme.modify')"
          type="button"
          class="el-button el-button--success el-button--small group-item"
        >
          <icon icon="fas fa-edit"></icon>
          <span>{{ $i18n.global.t('Theme.modify') }}</span>
        </button>

        <button
          v-if="getCrud('save')"
          @click="
            $bus.$emit('save');
            $store.dispatch('settoolbar', false);
          "
          :title="$i18n.global.t('Theme.save')"
          type="button"
          class="el-button el-button--success el-button--small group-item"
        >
          <icon icon="fas fa-save"></icon>
          <span>{{ $i18n.global.t('Theme.save') }}</span>
        </button>

        <button
          v-if="getCrud('saveAndGo')"
          @click="
            $bus.$emit('saveAndGo');
            $store.dispatch('settoolbar', false);
          "
          :title="$i18n.global.t('Theme.saveAndReturn')"
          type="button"
          class="el-button el-button--success el-button--small group-item"
        >
          <icon icon="fas fa-save"></icon>
          <span>{{ $i18n.global.t('Theme.saveAndReturn') }}</span>
        </button>

        <button
          v-if="getCrud('keepCreate')"
          @click="
            $bus.$emit('keepCreate');
            $store.dispatch('settoolbar', false);
          "
          :title="$i18n.global.t('Theme.keepCreate')"
          type="button"
          class="el-button el-button--primary el-button--small group-item"
        >
          <icon icon="fas fa-plus"></icon>
          <span>{{ $i18n.global.t('Theme.keepCreate') }}</span>
        </button>

        <button
          v-if="getCrud('delete')"
          @click="
            $bus.$emit('delete');
            $store.dispatch('settoolbar', false);
          "
          :title="$i18n.global.t('Theme.delete')"
          type="button"
          class="el-button el-button--danger el-button--small group-item"
        >
          <i class="el-icon-delete"></i>
          <span>{{ $i18n.global.t('Theme.delete') }}</span>
        </button>

        <button
          v-if="getCrud('export')"
          @click="
            $bus.$emit('export');
            $store.dispatch('settoolbar', false);
          "
          :title="$i18n.global.t('Theme.export')"
          type="button"
          class="el-button el-button--info el-button--small group-item"
        >
          <icon icon="fas fa-file-download"></icon>
          <span>{{ $i18n.global.t('Theme.export') }}</span>
        </button>

        <button
          v-if="getCrud('role')"
          @click="
            $bus.$emit('role');
            $store.dispatch('settoolbar', false);
          "
          :title="$i18n.global.t('Theme.role')"
          type="button"
          class="el-button el-button--info el-button--small group-item"
        >
          <icon icon="fas fa-user"></icon>
          <span>{{ $i18n.global.t('Theme.role') }}</span>
        </button>
        <!-- 一鍵審核(通過) -->
        <button
          v-if="getCrud('allPass')"
          @click="
            $bus.$emit('allPass');
            $store.dispatch('settoolbar', false);
          "
          :title="$i18n.global.t('Theme.allPass')"
          type="button"
          class="el-button el-button--info el-button--small group-item"
        >
          <icon icon="fas fa-check-square"></icon>
          <span>{{ $i18n.global.t('Theme.allPass') }}</span>
        </button>
        <!-- 一鍵審核(不通過) -->
        <button
          v-if="getCrud('allFail')"
          @click="
            $bus.$emit('allFail');
            $store.dispatch('settoolbar', false);
          "
          :title="$i18n.global.t('Theme.allFail')"
          type="button"
          class="el-button el-button--info el-button--small group-item"
        >
          <icon icon="fas fa-window-close"></icon>
          <span>{{ $i18n.global.t('Theme.allFail') }}</span>
        </button>
        <!-- 一鍵審核(通過) -->
        <button
          v-if="getCrud('allOpen')"
          @click="
            $bus.$emit('allOpen');
            $store.dispatch('settoolbar', false);
          "
          :title="$i18n.global.t('Theme.allOpen')"
          type="button"
          class="el-button el-button--info el-button--small group-item"
        >
          <icon icon="fas fa-check-square"></icon>
          <span>{{ $i18n.global.t('Theme.allOpen') }}</span>
        </button>
        <!-- 一鍵審核(不通過) -->
        <button
          v-if="getCrud('allClose')"
          @click="
            $bus.$emit('allClose');
            $store.dispatch('settoolbar', false);
          "
          :title="$i18n.global.t('Theme.allClose')"
          type="button"
          class="el-button el-button--info el-button--small group-item"
        >
          <icon icon="fas fa-window-close"></icon>
          <span>{{ $i18n.global.t('Theme.allClose') }}</span>
        </button>
        <!-- 時間 -->
        <el-button
          v-if="getCrud('yesterday')"
          @click="
            $bus.$emit('yesterday');
            $store.dispatch('settoolbar', false);
          "
          type="primary"
          size="small"
          ><icon icon="fas fa-clock" />
          {{ $i18n.global.t('Util.yesterday') }}</el-button
        >

        <el-button
          v-if="getCrud('today')"
          @click="
            $bus.$emit('today');
            $store.dispatch('settoolbar', false);
          "
          type="primary"
          size="small"
          ><icon icon="fas fa-clock" />
          {{ $i18n.global.t('Util.today') }}</el-button
        >

        <el-button
          v-if="getCrud('BeforeWeek')"
          @click="
            $bus.$emit('BeforeWeek');
            $store.dispatch('settoolbar', false);
          "
          type="warning"
          size="small"
          ><icon icon="fas fa-clock" />
          {{ $i18n.global.t('Util.BeforeWeek') }}</el-button
        >

        <el-button
          v-if="getCrud('Week')"
          @click="
            $bus.$emit('Week');
            $store.dispatch('settoolbar', false);
          "
          type="warning"
          size="small"
          ><icon icon="fas fa-clock" />
          {{ $i18n.global.t('Util.Week') }}</el-button
        >

        <el-button
          v-if="getCrud('BeforeMoon')"
          @click="
            $bus.$emit('BeforeMoon');
            $store.dispatch('settoolbar', false);
          "
          type="danger"
          size="small"
          ><icon icon="fas fa-clock" />
          {{ $i18n.global.t('Util.BeforeMoon') }}</el-button
        >

        <el-button
          v-if="getCrud('Moon')"
          @click="
            $bus.$emit('Moon');
            $store.dispatch('settoolbar', false);
          "
          type="danger"
          size="small"
          ><icon icon="fas fa-clock" />
          {{ $i18n.global.t('Util.Moon') }}</el-button
        >

        <el-button
          v-if="getCrud('customTime')"
          @click="
            $bus.$emit('customTime');
            $store.dispatch('settoolbar', false);
          "
          type="success"
          size="small"
          ><icon icon="fas fa-clock" />
          {{ $i18n.global.t('Util.customTime') }}</el-button
        >

        <div class="d-md-none py-4">
          <el-button
            class="w-100 text-left"
            @click="
              $bus.$emit('toolbar', toolbar);
              $store.dispatch('settoolbar', false);
            "
          >
            <icon icon="fas fa-times"></icon>
            {{ $i18n.global.t('Theme.close') }}
          </el-button>
        </div>
      </div>

      <div class="search-bar">
        <!-- <form @submit.prevent="search(keyword)" class="search-form">
          <input
            v-if="getCrud('search')"
            v-model="keyword"
            type="text"
            :title="$i18n.global.t('Theme.search')"
            :placeholder="$i18n.global.t('Theme.search')"
          />
          <button
            v-if="getCrud('search')"
            :title="$i18n.global.t('Theme.search')"
            type="submit"
          >
            <icon icon="fas fa-search"></icon>
          </button>
          <button
            v-if="getCrud('advSearch')"
            @click="$bus.$emit('advSearch')"
            :title="$i18n.global.t('Theme.AdvancedSearch')"
            type="button"
          >
            <icon icon="fas fa-search-plus"></icon>
          </button>
        </form> -->
      </div>
      <div class="clearfix"></div>
    </div>
  </component>
</template>

<script lang="ts">
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
} from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import http from '@/modules/FPKG-230000-BackendCore/prototypes/axios';
import token from '@/modules/FPKG-20000-Util/prototypes/TokenCode';
import store from '@/modules/FPKG-50000-Vuex';
import { useRoute, useRouter } from 'vue-router';
import { PrototypesCrud } from '@/modules/FPKG-20000-Util/prototypes/crud';
import screen from '@/modules/FPKG-20000-Util/prototypes/screen';
import { libratCrud } from './library/Crud';

interface Node {
  p3_bne_name?: string;
  p4_node_name?: string;
  p4_node_route?: string;
  crud: number;
  p4_node_id: number;
  p4_node_pid: number;
}

export default defineComponent({
  name: 'Toolbar',
  setup() {
    const { crud } = PrototypesCrud();
    const { screenWidth } = screen();
    const { proxy }: any = getCurrentInstance();
    const internalInstance: any = getCurrentInstance();
    const vuexStore = useStore();
    const data: any = reactive({
      collapse: false,

      styleObj: {
        left: `${vuexStore.state.getSidebar.width}px`,
        width: `calc(100% - ${vuexStore.state.getSidebar.width}px)`,
      },

      init_styleObj: {
        width: `calc(100% - ${vuexStore.state.getSidebar.initwidth}px)`,
      },

      keyword: '', // 搜尋用關鍵字
      breadcrumb: [],
      // toolbar: false,
      paginator: 1,
      init_sidebar_width: 200,
    });

    const getSidebarWidth = computed(() => vuexStore.state.getSidebar.width);
    const router = useRouter();

    router.afterEach((to, from) => {
      data.paginator = to.query.page ? to.query.page : 1;
      data.breadcrumb = breadcrumbList();
      // 不在當前權限路徑下清空模糊搜尋
      if (from && to.meta.url !== from.meta.url) {
        data.keyword = '';
      }
    });

    watch(getSidebarWidth, (newValue, oldValue) => {
      data.styleObj.left = `${newValue}px`;
      data.styleObj.width = `calc(100% - ${newValue}px)`;
    });

    const breadcrumbData = computed(
      () => vuexStore.state.getBreadcrumb.breadcrumb,
    );

    watch(breadcrumbData, (newValue, oldValue) => {
      if (newValue instanceof Array) {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
          data.breadcrumb = data.breadcrumb.concat(newValue);
        }
      } else if (typeof newValue === 'object') {
        data.breadcrumb.push(newValue);
      } else {
        data.breadcrumb = breadcrumbList();
      }
    });

    const page_num = computed(() => {
      const store = vuexStore.state;
      if (
        store &&
        store.getList &&
        store.getList.paginator &&
        store.getList.paginator.page_num
      ) {
        return store.getList.paginator.page_num;
      }
      return 1;
    });

    const { getToolbarCrud, getRouterPermission, getCrud } = libratCrud();

    const breadSubstring = (label: any) => {
      if (!label) return '';
      const text = label.substring(0, 4);
      if (text === 'NODE') {
        return proxy.$i18n.global.t(`Permission.${label}`);
      }
      return label;
    };

    /** 關鍵字搜尋 */
    const search = (search_complex: string) => {
      // 針對庫存維護如果這兩個值則繼續保留
      const search_p12_wse_id = proxy.$route.query.search_p12_wse_id;
      const search_p12_wse_name = proxy.$route.query.search_p12_wse_name;
      const query: any = {
        search_complex,
        page: 1,
        search_p12_wse_id,
        search_p12_wse_name,
      };
      proxy.$router.push({ query });
    };

    /**
     * 傳送頁數 (未完)
     */
    const submitPage = (feature: string) => {
      let page: any = Number(data.paginator);
      const num = Number(page_num.value);
      let query: any = { ...proxy.$route.query, page };
      switch (feature) {
        case 'goPage':
          query = { ...proxy.$route.query, page };
          break;
        case 'firstPage':
          page = 1;
          query = { ...proxy.$route.query, page };
          break;
        case 'prevPage':
          page = page - 1 > 1 ? page - 1 : 1;
          query = { ...proxy.$route.query, page };
          break;
        case 'nextPage':
          page = Number(page) + 1 > num ? num : Number(page) + 1;
          query = { ...proxy.$route.query, page };
          break;
        case 'lastPage':
          page = page_num.value;
          query = { ...proxy.$route.query, page: page_num.value };
          break;
        default:
          break;
      }
      proxy.$router.push({ query });
    };

    /**
     * 將麵包屑用遞迴方式實做出來
     */

    const actions = (
      data: Array<object>,
      urlList: Array<object>,
      pid?: number,
    ) => {
      if (pid !== null) {
        const node: any = urlList.find((item: any) => item.p4_node_id === pid);
        if (!node) return;
        data.push({
          label: node.p4_node_code,
          href: node.p4_node_route,
          icon: node.icon,
        });
        actions(data, urlList, node.p4_node_pid);
      }
    };

    const breadcrumbList = () => {
      const tempData: Array<object> = [];
      const urlList = JSON.parse(localStorage.getItem('Node') || '{}');
      const routeUrl = proxy.$route.meta.url;
      const node =
        urlList.filter((item: any) => item.p4_node_route === routeUrl)[0] || {};

      tempData.push({
        label: node.p4_node_code,
        href: node.p4_node_route,
        icon: node.icon,
      });
      actions(tempData, urlList, node.p4_node_pid);
      tempData.reverse();
      return tempData;
    };

    const toolbar = computed(() => {
      return vuexStore.state.getSidebar.toolbar;
    });

    onMounted(async () => {
      // internalInstance.appContext.config.globalProperties.$bus.$on(
      //   "toolbar",
      //   (status: boolean) => {
      //     data.toolbar = status;
      //   }
      // );
      internalInstance.appContext.config.globalProperties.$bus.$on(
        'PC_sidebar',
        (params: boolean) => {
          data.collapse = params;
        },
      );

      data.breadcrumb = breadcrumbList() as any;

      const key: any = proxy.$route.query.search_complex;
      data.keyword = key;
    });
    const refData = toRefs(data);

    return {
      ...refData,
      getSidebarWidth,
      vuexStore,
      getCrud,
      breadSubstring,
      screenWidth,
      search,
      page_num,
      toolbar,
      submitPage,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './style/style';
$sub: $sub;
$border: $text;
$text: $text;

@mixin borderBtn($color) {
  button {
    @content;
    padding: 0 0.2rem;
    color: $color;
    background: #fff;
    border: 1px solid $color;
    border-radius: 0.3rem;
    transition: all 0.3s;
    & + button {
      margin-left: 0.5rem;
    }
    &:hover {
      background: lighten($color: $sub, $amount: 10%);
    }
    &:focus,
    &:active {
      background: $sub;
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

// 直立手機
@mixin portrait() {
  @media screen and (orientation: portrait) and (max-width: 480px) {
    @content;
  }
}
// 點擊collapsed事件變更css
.toolbar-collapsed {
  @include md {
    left: $sidebar-collapsed-width !important;
    width: 100%;
  }
}
.toolbar {
  @include md {
    height: 101px;
    position: absolute;
    right: 0;
    top: 50px;
    // left: $sidebar-width;
    padding: 0.5rem 47px 1rem;
    // width: calc(100% - #{$sidebar-width});
    background: #f7f7f7;
    border-bottom: 1px solid #d4d4d4;
  }
  @include sm {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @include xs {
    left: 0 !important;
    width: 100% !important;
  }
  .toolbarArea {
    @include xs {
      .el-button {
        margin-bottom: 0.5rem !important;
      }
    }
    & + .toolbarArea {
      margin-top: 0.5rem;
    }
    @include xs {
      padding: 1rem;
    }
  }
  .tools {
    display: inline-block;
    @include xs {
      display: block;
    }
    .btn-toolbar {
      font-size: 80%;
      background-color: transparent;
      border: 1px solid $border;
      color: $text;
      padding: 0.32rem 1.5rem;
      border-radius: 0.3rem;
      transition: background 0.3s;
      position: relative;
      i + span {
        margin-left: 0.5rem;
      }
      & + button {
        margin-left: 0.5rem;
      }
      &:hover,
      &:focus {
        background-color: $sub;
        color: #333;
        i {
          color: #111;
        }
      }
      @include sm {
        padding: 0.33rem 0.5rem;
        span {
          display: none;
        }
      }
      @include xs {
        font-size: 100%;
        width: 100%;
        margin: 0.3rem 0;
        & + button {
          margin-left: 0;
        }
      }
    }
  }

  .breadcrumbs {
    padding: 0.4rem 0;
    display: inline-block;
    a {
      color: $text;
      letter-spacing: 0.15rem;
      margin: 0 0.5rem;
      &.current {
        color: $sub;
      }
    }
  }
  .search-bar {
    position: relative;
    @include md {
      float: right;
    }
    @include xs {
      display: none;
    }
    .search-form {
      height: 2rem;
      // 單獨進階搜尋按鈕存在時
      button {
        border-radius: 0.3rem;
        border: 1px solid #5b5b5b;
        background: #fff;
        padding: 0.2rem 0.4rem;
        color: $border;
        &:hover,
        &:focus,
        &:active {
          background: darken(#fff, 10%);
        }
      }
      input {
        background: #f5f5f5;
        // border-top-left-radius: 99rem;
        // border-bottom-left-radius: 99rem;
        border: 1px solid $border;
        padding: 0.2rem 1rem;
        transition: all 0.3s;
        width: 10rem;
        height: 100%;
        @include sm {
          width: 7rem;
        }
        &:hover {
          background: darken(#f5f5f5, 10%);
        }
        &:focus {
          background: $main;
          color: $sub;
        }
        & + button,
        & + button + button {
          border-radius: 0;
          border: 1px solid $border;
          background: #fff;
          border-left: 0;
          padding: 0.2rem 0.5rem;
          transition: all 0.3s;
          &:hover {
            background: lighten($color: $sub, $amount: 10%);
          }
          &:focus,
          &:active {
            background: $sub;
          }
        }
        // 按鈕後方綴飾區塊
        & + button + .radius,
        & + button + button + .radius {
          display: inline-block;
          vertical-align: middle;
          // border-top-right-radius: 99rem;
          // border-bottom-right-radius: 99rem;
          border: 1px solid #5b5b5b;
          background: #fff;
          padding: 0 0.4rem;
          border-left: 0;
          height: 100%;
          margin-top: -2px;
        }
      }
    }
  }
  .pager {
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
    input[type='number'] {
      -moz-appearance: textfield;
    }
    margin-bottom: 0.2rem;
    .showPage {
      vertical-align: middle;
      display: inline-block;
      padding: 0 1rem;
      margin: 0;
      color: $text;
      @include xs {
        text-align: center;
      }
      .current {
        color: $sub;
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
    @include md {
      float: right;
    }
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
  .group-item + .group-item {
    margin-left: 1rem;
  }
}
</style>
