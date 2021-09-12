import {ChartData} from '../types';

export const getDateString = (d: Date) => {
  return [
    d.getFullYear(),
    ('0' + (d.getMonth() + 1)).slice(-2),
    ('0' + d.getDate()).slice(-2)
  ].join('-');
}

export const timeInDay = 24 * 3600 * 1000;
export const timeInMonth = 30 * timeInDay;
export const timeInYear = 12 * timeInMonth;

export const timespanToString = (d: number, verbose: boolean): string => {
  const day = verbose ? ' Day ' : 'D';
  const month = verbose ? ' Month ' : 'M';
  const year = verbose ? ' Year ': 'Y';
  if (d < timeInMonth) {
    return `${Math.floor(d/timeInDay)}${day}`;
  } else if (d < timeInYear) {
    const monthsInTime = Math.floor(d/timeInMonth);
    const leftTime = d - monthsInTime * timeInMonth;
    return `${monthsInTime}${month}${timespanToString(leftTime, verbose)}`;
  } else {
    const yearsInTime = Math.floor(d/timeInYear);
    const leftTime = d - yearsInTime * timeInYear;
    return `${yearsInTime}${year}${timespanToString(leftTime, verbose)}`;
  }
}

export const getChartText = (data: ChartData) => {
  const checkDate = getDateString(data.nt);
  let pd = ''
  let message = '';
  if (data.note === 'C') {
    pd = 'Priority Date: Current';
    message = 'No need to wait';
  } else if (data.note === 'U') {
    pd = 'Priority Date: Unavailable';
    message = 'Please wait...'
  } else {
    pd = `Priority Date: ${getDateString(data.pd)}`;
    message = `You need to wait ${timespanToString(data.val, true)}`
  }
  return [checkDate, pd, message];
}

