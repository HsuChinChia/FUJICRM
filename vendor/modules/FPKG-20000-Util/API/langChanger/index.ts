import { ref } from "vue";
import { useI18n } from "vue-i18n";
import flags from "./flags";
import { changeHtmlLang } from "@/modules/FPKG-20000-Util/lang";
/** 語系與html lang的對照表 */
import langTable from "@/modules/FPKG-20000-Util/const/htmlLangs";

// TODO: can modify avaiable langs
/** i18n 語言切換與顯示 */
export default (opt: options) => {
  const i18n = useI18n();
  const langs = opt.avaiableLangs
    .map(L => flags.find(F => F.lang.toLocaleLowerCase() === L.toLocaleLowerCase()))
    .filter(d => d);

  /** 當前的語言 */
  const currentLang = ref();

  /** 語言切換 */
  const changeLang = (LANG: string) => {
    _checker(LANG);
    i18n.locale.value = LANG;
    currentLang.value = langs.find(L => L?.lang === LANG);
    localStorage.setItem("lang", LANG);
    changeHtmlLang(LANG);
  };

  /**
   * 初始化語言
   * 語言啟用順序: 1. 用戶端儲存的語言 2.站台初始化的語言 3.主題可用語言的第一個
   */
  const INIT_LANG = async (LANG?: string) => {
    const CILENT_LANG =
      localStorage.getItem("lang") ||
      LANG ||
      convertHtmlLangToSysLang() ||
      (langs[0]?.lang as string);
    changeLang(CILENT_LANG);
  };

  /** 格式檢查 */
  const _checker = (LANG: string) => {
    if (
      !LANG ||
      typeof LANG !== "string" ||
      !langs.find(L => L?.lang === LANG)
    ) {
      console.log(`Lang error: ${LANG} is not ready yet. from langChanger`);
    }
  };

  return {
    changeLang,
    langs,
    currentLang,
    INIT_LANG,
  };
};

/** 將public中 HTML lang設置的語系 轉為系統設定的語系 */
function convertHtmlLangToSysLang() {
  const lang = document.documentElement.lang;
  return getKeyByValue(langTable, lang) || lang;

  function getKeyByValue(obj: typeof langTable, value: string) {
    return Object.keys(obj).find(
      key => obj[key].toUpperCase() === value.toLocaleUpperCase(),
    );
  }
}
