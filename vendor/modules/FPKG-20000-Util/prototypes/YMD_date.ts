function YMDDate(time: number) {
  if (time) {
    const date = new Date(time * 1000);
    const Y = `${date.getFullYear()}-`;
    const M = `${date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : date.getMonth() + 1}-`;
    const D = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} `;
    return Y + M + D;
  }
}
export {
  YMDDate,
};

export default YMDDate;
