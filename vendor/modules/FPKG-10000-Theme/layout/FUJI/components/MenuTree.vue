<template>
  <div>
    <template v-for="value in this.menuData">
      <el-submenu
        :index="value.index"
        :key="value.p4_node_id"
        v-if="value.subs.length !== 0"
      >
        <template #title>
          <icon class="mr-1" :icon="value.icon"> </icon>
          <span>{{ $i18n.global.t(`Permission.${value.p4_node_code}`) }}</span>
        </template>
        <MenuTree :menuData="value.subs"></MenuTree>
      </el-submenu>
      <router-link
        v-else
        :key="value.p4_node_id"
        :to="{ path: `/${value.p4_node_route}` }"
        :class="{
          activeGO: $route.meta.url === value.p4_node_route,
        }"
      >
        <el-menu-item :index="value.index">
          <icon class="mr-1" :icon="value.icon"> </icon>
          <span>{{ $i18n.global.t(`Permission.${value.p4_node_code}`) }}</span>
        </el-menu-item>
      </router-link>
    </template>
  </div>
</template>

<script>
import MenuTree from "./MenuTree.vue";

export default {
  props: ["menuData"],
  name: "MenuTree",
};
</script>

<style lang="scss">
// .activeGO {
//   // background-color: #282828 !important;
//   li {
//     color: #ffd04b !important;
//     i {
//       color: #ffd04b !important;
//     }
//   }
// }
// 點開後的CSS
// .is-opened {
//   .el-submenu__title {
//     background-color: #1f4e6b !important;
//     box-shadow: inset 1px 0px 3px #dcd6d6;
//   }
//   // 下一層就不要有陰影
//   .el-menu--inline {
//     .el-submenu__title {
//       box-shadow: none;
//     }
//   }

//   .el-menu-item {
//     background-color: #1f4e6b !important;
//     // &::after {
//     //   border-left: 1px solid #d4d4d4;
//     //   bottom: 0;
//     //   content: '';
//     //   left: 27px;
//     //   position: absolute;
//     //   top: 0;
//     // }

//     // &::before {
//     //   background: #d4d4d4;
//     //   bottom: auto;
//     //   content: '';
//     //   height: 8px;
//     //   left: 23px;
//     //   margin-top: 21px;
//     //   position: absolute;
//     //   right: auto;
//     //   width: 8px;
//     //   z-index: 1;
//     //   border-radius: 50%;
//     // }
//   }
// }
</style>
