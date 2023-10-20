<template>
  <el-drawer
    :model-value="toolbar"
    @closed="
      $bus.$emit('toolbar', false);
      $store.dispatch('settoolbar', false);
    "
    :with-header="false"
    :show-close="false"
    direction="btt"
    size="80%"
    custom-class="toolbar"
  >
    <div class="d-flex flex-column h-100">
      <div class="flex-fill">
        <div class="breadcrumbs py-2 px-2 mb-3">
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

        <div class="px-3">
          <form
            v-if="getCrud('search') || getCrud('advSearch')"
            @submit.prevent="search(keyword)"
            class="search-form mb-2"
          >
            <el-input
              v-if="getCrud('search')"
              v-model="keyword"
              @keyup.esc="search()"
              @keyup.enter="search(keyword)"
              @clear="search()"
              :clearable="true"
              prefix-icon="fas fa-search"
              placeholder="Search..."
              type="search"
              class="searcher"
            />
            <div class="d-flex py-2">
              <el-button
                v-if="getCrud('search')"
                :title="$i18n.global.t('Util.submit')"
                native-type="submit"
                class="w-50"
              >
                <icon icon="fas fa-search" />
                {{ $i18n.global.t("Util.submit") }}
              </el-button>
              <el-button
                v-if="getCrud('advSearch')"
                @click="
                  $bus.$emit('advSearch');
                  $store.dispatch('settoolbar', false);
                "
                :title="$i18n.global.t('Theme.AdvancedSearch')"
                class="w-50"
              >
                <icon icon="fas fa-search-plus" />
                {{ $i18n.global.t("Theme.AdvancedSearch") }}
              </el-button>
            </div>
          </form>

          <div
            class="tools d-flex flex-wrap justify-content-between"
            id="tools-mobile-target"
          >
            <button
              ref="tools-create"
              v-if="getCrud('create') && show_btn_create"
              @click="
                $bus.$emit('create');
                $store.dispatch('settoolbar', false);
              "
              :title="$i18n.global.t('Theme.create')"
              type="button"
              class="el-button el-button--primary el-button--small"
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
              class="el-button el-button--info el-button--small"
            >
              <icon icon="fas fa-eye" />
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
              class="el-button el-button--success el-button--small"
            >
              <icon icon="fas fa-edit" />
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
              class="el-button el-button--success el-button--small"
            >
              <icon icon="fas fa-save" />
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
              class="el-button el-button--success el-button--small"
            >
              <icon icon="fas fa-save" />
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
              class="el-button el-button--primary el-button--small"
            >
              <icon icon="fas fa-plus" />
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
              class="el-button el-button--danger el-button--small"
            >
              <i class="el-icon-delete" />
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
              class="el-button el-button--info el-button--small"
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
              class="el-button el-button--info el-button--small"
            >
              <icon icon="fas fa-user"></icon>
              <span>{{ $i18n.global.t("Theme.role") }}</span>
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
              <icon
                v-if="creatToolsBtn2.icon"
                :icon="creatToolsBtn2.icon"
              ></icon>
              <span>{{ creatToolsBtn2.title }}</span>
            </button>
          </div>
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
        <select
          v-model="perpage"
          @change="submitPerpage(perpage)"
          class="perpager rounded ms-md-2 mt-2 mt-md-0"
        >
          <option
            v-for="perpage in [10, 20, 30, 40, 50, 100]"
            :key="`perpage_${perpage}`"
            :value="perpage"
          >
            <span v-if="perpage">
              {{ $i18n.global.t("Theme.perpage", { n: perpage }) }}
            </span>
          </option>
        </select>
      </div>

      <div class="d-flex p-3">
        <el-button
          @click="
            $bus.$emit('toolbar', toolbar);
            $store.dispatch('settoolbar', false);
          "
          icon="fas fa-times fa-fw"
          style="flex: 1"
        >
          {{ $i18n.global.t("Theme.close") }}
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { computed, defineComponent } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";
import breadCrumb from "../../../../API/toolbar/breadCrumb";
import pager from "../../../../API/toolbar/pager";
import searcher from "../../../../API/toolbar/search";
import { libratCrud } from "../../library/Crud";

/** 手機版的 toolbar */
export default defineComponent({
  name: "toolbar-pc",
  setup() {
    const { breadSubstring, breadcrumb } = breadCrumb();
    const { paginator, perpage, page_num, submitPage, submitPerpage } = pager();
    const { search, keyword } = searcher();
    const { getCrud } = libratCrud();
    const $store = useStore();

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
    onBeforeRouteUpdate(() => {
      $store.dispatch("settoolbar", false);
    });

    return {
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

.toolbar {
  .breadcrumbs {
    background-color: hsl(0, 0%, 89%);
    width: 100%;
    a {
      color: $text;
      letter-spacing: 0.15rem;
      margin: 0 0.5rem;
      &.current {
        color: #377dff;
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
    text-align: center;
    vertical-align: middle;
    width: 100%;
    & > * {
      flex: 1 1 auto;
    }
  }

  .perpager {
    border-color: #bbb;
    padding: 0.3rem 1rem;
    @include md {
      padding: 0.15rem 0.3rem;
    }
  }
}
.tools {
  & > * {
    width: calc(50% - 5px);
    margin: 0 0 5px;
  }
}
</style>
