
/**
獲取上週、本週、上月、本月、上季度、本季度的開始日期、結束日期 start
*/
const now: any = new Date(); // 当前日期
// const nowDayOfWeek = now.getDay() - 1; // 今天本周的第几天
const nowDayOfWeek = now.getDay() === 0 ? 7 : now.getDay(); // 今天本周的第几天
const nowDay = now.getDate(); // 当前日
const nowMonth = now.getMonth(); // 当前月
let nowYear = now.getYear(); // 当前年
nowYear += (nowYear < 2000) ? 1900 : 0; //
const lastMonthDate: any = new Date(); // 上月日期
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
const lastYear = lastMonthDate.getYear();
const lastMonth = lastMonthDate.getMonth();
// 格式化日期：yyyy-MM-dd
function formatDate(date: any) {
  const myyear = date.getFullYear();
  let mymonth = date.getMonth() + 1;
  let myweekday = date.getDate();
  if (mymonth < 10) {
    mymonth = `0${mymonth}`;
  }
  if (myweekday < 10) {
    myweekday = `0${myweekday}`;
  }
  return (`${myyear}-${mymonth}-${myweekday}`);
}
// 获得某月的天数
function getMonthDays(myMonth: any) {
  const monthStartDate: any = new Date(nowYear, myMonth, 1);
  const monthEndDate: any = new Date(nowYear, myMonth + 1, 1);
  const days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
  return days;
}
// 获得本周的开始日期
function getWeekStartDate() {
  const weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
  return formatDate(weekStartDate);
}
// 获得本周的结束日期
function getWeekEndDate() {
  const weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek + 1));
  return formatDate(weekEndDate);
}
// 获得上周的开始日期
function getLastWeekStartDate() {
  const weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7 + 1);
  return formatDate(weekStartDate);
}
// 获得上周的结束日期
function getLastWeekEndDate() {
  const weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1 + 1);
  return formatDate(weekEndDate);
}
// 获得本月的开始日期
function getMonthStartDate() {
  const monthStartDate = new Date(nowYear, nowMonth, 1);
  return formatDate(monthStartDate);
}
// 获得本月的结束日期
function getMonthEndDate() {
  const monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
  return formatDate(monthEndDate);
}
// 获得上月开始时间
function getLastMonthStartDate() {
  if (lastMonth === 11) {
    const lastMonthStartDate: any = new Date(nowYear - 1, lastMonth, 1);
    return formatDate(lastMonthStartDate);
  }
  const lastMonthStartDate: any = new Date(nowYear, lastMonth, 1);
  return formatDate(lastMonthStartDate);
}
// 获得上月结束时间
function getLastMonthEndDate() {
  if (lastMonth === 11) {
    const lastMonthEndDate = new Date(nowYear - 1, lastMonth, getMonthDays(lastMonth));
    return formatDate(lastMonthEndDate);
  }
  const lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
  return formatDate(lastMonthEndDate);
}

/** 昨日 */
function yesterday() {
  const day1 = new Date();
  day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
  const M = `${day1.getMonth() + 1 < 10
    ? `0${day1.getMonth() + 1}`
    : day1.getMonth() + 1}`;
  const day = day1.getDate() < 10 ? `0${day1.getDate()}` : day1.getDate();
  const s1 = `${day1.getFullYear()}-${M}-${day}`;
  return s1;
}

/** 今日 */
function today() {
  const day1 = new Date();
  day1.setTime(day1.getTime());
  const M = `${day1.getMonth() + 1 < 10
    ? `0${day1.getMonth() + 1}`
    : day1.getMonth() + 1}`;
  const day = day1.getDate() < 10 ? `0${day1.getDate()}` : day1.getDate();
  const s1 = `${day1.getFullYear()}-${M}-${day}`;
  return s1;
}

export {
  getLastMonthEndDate, getLastMonthStartDate, getMonthEndDate,
  getMonthStartDate, getLastWeekEndDate, getLastWeekStartDate,
  getWeekEndDate, getWeekStartDate, yesterday, today,
};
