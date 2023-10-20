function formatNumber(num: any, precision?: number, separator?: any) {
  let parts;
  // 判斷是否為數字
  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(parseFloat(num)) && isFinite(num)) {
    // 把類似 .5, 5. 之類的數據轉化成0.5, 5, 為數據精度處理做準, 至於為什麼
    // 不在判斷中直接寫 if (!isNaN(num = parseFloat(num)) && isFinite(num))
    // 是因為parseFloat有一個奇怪的精度問題, 比如 parseFloat(12312312.1234567119)
    // 的值變成了 12312312.123456713
    // eslint-disable-next-line no-param-reassign
    num = Number(num);
    // 處理小數點位數
    // eslint-disable-next-line no-param-reassign
    num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
    // 分離數字的小數部分和整數部分
    parts = num.split('.');
    // 整數部分加[separator]分隔, 借用一個著名的正則表達式
    parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${separator || ','}`);

    return parts.join('.');
  }
  return 0;
}
export default formatNumber;
