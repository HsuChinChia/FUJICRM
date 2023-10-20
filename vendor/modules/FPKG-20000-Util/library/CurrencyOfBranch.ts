/* eslint-disable no-use-before-define */

/**
  get testNumber() {
    const CB = new CurrencyOfBranch(100000, { code: 'VN' });
    return `input: ${CB.input} output: ${CB.output}`;
  }
 */

type option = {
  /** 地區代碼，會從比率總表取得預設的轉換比率 */
  code: 'VN' | string,
  /** 手動設置的轉換比率 1000 則輸出 1 */
  ratio?: number,
  /** 手動保留位數 */
  fix?: number
}

/** 轉換比率表 */
type regionSetting = { name: string, ratio: number, fix?: number };

const REGION_SETTING_LIST: regionSetting[] = [
  { name: 'VN', ratio: 1000, fix: 0 },
];

/** 全站預設的保留位數 */
const DEFAULT_FIX = 2;

/**
 * 站台比率的換算
 * @param n number 輸入的數字
 * @param option 地區，以及手動設定的轉換比率
 * @returns input 資料回傳後的格式化
 * @returns output 送出資料前，將資料轉回原數字
 */
class CurrencyOfBranch {
  /** 數字 */
  n: number = 0

  /** 比率 */
  ratio: number = 1

  /** 保留位數 */
  fix: number = DEFAULT_FIX;

  constructor(n: number | string, option: option) {
    /** 只有確定是數字才填入，不然一律用 0 */
    if (typeof n === 'number') {
      this.n = n;
    }
    const nIsNumber = !Number.isNaN(Number(n));

    if (nIsNumber) {
      this.n = Number(n);
    }

    /** 將計算好的比例填入 */
    this.ratio = setRatio(option);
    /** 填入保留位數 */
    this.fix = setFix(option);
  }

  /** 沒有值，或是比率為1，不計算 */
  get isStopCalculation(): boolean {
    return this.n === 0 || this.ratio === 1;
  }

  /** 調整保留位數 */
  get fixedNumber() {
    return setFloat(this.n, this.fix);
  }

  /** 顯示給使用者 */
  get input() {
    if (this.isStopCalculation) return this.fixedNumber;
    const result = this.n / this.ratio;
    return setFloat(result, this.fix);
  }

  /** 資料送出前換算回原單位 */
  get output() {
    if (this.isStopCalculation) return this.fixedNumber;
    return this.n * this.ratio;
  }
}
export default CurrencyOfBranch;

/**
 * 比例換算
 * @param option 比率的設定值
 * @returns 換算後的值
 */
const setRatio = (option: option): number => {
  /** 基本比例 1:1 */
  const ratio = 1;
  /** 手動比率轉換 */
  const fixedRatio = option.ratio;
  if (fixedRatio) {
    return fixedRatio;
  }

  /** 若有地區代碼，且找得到轉換比率，輸出 */
  const regionSetting = getRegionSetting(option.code);
  if (regionSetting) {
    return regionSetting.ratio;
  }

  return ratio;
};

/** 設定站台浮點數 */
function setFix(option: option) {
  /** 手動保留位數 */
  const fixedFix = option.fix;
  if (fixedFix) {
    return fixedFix;
  }

  /** 若有地區代碼，且找得到保留位數，輸出 */
  const regionSetting = getRegionSetting(option.code);
  if (regionSetting) {
    return regionSetting.fix || 0;
  }
  return DEFAULT_FIX;
}

/**
 * 保留位數，目前僅有無條件刪除
 * @param n 欲轉換的數字
 * @param fix 欲保留的位數
 */
function setFloat(n: number | string, fix: number = DEFAULT_FIX) {
  let myNum = n;
  if (typeof myNum === 'string') myNum = parseFloat(<string>n);
  return Number(myNum.toFixed(fix + 1).slice(0, -1));
}

/** 取得地區的設定 */
function getRegionSetting(code: string) {
  return REGION_SETTING_LIST.find(region => nameCompare(region.name, code));
  /** 名稱比對 */
  function nameCompare(a: string, b: string) {
    const [SA, SB] = [(a || ''), (b || '')];
    const [NA, NB] = [SA.toUpperCase(), SB.toUpperCase()];
    return NA === NB;
  }
}
