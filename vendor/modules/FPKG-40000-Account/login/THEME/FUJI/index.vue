<template>
  <div class="login-container" v-loading="vuexState.loading.isShow">
    <img class="login-IMG" src="./login-bg.svg" alt="" />
    <el-form
      ref="loginData"
      :model="loginForm"
      class="login-form"
      label-position="left"
      Key="loginForm"
    >
      <!-- <langChanger style="width: 100px" /> -->
      <div class="title-container">
        <h3 @click="inc" class="title">
          {{ $i18n.global.t("Account.system") }}
        </h3>
      </div>
      <el-form-item :prop="form.username.id" :rules="form.username.rule">
        <span class="svg-container">
          <icon icon="fas fa-user"></icon>
        </span>
        <el-input
          class="text-white"
          v-model="loginForm.username"
          placeholder="username"
        >
        </el-input>
      </el-form-item>
      <el-form-item :prop="form.password.id" :rules="form.password.rule">
        <span class="svg-container">
          <icon icon="fas fa-lock"></icon>
        </span>
        <el-input
          key="password"
          v-model="loginForm.password"
          type="password"
          placeholder="password"
          name="password"
          @keyup.enter="goLogin"
          show-password
        >
        </el-input>
      </el-form-item>
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="goLogin"
      >
        <icon icon="fas fa-sign-in-alt" class="mr-1"></icon>
        <span>{{ $i18n.global.t("Account.login") }}</span>
      </el-button>
    </el-form>
  </div>
</template>

<script  lang='ts'>
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
  computed,
  unref,
  getCurrentInstance,
} from "vue";

import loginAPI from "../../API/login";

const Theme = localStorage.getItem("Theme");

require(`../../../../FPKG-10000-Theme/layout/${
  Theme || "DEFAULT"
}/style/index.scss`);
export default defineComponent({
  name: "DEFAULT",
  components: {},

  setup() {
    const {
      loginForm,
      loginMFAForm,
      form,
      passwordType,
      touch_go_login,
      vuexState,
      handleLogin,
      handleLoginInit,
    } = loginAPI();

    const goLogin = () => {
      handleLoginInit();
      // 不使用IP API登入的專案
      // const APP_NAME_ARRAY = ["tradeunion"];
      // const VUE_APP_NAME = process.env.VUE_APP_NAME as string;
      // const includes = APP_NAME_ARRAY.includes(VUE_APP_NAME);
      // if (includes) {
      //   handleLoginInit();
      // } else {
      //   handleLogin();
      // }
    };

    return {
      loginForm,
      loginMFAForm,
      form,
      passwordType,
      touch_go_login,
      vuexState,
      handleLogin,
      goLogin,
    };
  },
});
</script>



<style lang="scss" scoped>
$lightGray: #eee;
$darkGray: #889aa4;
$loginBg: transparent;
$loginCursorColor: #fff;
$icon: #3d3d3d;
$gray: #5b5b5b;
$gold: #facf55;
</style>

<style lang="scss" scoped>
$--color-primary: #facf55;
$lightGray: #eee;
$darkGray: #889aa4;
$loginBg: #2d3a4b;
$loginCursorColor: #fff;
$icon: #3d3d3d;
$gray: #5b5b5b;
$gold: #facf55;

.login-container {
  .handleLogin {
    color: #fff;
    background: #009688;
    border-color: #009688;
    &:hover {
      background: #6cafa9;
      border-color: #6cafa9;
    }
    &:active {
      background: #6cafa9;
      border-color: #6cafa9;
    }
  }

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    ::v-deep(input) {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      // color: $lightGray;
      caret-color: $loginCursorColor;
      -webkit-appearance: none;

      // &:-webkit-autofill {
      //   box-shadow: 0 0 0px 1000px $loginBg inset !important;
      //   -webkit-text-fill-color: #fff !important;
      // }

      // &:-webkit-autofill,
      // &:-webkit-autofill:hover,
      // &:-webkit-autofill:focus,
      // &:-webkit-autofill:active {
      //   transition-delay: 99999s;
      //   transition: color 99999s ease-out, background-color 99999s ease-out;
      // }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .login-IMG {
    position: absolute;
    bottom: 0;
    width: 500px;
    @media all and (max-width: 767px) {
      display: none;
    }
  }
  @media all and (max-width: 767px) {
    // height: 100%;
  }
  height: 100vh;
  width: 100%;
  // overflow: hidden;
  // background-color: $loginBg;
  // background: url('./login-bg.jpg') center center no-repeat;
  // background-color: #2d3a4b;
  // background-size: cover;

  background-color: #2d3a4b;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0' gradientTransform='rotate(0,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%230FF'/%3E%3Cstop offset='1' stop-color='%23CF6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(0,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23F00'/%3E%3Cstop offset='1' stop-color='%23FC0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='3.3'%3E%3Cpath transform='translate(-50.4 2.000000000000001) rotate(-1.2999999999999998 1409 581) scale(0.969878)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='1.1' transform='translate(-64.5 39) rotate(3.1999999999999997 800 450) scale(1.0029119999999998)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(7.9 -40.5) rotate(23.5 401 736) scale(1.0029119999999998)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='1'%3E%3Cpath transform='translate(234 1.3999999999999986) rotate(-0.34999999999999964 150 345) scale(0.9946259999999999)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='2.2' transform='translate(-62.5 -106) rotate(18 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='translate(-138.8 37.2) rotate(3 1400 132) scale(0.915)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-size: cover;

  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: top left;
  min-height: 100%;
  width: 100%;

  .Login-captcha {
    display: flex;
    @media all and (max-width: 767px) {
      flex-wrap: wrap;
      .Login-captcha-img {
        margin-bottom: 10px;
        margin-left: 0px;
      }
    }
    .Login-captcha-img {
      cursor: pointer;
      margin-left: 10px;
      height: 52px;
    }
  }

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    ::v-deep(.el-input__inner) {
      color: #eee;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #fff;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

<style lang="scss" src="../../../../FPKG-10000-Theme/layout/FUJI/style/_article-detail.scss"></style>
<style lang="scss" src="../../../../FPKG-10000-Theme/layout/FUJI/style/element-variables.scss"></style>
