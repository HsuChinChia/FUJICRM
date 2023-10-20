<template>
  <el-dropdown trigger="click">
    <div
      class="d-flex justify-content-center align-items-center"
      style="cursor: pointer"
    >
      <el-image
        style="width: 25px"
        class="mr-2"
        src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
      ></el-image>
      <div class="d-none d-md-block">
        登入者:
        <span class="">{{ userAccount() }}</span>
      </div>
      <!-- <div class="d-none d-md-block ml-2">
        角色:
        <span class="">{{ userAccount() }}</span>
      </div> -->
      <icon icon="fas fa-caret-down "></icon>
    </div>

    <!-- <button :title="t('Theme.function')" type="button" class="btn-header">
      <icon icon="fas fa-ellipsis-v" />
    </button> -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          ><icon icon="fas fa-user" class="mr-0" />
          {{ userAccount() }}
        </el-dropdown-item>

        <el-dropdown-item divided @click="changePass">
          <icon icon="fas fa-key" class="mr-0" />
          {{ $i18n.global.t("Theme.changePass") }}</el-dropdown-item
        >
        <el-dropdown-item @click="clearCache">
          <icon icon="fas fa-redo-alt" class="mr-0" />
          {{ $i18n.global.t("Theme.clearCache") }}</el-dropdown-item
        >
        <el-dropdown-item @click="logout()">
          <icon icon="fas fa-sign-out-alt" class="mr-0" />
          {{ $i18n.global.t("Account.logout") }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance } from "vue";
import token from "@/modules/FPKG-20000-Util/prototypes/TokenCode";
import axios from "axios";
import store from "@/modules/FPKG-50000-Vuex";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "HeaderFunction",
  components: {},
  setup(props, context) {
    const instance: any = getCurrentInstance();
    const route = useRoute();
    const router = useRouter();

    const clearCache = (): void => {
      window.location.reload(true);
    };

    const userAccount = () => {
      const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
      return user.p3_account.p3_ant_account;
    };

    const changePass = () => {
      router.push("/changePassword");
    };

    const logout = async () => {
      const res = await instance.appContext.config.globalProperties.$http.put(
        "account/auth/logout"
      );
      router.push("/login");
    };

    return { clearCache, userAccount, changePass, logout };
  },
});
</script>
<style lang="scss">
// .el-dropdown {
//   line-height: 1.5;
// }
</style>