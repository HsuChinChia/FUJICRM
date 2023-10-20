import moment from 'moment';

/** 後端時間預設為台北時間+8 */
const SERVER_ZONE_TIME = 8;

type option = {
  value: number, // timeStamp值
  zone?: number, // 目標時區
  format?: string, // 輸出的格式
}
/**
 * 時間轉換，將+8的伺服器時間重新轉換為當地時間
 * @param option
 * @param option.value timestamp
 * @param option.zone target timeZone
 * @param option.format target format
 */
class Formater {
  private value: number;

  private zone: number;

  private format: string;

  private serverZone: number = SERVER_ZONE_TIME;

  constructor(option: option) {
    this.value = option.value;
    this.zone = option.zone || SERVER_ZONE_TIME;
    this.format = option.format || 'YYYY-MM-DD HH:mm:ss';
  }

  /** 取得結果或列印空白 */
  public get result() {
    if (!this.value) { return ''; }
    return this.formater().format(this.format);
  }


  /** 將秒數調整為當地時間 即 -8 +n */
  private get realTimeStamp(): number {
    const Hour = 3600; // 宣告一小時的時間
    const ServerSecond = Hour * this.serverZone; // 伺服器位址造成的 utc+8
    const ZoneSecond = Hour * this.zone; // 真正時區所需的值
    return this.value - ServerSecond + ZoneSecond; // 先將server時間扣掉，再加回目標時區
  }

  /** 將當地時間進行utc轉換 */
  private formater() {
    const realTime = this.realTimeStamp;
    return moment.unix(realTime);
  }
}

export default Formater;
