import router from "@/modules/FPKG-230000-BackendCore/vueRouter";
import { ElMessageBox as $message } from "element-plus"; // 取得警告標籤

import $i18n from "@/modules/FPKG-230000-BackendCore/lang"; // 取得多國文本

const socket = (data: string) => {
  // let msg: any = $i18n.global.t(`Util.30002`);
  // $message.alert(msg);
  router.push("/login");
};
export default { socket };
