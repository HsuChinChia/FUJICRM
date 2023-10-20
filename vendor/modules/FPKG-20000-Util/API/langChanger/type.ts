declare type lang =
  | "zh_TW"
  | "zh_CN"
  | "en_US"
  | "JP"
  | "jp"
  | "VN"
  | "TH"
  | "KH"
  | "MY"
  | "AP"
  | "HK"
  | "ID"
  | "MM"
  | "SG"
  | "EN"
  | "PH"
  | "id";

declare type options = {
  /** 自訂可用語言 */
  avaiableLangs: lang[];
};

/** 旗子的宣告代碼 */
declare type typeLocale = {
  label: string;
  lang: lang;
  flag: string;
};
