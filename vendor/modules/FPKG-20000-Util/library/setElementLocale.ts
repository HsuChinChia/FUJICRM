import elementLang_en from "element-plus/lib/locale/lang/en";
import elementLang_zh_TW from "element-plus/lib/locale/lang/zh-tw";
import elementLang_zh_CN from "element-plus/lib/locale/lang/zh-cn";
import elementLang_vi from "element-plus/lib/locale/lang/vi";
import elementLang_th from "element-plus/lib/locale/lang/th";
import elementLang_id from "element-plus/lib/locale/lang/id";
import elementLang_JP from "element-plus/lib/locale/lang/ja";

/** 設定element的語言，若無該語言，就回退英文 */
export default (msg: Record<string, string | Record<string, string>>) => {
  const result = msg;
  /** 取出message成品的所有語言 */
  const allLocales = Object.keys(result);
  /** require需要的element語言檔案 */
  allLocales.forEach((locale: string) => {
    /** 成品有該語言就concat 沒有就放英文 */
    switch (locale) {
      case "zh_TW":
        Object.assign(result.zh_TW, elementLang_zh_TW);
        break;
      case "zh_CN":
        Object.assign(result.zh_CN, elementLang_zh_CN);
        break;
      case "VN":
        Object.assign(result.VN, elementLang_vi);
        break;
      case "TH":
        Object.assign(result.TH, elementLang_th);
        break;
      case "id":
        Object.assign(result.id, elementLang_id);
        break;
      case "JP":
        Object.assign(result.JP, elementLang_JP);
        break;
      default:
        Object.assign(result[locale], elementLang_en);
        break;
    }
  });
  return result;
};
