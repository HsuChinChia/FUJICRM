/* eslint-disable import/no-dynamic-require */
// 支援的語系
const support = ['zh_TW', 'zh_CN', 'VN', 'TH', 'JP'];
const code = localStorage.getItem('lang') || '';
const find = support.indexOf(code); // -1
// eslint-disable-next-line import/no-mutable-exports
let TinyMCElang: any;
if (find !== -1) {
  // eslint-disable-next-line global-require
  TinyMCElang = require(`./${code}.js`);
} else {
  TinyMCElang = '';
}
export default TinyMCElang;
