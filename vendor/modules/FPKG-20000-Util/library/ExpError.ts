/** 錯誤產生器 */
class ExpError extends Error {
  constructor(messaeg: string, code: number) {
    super();
    this.name = code.toString();
    this.message = messaeg;
  }

  public getMessage() {
    return this.message;
  }

  public getCode() {
    return Number(this.name);
  }
}
export default ExpError;
