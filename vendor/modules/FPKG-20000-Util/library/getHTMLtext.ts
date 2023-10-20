/** 將html碼格式化 只取得文字 */
const regex = /(<([^>]+)>)/ig;
const setHtml = (data: string) => data.replace(regex, ' ');

export default setHtml;
