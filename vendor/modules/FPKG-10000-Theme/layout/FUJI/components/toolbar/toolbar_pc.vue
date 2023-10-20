<template>
  <div id="Toolbar" class="toolbar">
    <div class="toolbarArea" style="border-bottom: 1px solid #d5d5d5">
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
            style="text-decoration: none"
          >
            <icon :icon="bread.icon"></icon>
            {{ breadSubstring(bread.label) }}</router-link
          >
        </div>
      </div>
      <form
        @submit.prevent="search(keyword)"
        class="d-md-none search-form mb-2"
      >
        <el-input
          v-if="getCrud('search')"
          v-model="keyword"
          @keyup.esc="search()"
          @clear="search()"
          @keyup.enter="search(keyword)"
          :clearable="true"
          prefix-icon="fas fa-search"
          placeholder="Search..."
          type="search"
          class="searcher"
        />
        <button
          v-if="getCrud('advSearch')"
          @click="$bus.$emit('advSearch')"
          :title="$i18n.global.t('Theme.AdvancedSearch')"
          type="button"
        >
          <icon icon="fas fa-search-plus"></icon>
        </button>
      </form>
      <div v-if="getCrud('pager')" class="pager">
        <Pagination />
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="toolbarArea">
      <div class="tools d-flex" id="tools-pc-target">
        <button
          ref="tools-create"
          v-if="getCrud('create') && show_btn_create"
          @click="
            $bus.$emit('create');
            $store.dispatch('settoolbar', false);
          "
          :title="$i18n.global.t('Theme.create')"
          type="button"
          class="el-button el-button--primary el-button--small group-item"
        >
          <icon icon="fas fa-plus"></icon>
          <span>{{
            btn_creatName ? btn_creatName : $i18n.global.t("Theme.create")
          }}</span>
        </button>

        <button
          v-if="getCrud('info') && show_btn_info"
          @click="
            $bus.$emit('info');
            $store.dispatch('settoolbar', false);
          "
          :title="$i18n.global.t('Theme.info')"
          type="button"
          class="el-button el-button--info el-button--small group-item"
        >
          <icon icon="fas fa-eye"></icon>
          <span>{{ $i18n.global.t("Theme.info") }}</span>
        </button>

        <button
          v-if="getCrud('modify') && show_btn_modify"
          @click="
            $bus.$emit('modify');
            $store.dispatch('settoolbar', false);
          "
          :title="$i18n.global.t('Theme.modify')"
          type="button"
          class="el-button el-button--success el-button--small group-item"
        >
          <icon icon="fas fa-edit"></icon>
          <span>{{ $i18n.global.t("Theme.modify") }}</span>
        </button>

        <button
          v-if="getCrud('save') && show_btn_save"
          @click="
            $bus.$emit('save');
            $store.dispatch('settoolbar', false);
          "
          :title="$i18n.global.t('Theme.save')"
          type="button"
          class="el-button el-button--success el-button--small group-item"
        >
          <icon icon="fas fa-save"></icon>
          <span>{{ $i18n.global.t("Theme.save") }}</span>
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
          <span>{{ $i18n.global.t("Theme.saveAndReturn") }}</span>
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
          <span>{{ $i18n.global.t("Theme.keepCreate") }}</span>
        </button>

        <el-button
          v-if="getCrud('setMember')"
          @click="
            $bus.$emit('setMember');
            $store.dispatch('settoolbar', false);
          "
          type="success"
          size="small"
          title="選擇組員"
        >
          <icon icon="fas fa-users" />
          {{ "選擇組員" }}
        </el-button>

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
          <span>{{ $i18n.global.t("Theme.delete") }}</span>
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
          <span>{{ $i18n.global.t("Theme.export") }}</span>
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
          <span>{{ $i18n.global.t("Theme.role") }}</span>
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
          <span>{{ $i18n.global.t("Theme.allPass") }}</span>
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
          <span>{{ $i18n.global.t("Theme.allFail") }}</span>
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
          <span>{{ $i18n.global.t("Theme.allOpen") }}</span>
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
          <span>{{ $i18n.global.t("Theme.allClose") }}</span>
        </button>
        <!-- 自訂義按鈕 -->
        <button
          v-if="creatToolsBtn.show"
          @click="$bus.$emit('universal')"
          :title="creatToolsBtn.title"
          type="button"
          class="el-button el-button--small group-item"
          :class="`el-button--${creatToolsBtn.type}`"
        >
          <icon v-if="creatToolsBtn.icon" :icon="creatToolsBtn.icon"></icon>
          <span>{{ creatToolsBtn.title }}</span>
        </button>
        <button
          v-if="creatToolsBtn2.show"
          @click="$bus.$emit('universal2')"
          :title="creatToolsBtn2.title"
          type="button"
          class="el-button el-button--small group-item"
          :class="`el-button--${creatToolsBtn2.type}`"
        >
          <icon v-if="creatToolsBtn2.icon" :icon="creatToolsBtn2.icon"></icon>
          <span>{{ creatToolsBtn2.title }}</span>
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
          {{ $i18n.global.t("Util.yesterday") }}</el-button
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
          {{ $i18n.global.t("Util.today") }}</el-button
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
          {{ $i18n.global.t("Util.BeforeWeek") }}</el-button
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
          {{ $i18n.global.t("Util.Week") }}</el-button
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
          {{ $i18n.global.t("Util.BeforeMoon") }}</el-button
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
          {{ $i18n.global.t("Util.Moon") }}</el-button
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
          {{ $i18n.global.t("Util.customTime") }}</el-button
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
            {{ $i18n.global.t("Theme.close") }}
          </el-button>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  watch,
  reactive,
  toRefs,
  nextTick,
  onMounted,
  computed,
  getCurrentInstance,
  defineComponent,
} from "vue";
import { useStore } from "vuex";
import breadCrumb from "../../../../API/toolbar/breadCrumb";
import pager from "../../../../API/toolbar/pager";
import searcher from "../../../../API/toolbar/search";
import { libratCrud } from "../../library/Crud";
import Pagination from "@/modules/FPKG-10000-Theme/layout/FUJI/components/pagination.vue";

export default defineComponent({
  name: "toolbar-pc",
  components: { Pagination },
  setup() {
    const { breadSubstring, breadcrumb } = breadCrumb();
    const { paginator, perpage, page_num, submitPage, submitPerpage } = pager();
    const { search, keyword } = searcher();
    const { getCrud } = libratCrud();
    const internalInstance = getCurrentInstance();
    const $store = useStore();

    const data = reactive({
      collapse: false,
      scrollTop: 0,
      styleObj: {
        left: `${$store.state.getSidebar.width}px`,
        width: `calc(100% - ${$store.state.getSidebar.width}px)`,
      },
      init_styleObj: {
        width: `calc(100% - ${$store.state.getSidebar.initwidth}px)`,
      },
      init_sidebar_width: 200,
    });

    const getSidebarWidth = computed(() => $store.state.getSidebar.width);

    const toolbar = computed(() => {
      return $store.state.getSidebar.toolbar;
    });

    const creatToolsBtn = computed(() => {
      return $store.state.toolsBtn.btn;
    });
    const creatToolsBtn2 = computed(() => {
      return $store.state.toolsBtn.btn2;
    });
    const btn_creatName = computed(() => {
      return $store.state.toolsBtn.btn_creatName;
    });
    const show_btn_create = computed(() => {
      return $store.state.toolsBtn.show_btn_create;
    });
    const show_btn_info = computed(() => {
      return $store.state.toolsBtn.show_btn_info;
    });
    const show_btn_modify = computed(() => {
      return $store.state.toolsBtn.show_btn_modify;
    });
    const show_btn_save = computed(() => {
      return $store.state.toolsBtn.show_btn_save;
    });

    watch(getSidebarWidth, (newValue, oldValue) => {
      data.styleObj.left = `${newValue}px`;
      data.styleObj.width = `calc(100% - ${newValue}px)`;
    });

    onMounted(async () => {
      // internalInstance.appContext.config.globalProperties.$bus.$on(
      //   "toolbar",
      //   (status: boolean) => {
      //     data.toolbar = status;
      //   }
      // );
      if (internalInstance) {
        internalInstance.appContext.config.globalProperties.$bus.$on(
          "PC_sidebar",
          (params: boolean) => {
            data.collapse = params;
          }
        );
      }

      await nextTick();

      const box = document.getElementById("content-box") as HTMLDivElement;
      box.addEventListener("scroll", (e: any) => {
        data.scrollTop = e.srcElement.scrollTop;
      });
    });

    const refData = toRefs(data);

    return {
      ...refData,
      keyword,
      breadcrumb,
      paginator,
      perpage,
      getCrud,
      breadSubstring,
      search,
      page_num,
      toolbar,
      submitPage,
      submitPerpage,
      creatToolsBtn,
      creatToolsBtn2,
      btn_creatName,
      show_btn_create,
      show_btn_info,
      show_btn_modify,
      show_btn_save,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../style/style";
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

.searcher {
  ::v-deep(
      input[type="search"]::-webkit-search-cancel-button,
      input[type="search"]::-webkit-search-decoration
    ) {
    -webkit-appearance: none;
    appearance: none;
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
    // position: absolute;
    // top: 50px;
    padding: 0.5rem 47px 1rem;
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
      // background-color: transparent;
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
    input[type="number"] {
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
    .perpager {
      margin-left: 15px;
      border-color: #bbb;
      padding: 0.3rem 1rem;
      @include md {
        padding: 0.15rem 0.3rem;
      }
    }
  }
  .group-item + .group-item {
    margin-left: 1rem;
  }
}
</style>
