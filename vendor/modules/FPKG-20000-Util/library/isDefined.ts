/** 解除 typescript 認為 filter 無法排除 undefined 的窘境 */
export default function isDefined<T>(argument: T | undefined): argument is T {
  return argument !== undefined;
}
