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
import axios from "axios";
import { useStore } from "vuex";
import http from "@/modules/FPKG-230000-BackendCore/prototypes/axios";
import form from "../form";
import token from "@/modules/FPKG-20000-Util/prototypes/TokenCode";
import store from "@/modules/FPKG-50000-Vuex";
import { useRoute, useRouter } from "vue-router";
import IconRoute from "../IconRoute.json";
import { ElMessageBox as Message } from "element-plus";
import getIP from "@/modules/FPKG-20000-Util/library/getIP";
/**
 * 登入功能
 */
export default () => {
  const { proxy }: any = getCurrentInstance();
  const vuexState = computed(() => useStore().state);
  const data = reactive({
    loginForm: {
      username: "",
      password: "",
    },
    loginMFAForm: {},
    form: form,
    passwordType: "password",
    touch_go_login: "",
    VUE_APP_ACCOUNT_TYPE_FOLDER: process.env.VUE_APP_ACCOUNT_TYPE_FOLDER,
    VUE_APP_LOGONAME: process.env.VUE_APP_LOGONAME,
    LOGO: '',
  });
  const refData = toRefs(data);

  const handleLogin = async () => {
    const CLIENT_IP = await getIP();
    const myForm = proxy.$refs.loginData;
    const isValid = await myForm.validate();
    if (isValid) {
      const login = await http.put("/account/auth/login", {
        p3_ant_account: data.loginForm.username,
        p3_ant_password: data.loginForm.password,
      },
        {
          headers: {
            'x-ryeeal-ip': CLIENT_IP
          }
        }
      );
      if (login.data.response === true && login.data.code === 0) {
        await goLogin();
      }
    }
  };
  // 沒有IP的登入
  const handleLoginInit = async () => {
    const myForm = proxy.$refs.loginData;
    const isValid = await myForm.validate();
    if (isValid) {
      const login = await http.put("/account/auth/login", {
        p3_ant_account: data.loginForm.username,
        p3_ant_password: data.loginForm.password,
      });
      if (login.data.response === true && login.data.code === 0) {
        await goLogin();
      }
    }
  };

  const goLogin = async () => {
    const userInfo = await getUserInfo();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const node: any = userInfo.p5_role_node.sort(
      (a: any, b: any) => a.p4_node_sort - b.p4_node_sort
    );
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem(
      "idle_time",
      userInfo.site_config ? userInfo.site_config.p11_cig_auth_ttl : null
    );
    // 拿出本地ICON路由表 添加上去
    for (const route of node) {
      for (const icon of IconRoute) {
        if (route.p4_node_code === icon.p4_node_code) {
          route.icon = icon.icon;
        }
      }
    }
    const nodeList = JSON.stringify(node);
    // 尋找第一個節點
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const firstNode = node.filter((item: any) => item.p4_node_route);
    // 存進localStorage
    localStorage.setItem("Node", nodeList);
    if (nodeList === "[]") {
      // 進入節點為空
      Message.alert(`${proxy.$i18n.global.t("Account.noNode")}`);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nodeTree: any = start(node);
      // 整理成樹再存進localStorage
      localStorage.setItem("NodeTree", JSON.stringify(nodeTree));
      proxy.$router.push(`/${firstNode[0].p4_node_route}`);
    }
  };

  const getUserInfo = async () => {
    const user = await http.get("frontendAdapter/common/backstage");
    if (user.data.code === 0) {
      return user.data.response;
    }
    throw user.data.code;
  };

  // 開始將扁平化路由變成樹
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const start = (node: any) => {
    const tree = [];
    for (const item of node) {
      if (!item.p4_node_pid) {
        item.subs = action(node, item.p4_node_id);
        item.index = item.p4_node_route
          ? `/${item.p4_node_route}`
          : `${item.p4_node_id}`;

        item.layer = 0;
        tree.push(item);
      }
    }
    return tree;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const action = (node: any, parentId: number, layer = 1) => {
    const push = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const item of node) {
      if (item != null && item.p4_node_pid === parentId) {
        item.layer = layer;
        item.index = item.p4_node_route
          ? `/${item.p4_node_route}`
          : `${item.p4_node_id}`;
        item.subs = action(node, item.p4_node_id, layer + 1);
        push.push(item);
      }
    }
    return push;
  };

  onMounted(() => {
    if (process.env.VUE_APP_ACCOUNT_TYPE_FOLDER && process.env.VUE_APP_LOGONAME) {
      try {
        data.LOGO = require(`../../../${process.env.VUE_APP_ACCOUNT_TYPE_FOLDER}/assets/img/${process.env.VUE_APP_LOGONAME}`);
        // eslint-disable-next-line no-empty
      } catch (error) {
      }
    }


    const TokenCode = String(token);
    localStorage.setItem("x-authorisation", TokenCode);
  });

  return {
    ...refData,
    vuexState,
    handleLogin,
    handleLoginInit,
  };
};
