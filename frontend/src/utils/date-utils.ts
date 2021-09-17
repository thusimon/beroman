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
  const day = verbose ? ' Day ' : ' D ';
  const month = verbose ? ' Month ' : ' M ';
  const year = verbose ? ' Year ': ' Y ';
  if (isNaN(d)) {
    return 'N/A';
  } else if (d <= 0) {
    return '🎉 Current!'
  }
  else if (d < timeInMonth) {
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

export const getChartPointText = (data: ChartData, mypd: number) => {
  if (!data) {
    return ['N/A','N/A'];
  }
  const checkDate = getDateString(data.nt);
  let pd = ''
  if (data.note === 'C') {
    pd = 'Priority Date: Current';
  } else if (data.note === 'U') {
    pd = 'Priority Date: Unavailable';
  } else {
    pd = `Priority Date: ${getDateString(data.pd)}`;
  }
  return [checkDate, pd];
}

