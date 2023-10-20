<template>
  <div class="app-wrapper">
    <Header></Header>
    <Sidebar></Sidebar>

    <div
      ref="content"
      :style="'left:' + getSidebarWidth + 'px;'"
      class="content-box"
      id="content-box"
      :class="{ 'content-collapse': collapse }"
    >
      <div
        class="p-1 bg-white rounded"
        style="box-shadow: 0px 2px 4px rgba(95, 95, 95, 0.2)"
      >
        <div ref="elscrollbar" class="app-content" id="app-content">
          <Toolbar v-if="showToolbar" />
          <router-view v-slot="{ Component }">
            <transition name="move" mode="out-in">
              <component
                id="content-router"
                class="content"
                :contentSize="contentSize"
                :is="Component"
              />
            </transition>
          </router-view>
          <template>
            <el-backtop class="backtop" :bottom="100" target=".app-content">
            </el-backtop>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
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
  onBeforeUnmount,
  getCurrentInstance,
  computed,
  provide,
} from "vue";
import axios from "axios";
import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue";
import { useStore } from "vuex";
import Toolbar from "./components/toolbar/index.vue";

// import Toolbar from './Toolbar.vue';
import $router from "@/modules/FPKG-230000-BackendCore/vueRouter";
import { utilTools } from "@/modules/FPKG-20000-Util/prototypes/utilTools";

import { onBeforeRouteUpdate, onBeforeRouteLeave } from "vue-router";
import $http from "@/modules/FPKG-230000-BackendCore/prototypes/axios"; // 後端溝通
import serLocale from "./library/serLocale";
import router from "@/modules/FPKG-230000-BackendCore/vueRouter";

export default defineComponent({
  name: "App",
  setup() {
    const { screenWidth, store, proxy, CRUD } = utilTools();

    const internalInstance: any = getCurrentInstance();
    const vuexStore = useStore();
    const getSidebarWidth = computed(() => vuexStore.state.getSidebar.width);
    const data = reactive({
      globalProperties: internalInstance.appContext.config.globalProperties,
      contentSize: { height: 0, width: 0 },
      tagsList: [],
      collapse: false,
      Sidebarwidth: 230,
      idle_time: null || 0,
      init_sidebar_width: 230,
      Toolbar_height: 0,
      isShow_idle: true,
      lost_time: new Date().getTime(), // 最後一次點擊的時間
      current_time: new Date().getTime(), //當前時間
      tOut: 20 * 60 * 1000, //超時時間20min
    });
    provide("contentSize", data.contentSize);

    /** 每十分鐘送一次refresh */
    const refresh = () => {
      setTimeout(async () => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
          const res = await $http.get("account/auth/refresh");
        }
        refresh();
      }, 600000);
    };

    const onMounted_tTime = () => {
      const myVar = window.setInterval(function () {
        tTime();
      }, 1000);
      async function tTime() {
        data.current_time = new Date().getTime();
        if (data.current_time - data.lost_time > data.tOut) {
          // 登出;
          clearInterval(myVar);
          const res = await $http.put("account/auth/logout");
          localStorage.clear();
          router.push("/login");
          console.log("登出");
        }
      }
    };

    /** 同時使用 onBeforeRouteUpdate & onBeforeRouteLeave 監聽路由
     如果路徑不一樣才觸發 否則什麼都不會發生 */

    onBeforeRouteUpdate((to, from) => {
      const needStopBus = to.path !== from.path;
      if (needStopBus) {
        stopBus();
      }
    });
    onBeforeRouteLeave((to, from) => {
      const needStopBus = to.path !== from.path;
      if (needStopBus) {
        stopBus();
      }
    });

    onBeforeMount(() => {
      // console.log("2-组件挂载到页面之前执行-----onBeforeMount()");
    });

    onMounted(async () => {
      // 工會專用的倒數計時
      if (process.env.VUE_APP_NAME === "tradeunion") {
        window.addEventListener("click", function (event) {
          data.lost_time = new Date().getTime();
        });
        onMounted_tTime();
      }
      refresh();
      data.init_sidebar_width = vuexStore.state.getSidebar.width;
      proxy.$nextTick(() => {
        getScreen();
        window.addEventListener("resize", getScreen);
      });
      // 初始化送語系
      const defaultLocale = "zh_TW";
      const localLocale: string = localStorage.getItem("lang") || defaultLocale; // 取得local儲存的語言設定
      const getter = await serLocale({ locale: localLocale });
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", getScreen);
    });

    const getScreen = () => {
      const Toolbar: any = proxy.$refs.Toolbar;
      data.Toolbar_height = Toolbar ? Toolbar.$el.clientHeight : 0;
      const { content }: any = proxy.$refs;
      console.log("content", content.clientHeight);

      // 获取要计算距离的元素
      var element = document.getElementById(
        "content-router"
      ) as HTMLAnchorElement;

      // 获取元素的位置信息
      var elementRect = element.getBoundingClientRect();

      // 获取文档滚动的垂直偏移量
      var scrollY = window.scrollY || window.pageYOffset;

      // 计算元素到顶部的距离
      var distanceToTop = elementRect.top + scrollY;
      // 最後+32 不確定但應該是padding 16px 造成上下多這個數字
      data.contentSize.height = content.clientHeight - distanceToTop + 32;
      data.contentSize.width = content.clientWidth;
    };
    const handleScroll = () => {
      try {
        const scrollTop: any = proxy.$refs.elscrollbar;
        useStore().dispatch("scrollTop", scrollTop.wrap.scrollTop);
        // eslint-disable-next-line no-empty
      } catch (error) {}
    };

    const stopBus = () => {
      proxy.$bus.$emitter.all.clear();
    };
    const refData = toRefs(data);
    return {
      ...refData,
      getSidebarWidth,
      vuexStore,
      stopBus,
    };
  },

  // beforeRouteUpdate(to, from, next) {
  //   console.log('AAAAAA');
  //   const needStopBus = to.path !== from.path;
  //   if (needStopBus) {
  //     this.stopBus();
  //   }
  //   next();
  // },
  watch: {},
  components: {
    Sidebar,
    Header,
    Toolbar,
  },
  computed: {
    showToolbar() {
      const show =
        this.$route.meta.showToolbar === false
          ? this.$route.meta.showToolbar
          : true;
      return show;
    },
  },
});
</script>


<style lang="scss" src="./style/element-variables.scss"></style>


<style lang="scss">
// 滾到置頂的按鈕
.backtop {
  width: 42px !important;
  height: 42px !important;
  // border: #009688 2px solid;
  // color: #009688 !important;
  // background: #3d3d3d !important;
  right: 31px !important;
}
.style-border-left {
  @media screen and (min-width: 769px) {
    border-left: 1px solid #eee;
  }
}
// 手機板置頂按鈕 需要這css
.app-content {
  @media all and (max-width: 767px) {
    height: 100vh;
    overflow-x: hidden;
  }
}

.move-enter-active,
.move-leave-active {
  transition: opacity 0.3s;
}

.move-enter-from,
.move-leave-to {
  opacity: 0;
}
</style>


<style lang="scss" scoped>
@import "./style/style";

.content-box {
  padding: 16px;
  position: absolute;
  // 根據sidebar的寬度
  // left: $sidebar-width;
  right: 0;
  top: 52px;
  bottom: 0;
  // 把 overflow-y 隱藏
  overflow-y: auto;
  // -webkit-transition: left 0.3s ease-in-out;
  // transition: left 0.3s ease-in-out;
  background: #ebf0f4;

  @media all and (max-width: 767px) {
    top: 50px;
    left: 0px !important;
  }

  .content {
    // width: auto;
    // padding: 10px 20px;

    @media all and (max-width: 767px) {
      // left: 0px;
      // padding: 20px;
    }
  }
}

.content-collapse {
  left: $sidebar-collapsed-width;

  @media all and (max-width: 767px) {
    left: 0px;
  }
}
</style>

<style lang="scss" src="./style/_article-detail.scss"></style>

