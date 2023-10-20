/* eslint-disable camelcase */

export type region = {
  p12_ron_id: number,
  p12_ron_name: string,
  p12_ron_code: string,
  p12_ron_status: '3' | '-2',
  p12_ron_timezone: string,
  p12_ron_currency: string,
}

/** 所有的地區代碼與代號 */
const regions: region[] = [
  {
    p12_ron_id: 1,
    p12_ron_name: '台灣',
    p12_ron_code: 'zh_TW',
    p12_ron_status: '3',
    p12_ron_timezone: 'Asia/Taipei',
    p12_ron_currency: 'TWD',
  },
  {
    p12_ron_id: 2,
    p12_ron_name: '中國',
    p12_ron_code: 'zh_CN',
    p12_ron_status: '3',
    p12_ron_timezone: 'Asia/Shanghai',
    p12_ron_currency: 'CNY',
  },
  {
    p12_ron_id: 3,
    p12_ron_name: '美國',
    p12_ron_code: 'US',
    p12_ron_status: '3',
    p12_ron_timezone: 'US/Eastern',
    p12_ron_currency: 'USD',
  },
  {
    p12_ron_id: 4,
    p12_ron_name: '日本',
    p12_ron_code: 'JP',
    p12_ron_status: '3',
    p12_ron_timezone: 'Asia/Tokyo',
    p12_ron_currency: 'JPY',
  },
  {
    p12_ron_id: 5,
    p12_ron_name: '越南',
    p12_ron_code: 'VN',
    p12_ron_status: '3',
    p12_ron_timezone: 'Asia/Ho_Chi_Minh',
    p12_ron_currency: 'VND',
  },
  {
    p12_ron_id: 6,
    p12_ron_name: '泰國',
    p12_ron_code: 'TH',
    p12_ron_status: '3',
    p12_ron_timezone: 'Asia/Bangkok',
    p12_ron_currency: 'THB',
  },
  {
    p12_ron_id: 7,
    p12_ron_name: '柬埔寨',
    p12_ron_code: 'KH',
    p12_ron_status: '3',
    p12_ron_timezone: 'Asia/Phnom_Penh',
    p12_ron_currency: 'KHR',
  },
  {
    p12_ron_id: 8,
    p12_ron_name: '馬來西亞',
    p12_ron_code: 'MY',
    p12_ron_status: '3',
    p12_ron_timezone: 'Asia/Kuala_Lumpur',
    p12_ron_currency: 'MYR',
  },
  {
    p12_ron_id: 9,
    p12_ron_name: '菲律賓',
    p12_ron_code: 'PH',
    p12_ron_status: '3',
    p12_ron_timezone: 'Asia/Manila',
    p12_ron_currency: 'PHP',
  },
  {
    p12_ron_id: 13,
    p12_ron_name: '印尼',
    p12_ron_code: 'ID',
    p12_ron_status: '3',
    p12_ron_timezone: 'Asia/Pontianak',
    p12_ron_currency: 'IDR',
  },
  {
    p12_ron_id: 16,
    p12_ron_name: '西班牙',
    p12_ron_code: 'ES',
    p12_ron_status: '3',
    p12_ron_timezone: 'Europe/Madrid',
    p12_ron_currency: 'ESP',
  },
];

export default regions;
