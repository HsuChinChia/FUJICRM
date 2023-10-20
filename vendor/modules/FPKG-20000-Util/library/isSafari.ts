const checker = navigator.vendor && navigator.vendor.indexOf('Apple') > -1
  && navigator.userAgent
  && navigator.userAgent.indexOf('CriOS') === -1
  && navigator.userAgent.indexOf('FxiOS') === -1;

const isSafari = checker === true;
export default isSafari;
