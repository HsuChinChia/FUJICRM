import { ComponentPublicInstance } from "vue";
import { ElMessageBox } from "element-plus";
import utilErrorCodes from "@/modules/FPKG-20000-Util/const/utilErrorCodes";
import RouterError from "../FPKG-20000-Util/const/error/routerError";
import VueError from "../FPKG-20000-Util/const/error/vueError";

const toLoginPageError: number[] = [];
// const toLoginPageError = [10015];
// const toLoginPageError = [10015, 10020, 50003, 50004];
// TODO: 500x: 帳號相關錯誤 實際未知

/** 前台的錯誤例外者 */
const frontExceptionErrorCodes = [20001];
// const frontExceptionErrorCodes = [20001, 170016, 280005];
// 170016: 不可用的地區
// 280005: 儲值用銀行列表通過錯誤的 response 傳送

/** 身分未通過驗證 */
// const idUnchecked = [300019, 300021];

/** 銀行未通過驗證 */
// const bankUnchecked = [300020, 300022];

const errorHandler = (
  err: unknown,
  instance: ComponentPublicInstance | null,
  info: string,
) => {
  const $i18n: any = instance?.$i18n;
  const $t = $i18n.global.t;

  if (err instanceof VueError) {
    vueErrorHandle(err);
  } else if (err instanceof RouterError) {
    routerErrorHandle(err);
  } else if (typeof err === "number") {
    errorCodeHandle(err);
  } else {
    throw err;
  }

  // 針對 VueError 處理
  function vueErrorHandle(err: VueError) {
    if (err.message.length) {
      setMSG(err.message);
    } else {
      errorCodeHandle(err.code);
    }
  }

  // 針對 RouterError 處理
  function routerErrorHandle(err: RouterError) {
    if (err.message.length) {
      setMSG(err.message);
    } else {
      errorCodeHandle(err.code);
    }
  }

  // 針對 ErrorCode 處理
  function errorCodeHandle(code: number) {
    if (toLoginPageError.includes(code) && instance !== null) {
      // instance.$store.dispatch("account/setLogin", false);
      instance.$router.push({ name: "login" });
    }
    if (code === 170016 && instance !== null) {
      // instance.$store.dispatch("account/setLogin", false);
      instance.$router.push("/regionError");
      return;
    }

    const account = localStorage.getItem("verification-acount");
    // if (code === 140039 && instance !== null) {
    //   /** 信箱驗證尚未通過，轉至驗證頁 */
    //   instance.$router.push(`/register/mail?account=${account}`);
    // }
    // if (code === 140038 && instance !== null) {
    //   /** 手機驗證尚未通過，轉至驗證頁 */
    //   instance.$router.push(`/register/sms?account=${account}`);
    // }
    // if (idUnchecked.includes(code) && instance !== null) {
    //   instance.$router.push("/personalInfo");
    // }
    // if (bankUnchecked.includes(code) && instance !== null) {
    //   instance.$router.push({
    //     path: "tradeAccount",
    //     query: { create: "true" },
    //   });
    // }
    if (utilErrorCodes.includes(code)) alerter(code);
    if (!utilErrorCodes.includes(code)) errorCode(code);
  }

  /** 進行各模組包的錯誤警告 */
  function errorCode(code: number) {
    /** 例外項目，有額外的控制或是不需要顯示錯誤訊息 */
    if (frontExceptionErrorCodes.includes(code)) return code;
    const msg = setErrorCodeMSG(code);
    setMSG(msg);
    return code;
  }
  /** 設定錯誤代碼訊息 */
  function setErrorCodeMSG(code: number) {
    if (instance === null) return;
    let msg: any = $t("Util.error", { code });
    /** 共用錯誤訊息 */
    const errorMsg: any = $t(`CasinoCore.${code}`);
    /** 遊戲錯誤訊息 */
    // const gameErrorMsg: any = $t(`EntertainmentGames.${code}`);
    /** 判斷沒有多語言對應時，回傳普通警示 */
    if (errorMsg !== `CasinoCore.${code}`) {
      msg = errorMsg;
    }
    // if (gameErrorMsg !== `EntertainmentGames.${code}`) {
    //   msg = gameErrorMsg;
    // }
    return msg;
  }
  function setMSG(msg: string) {
    ElMessageBox.alert(msg);
  }
  /** 警告器 */
  function alerter(code: number) {
    if (!utilErrorCodes.includes(code)) {
      return;
    }
    if (instance === null) return;

    let msg: any = $t("Util.error", { code });
    const errorMsg: any = $t(`Util.${code}`);
    /** 判斷沒有多語言對應時，回傳普通警示 */
    if (errorMsg !== `Util.${code}`) {
      msg = errorMsg;
    }
    setMSG(msg);
  }
};

export default errorHandler;
