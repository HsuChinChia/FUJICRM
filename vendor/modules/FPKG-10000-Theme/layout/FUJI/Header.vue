<template>
  <div class="header-wrap d-flex" :style="styleObj">
    <div class="header navbar">
      <div class="d-flex align-items-center">
        <button
          @click="$store.dispatch('settoolbar', true)"
          :class="{ 'is-active': toolbar }"
          :title="
            toolbar
              ? $i18n.global.t('Theme.closeToolbar')
              : $i18n.global.t('Theme.openToolbar')
          "
          class="toolbar-btn d-md-none"
          type="button"
        >
          <icon icon="fas fa-cog"></icon>
        </button>
        <!-- 大版的漢堡 -->
        <button
          @click="$store.dispatch('setPCsidebar', !PCsidebar)"
          :class="{ 'is-active': sidebar }"
          :title="$i18n.global.t('Theme.collapseSidebar')"
          class="hamburger hamburger--squeeze d-none d-md-inline"
          type="button"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
        <!-- 小版的漢堡 -->
        <button
          @click="$store.dispatch('setsidebar', !sidebar)"
          :class="{ 'is-active': sidebar }"
          :title="
            sidebar
              ? $i18n.global.t('Theme.closeSidebar')
              : $i18n.global.t('Theme.openSidebar')
          "
          class="hamburger hamburger--squeeze d-md-none"
          type="button"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
        <div style="width: 160px">
          <logo></logo>
          <!-- <img class="ms-3 me-5 hover d-none d-md-block" alt="" /> -->
        </div>
        <div class="searchGrop d-md-flex d-none ml-5">
          <div
            v-if="getCrud('search')"
            class="el-input el-input--mini ml-3 search-icon"
          >
            <input
              @keyup.enter="search(keyword)"
              v-model="keyword"
              class="el-input__inner search-input"
              type="text"
              autocomplete="off"
              placeholder="搜尋"
            />
          </div>
          <button
            v-if="getCrud('advSearch')"
            @click="$bus.$emit('advSearch', true)"
            :title="$i18n.global.t('Theme.search')"
            type="button"
            style="height: 28px"
            class="ml-1 advSearch"
          >
            <icon color="#777" icon="fas fa-search-plus" />
          </button>
        </div>
      </div>

      <div class="d-flex">
        <div class="group-item d-inline-block d-md-none">
          <button
            v-if="getCrud('advSearch')"
            @click="$bus.$emit('advSearch', true)"
            :title="$i18n.global.t('Theme.search')"
            type="button"
            class="btn-header search"
          >
            <icon icon="fas fa-search" />
          </button>
        </div>
        <!-- <message ref="message" class="group-item" /> -->
        <myFunction class="group-item" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
/* eslint-disable camelcase */
// import langChanger from "@/modules/FPKG-20000-Util/components/langChanger/index.vue";
import myFunction from "./components/function/index.vue";
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
  getCurrentInstance,
  watch,
} from "vue";
// import axios from "axios";
// import store from "@/modules/FPKG-50000-Vuex";
import { useStore } from "vuex";
import { libratCrud } from "./library/Crud";
import { useRouter } from "vue-router";

let logo: any;
const path = process.env.VUE_APP_LOGO;
try {
  logo = path
    ? require(process.env.VUE_APP_LOGO as string).default
    : require("./null.vue").default;
} catch (error) {
  logo = require("./null.vue").default;
}

export default defineComponent({
  components: { myFunction, logo },
  name: "Header",
  setup(props, context) {
    const { proxy }: any = getCurrentInstance();
    const vuexStore = useStore();

    const getSidebarWidth = computed(() => vuexStore.state.getSidebar.width);

    // 動態style
    const styleObj = {};

    // const $bus = proxy.$bus;
    const data = reactive({
      // sidebar: false, // sidebar的開關狀態
      tagShow: true, // sidebar的開關狀態
      // PCsidebar: false, // PCsidebar的開關狀態
      // toolbar: false, // 工具列的開關狀態
      keyword: "", // 搜尋用關鍵字
      styleObj: {
        left: `${vuexStore.state.getSidebar.width}px`,
        width: `calc(100% - ${vuexStore.state.getSidebar.width}px)`,
      },
    });
    const { getCrud } = libratCrud();
    const { initWebSocket } = proxy.$socket;

    watch(getSidebarWidth, (newValue, oldValue) => {
      data.styleObj.left = `${newValue}px`;
      data.styleObj.width = `calc(100% - ${newValue}px)`;
    });

    /** 關鍵字搜尋 */
    const search = (search_complex: string) => {
      // 針對庫存維護如果這兩個值則繼續保留
      const query: any = {
        search_complex,
        page: 1,
      };
      proxy.$router.push({ query });
    };

    const router = useRouter();

    router.afterEach((to, from) => {
      // 不在當前權限路徑下清空模糊搜尋
      if (from && to.meta.url !== from.meta.url) {
        data.keyword = "";
      }
    });

    const refData = toRefs(data);
    const vuexState = computed(() => useStore().state);

    const PCsidebar = computed(() => {
      return vuexState.value.getSidebar.PCsidebar;
    });
    const sidebar = computed(() => {
      return vuexState.value.getSidebar.sidebar;
    });
    const toolbar = computed(() => {
      return vuexState.value.getSidebar.toolbar;
    });

    onMounted(async () => {
      /** 初始化socket */
      initWebSocket();
      // 接收bus 傳過來的值
      // $bus.$on("sidebar", (params: boolean) => {
      //   data.sidebar = params;
      // });
      // $bus.$on("toolbar", (status: boolean) => {
      //   data.toolbar = status;
      // });
    });

    return {
      getCrud,
      ...refData,
      vuexState,
      sidebar,
      PCsidebar,
      search,
      toolbar,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./style/style";
$icon: $main;
$iconHover: darken($icon, 5%);
$gray: $text;
$sub: $sub;
$header-color: hsla(0, 0%, 100%, 0.8);

@media screen and (min-width: 768px) {
  .header.navbar::before {
    // content: '';
    // position: absolute;
    // display: block;
    // left: 0;
    // top: 0;
    // width: 230px;
    // height: 50px;
    // background-color: rgba(20, 20, 31, 0.12);
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
.logo-collapsed {
  min-width: $sidebar-collapsed-width !important;
}
.header-color {
  color: $header-color;
}
.header-wrap {
  box-shadow: 0px 2px 4px rgba(95, 95, 95, 0.2);
  color: $header-color;
  // background-color: var(--top-color);
  min-height: 50px;
  position: absolute;
  @include xs {
    position: static;
    width: 100% !important;
  }
  .logo {
    -webkit-transition: min-width 0.3s ease-in-out;
    transition: min-width 0.3s ease-in-out;
    // min-width: calc(#{$sidebar-width} - 1px);
    display: inline-block;
    border-bottom: 1px solid $icon;
    background-position: center center;
    background-size: 80%;
    background-repeat: no-repeat;
    background-color: $icon;
    @include xs {
      display: none;
    }
    &:hover {
      background-color: $iconHover;
    }
    a {
      display: block;
      height: 100%;
    }
  }
  .header {
    z-index: 1;
    .idleTime {
      height: 30px;
      @media all and (max-width: 500px) {
        display: none;
      }
    }
    width: 100%;
    @include sm {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
    @include xs {
      padding-left: 1rem;
      padding-right: 1rem;
      // background-color: $main;
    }
    .header-menu-btn {
      border: 0;
      background: transparent;
    }
    .toolbar-btn {
      color: $header-color;
      font-size: 20px;
      border: 2px solid $sub;
      background: $main;
      color: $sub;
      border-radius: 99rem;
      padding: 0.3rem 0.4rem;
      position: fixed;
      right: 2rem;
      bottom: 2rem;
      z-index: 99;
      transition: all 0.3s;
      &.is-active {
        bottom: -3rem;
      }
      &:active,
      &:focus {
        background: darken($main, 5%);
      }
    }

    .group-item + .group-item {
      margin-left: 0.5rem;
    }
  }
  .logohover {
    cursor: pointer;
  }
}

.search-icon {
  position: relative;
  &:before {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: "\f002";
    position: absolute;
    color: #777;
    left: 10px;
    top: 53%;
    transform: translateY(-50%);
  }
}
.search-input {
  // background-color: hsla(0, 0%, 100%, 0.12);
  // border: 0;
  // color: hsla(0, 0%, 100%, 0.6);
  padding-left: 2.2rem;
  transition: all 0.3s;
  &:focus {
    // color: #fff;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
  }
}
.advSearch {
  border-radius: 6px;
  border: 0px;
  // color: hsla(0, 0%, 100%, 0.6);
  // background-color: hsla(0, 0%, 100%, 0.12);
  transition: all 0.3s;
  &:hover {
    // color: #fff;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
  }
}
</style>

<style lang="scss" src="./style/hamburgers/hamburgers.scss">
</style>
