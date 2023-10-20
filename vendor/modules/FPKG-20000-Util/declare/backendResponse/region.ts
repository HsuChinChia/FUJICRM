/* eslint-disable max-len, camelcase */

declare interface p12_region {
  // 地區ID
  p12_ron_id: number,
  /** 地區名稱 */
  p12_ron_name: string,
  /** 地區碼 */
  p12_ron_code: string,
  p12_ron_status: '3' | '-2',
  p12_ron_timezone: string,
  p12_ron_currency: string
}
