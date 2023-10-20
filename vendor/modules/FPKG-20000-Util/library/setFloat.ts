/**
 * 簡易的浮點數格式化
 * @param formula 算式
 * @returns number 結果
 */
function setFloat(formula: any): number {
  return parseFloat((formula).toPrecision(12));
}

export default setFloat;
