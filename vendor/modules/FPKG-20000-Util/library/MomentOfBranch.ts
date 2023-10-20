/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import moment from 'moment';

// FUTURE: 導入TimeZone，開放輸出各地區格式

/**
  get testNumber() {
    const CB = new MomentOfBranch(100000, { code: 'Asia/Taipei' });
    return `input: ${CB.input}.format('YYYY/MM/DD/HH:mm') output: ${CB.output}.format('YYYY-MM-DD HH:mm')`;
  }
 */

type option = {
  /** 時區代碼 */
  code: 'Asia/Taipei' | string,
  /** 手寫的時差 */
  zoneTime?: number,
}

const SERVER_TIME_ZONE = 8;

/**
 * 站台時間的換算
 * @param n number 輸入的timeStamp
 * @param option 地區，以及手動設定的時區
 * @returns input moment格式 資料回傳後的格式化
 * @returns output moment格式 送出資料前，將資料轉回原數字
 */
class MomentOfBranch {
  /** timeStamp */
  n: number | null = null

  /** 手寫時差 */
  zoneTime: number = SERVER_TIME_ZONE

  constructor(n: number | string, option: option) {
    /** 只有確定是數字才填入，不然一律輸出錯誤 */
    if (typeof n === 'number') {
      this.n = n;
    }

    /** 將計算好的比例填入 */
    this.zoneTime = option.zoneTime || SERVER_TIME_ZONE;
  }

  /** 沒有值，不計算，並且報錯 */
  get isStopCalculation(): boolean {
    const notPass = typeof this.n !== 'number';
    if (notPass) {
      throw new Error('Undefined time value.');
    }
    return true;
  }

  /** 顯示給使用者 */
  get input(): moment.Moment | '----' {
    if (this.isStopCalculation || !this.n) { return '----'; }
    return moment.unix(this.n);
  }

  /** 資料送出前換算回原單位 */
  get output(): moment.Moment | '----' {
    if (this.isStopCalculation || !this.n) { return '----'; }
    return moment.unix(this.n);
  }
}
export default MomentOfBranch;
