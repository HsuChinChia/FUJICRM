import router from "@/modules/FPKG-230000-BackendCore/vueRouter";
import { ElMessageBox as $message } from "element-plus"; // 取得警告標籤
import $http from "@/modules/FPKG-230000-BackendCore/prototypes/axios"; // 後端溝通
import $i18n from "@/modules/FPKG-230000-BackendCore/lang"; // 取得多國文本

const socket = async (data: string) => {
  // let msg: any = $i18n.global.t(`Util.kick`);
  // $message.alert(msg);
  const res = await $http.put("account/auth/logout");
  localStorage.clear();
  router.push("/login");
};
export default { socket };
