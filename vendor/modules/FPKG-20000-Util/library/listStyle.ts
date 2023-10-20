/* eslint-disable camelcase */
/** 站台list風格 */
const list_style = ():string => {
  const style = localStorage.getItem('list_style') || '';
  return style;
};

const result = list_style();

export default result;
