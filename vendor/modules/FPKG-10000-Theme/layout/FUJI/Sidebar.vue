<template>
  <div
    id="sidebar"
    ref="sidebar"
    :class="rwdMenu ? 'sidebar rwdSidevar' : 'sidebar'"
  >
    <!-- background-color="#32688c"
      text-color="#fff"
      active-text-color="#ffd04b" 
      之前的顏色
      -->

    <el-menu
      @select="handleSelect"
      class="sidebar-el-menu"
      unique-opened
      :default-active="onRoutes"
      :collapse="collapse"
      router
      text-color="#FFFFFF"
      background-color="#000f16"
    >
      <div class="menu-top">
        <div class="d-flex justify-content-start align-items-center p-2">
          <img
            class="mr-2"
            style="width: 30px"
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            alt=""
          />
          <h5 v-if="!collapse">富碁</h5>
        </div>
      </div>

      <MenuTree :menuData="routeList"></MenuTree>
    </el-menu>
  </div>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";
import MenuTree from "./components/MenuTree.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      routeList: [],
    };
  },
  components: {
    MenuTree,
  },
  watch: {
    userInfo: {
      handler: function (data) {
        // 判斷userInfo是否變化 有變化代表可能socket傳送新的節點
        this.routeList = JSON.parse(localStorage.getItem("NodeTree"));
      },
      deep: true,
    },
  },
  methods: {
    userAccount() {
      const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
      return user.p3_account.p3_ant_account;
    },
    handleSelect(key, keyPath) {
      setTimeout(() => {
        this.$store.dispatch("setsidebar", false);
      }, 100);
      // 移動路徑的就清空 session Storage
      sessionStorage.clear();
    },
  },
  computed: {
    collapse: function () {
      return this.$store.state.getSidebar.PCsidebar;
    },
    rwdMenu: function () {
      return this.$store.state.getSidebar.sidebar;
    },
    ...mapGetters(["userInfo"]),

    onRoutes() {
      return `/${this.$route.meta.url}`;
    },
  },
  created() {
    this.routeList = JSON.parse(localStorage.getItem("NodeTree"));
  },
  mounted() {
    const sidebar = document.getElementById("sidebar");
    // elementResizeDetectorMaker 監聽視窗套件
    if (sidebar) {
      const erd = elementResizeDetectorMaker();
      erd.listenTo(sidebar, (element) => {
        const width = element.offsetWidth;
        this.$nextTick(() => {
          this.$store.dispatch("setWidth", width);
        });
      });
    }

    // 接收bus 傳過來的值
    // this.$bus.$on("sidebar", (params) => {
    //   this.rwdMenu = params;
    // });
    // this.$bus.$on("PC_sidebar", (params) => {
    //   console.log("params", params);

    //   this.collapse = params;
    // });
  },
};
</script>


<style lang="scss">
$icon: #3d3d3d;
$gray: #5b5b5b;
$gold: #fff;

.menu-top {
  background-color: var(--top-color);
  & > div {
    background-color: #000f16;
  }
}
.el-menu.el-menu--inline {
  li {
    min-width: 178px;
  }
}

.sidebar {
  @media all and (max-width: 767px) {
    width: 100% !important;
  }
  // 這裡collapse為true時將 字跟 > 給隱藏起來
  .el-menu--collapse {
    span {
      font-size: 0px;
    }
    .el-submenu__icon-arrow {
      display: none;
    }
  }
}
.el-menu.sidebar-el-menu {
  border-right: 0px solid transparent;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  min-width: 230px;
  // width: $sidebar-width;
}
</style>


<style lang="scss" scoped>
$icon: #3d3d3d;
$gray: #5b5b5b;
$gold: #facf55;

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
.rwdSidevar {
  @media all and (max-width: 767px) {
    display: block !important;
    z-index: 99;
    ul {
      animation-name: sidebarMove;
      animation-duration: 0.3s;
      width: 100%;
    }
  }
}
@keyframes sidebarMove {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

.sidebar {
  // 點開的狀態

  .user {
    @media all and (max-width: 767px) {
      display: none;
    }
    span {
      font-size: 13px;
      line-height: 30px;
      color: #bab8b8;
    }
    h2 {
      font-size: 14px;
      color: #ecf0f1;
      font-weight: 300;
    }
  }
  color: #fff;
  // width: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */
  // 忘記什麼原因要 hidden
  // overflow: hidden;
  @media all and (max-width: 767px) {
    display: none;
  }
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar > ul {
  height: 100%;
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
    // background-color: $iconHover;
  }
  a {
    display: block;
    height: 100%;
  }

  /*主菜单样式*/
  .el-submenu__title {
  }
  /*主菜单悬浮样式*/
  .el-submenu__title:hover {
    color: white !important;
    background: #1890ff !important;
  }
  /*子菜单样式*/
  .el-menu-item {
    background: #283847 !important;
  }
  /*子菜单悬浮样式*/
  .el-menu-item:hover {
    color: white !important;
    background: #1890ff !important;
  }
}
</style>

<style lang="scss" src="./style/hamburgers/hamburgers.scss">
</style>

<style lang="scss" src="./style/_style.scss">
</style>


