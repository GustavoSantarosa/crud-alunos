/**
 * Parses a datetime (ex: 01/01/1990 17:40:30) given a format (ex: DD/MM/YYYY HH:mm:ss)
 * Nowadays, this parsers supports:
 * - MM   = 01..12	Month number
 * - DD   = 01..31	Day of month
 * - YYYY = 4 or 2 digit year (ex= 2018)
 * - YY   = 2 digit year (ex= 18)
 * - HH   = 0..23	Hours (24 hour time)
 * - hh   = 1..12	Hours (12 hour time used with a A.)
 * - kk   = 1..24	Hours (24 hour time from 1 to 24)
 * - aa   = m pm	Post or ante meridiem (Note the one character a p are also considered valid)
 * - mm   = 0..59	Minutes
 * - ss   = 0..59	Seconds
*/
exports.parseStringDate = (input, format) => {
  if (input.length !== format.length) {
    return null;
  }

  const componentsOfFormatFromInput = format.split('').reduce((acc, curr, index) => {
    acc[curr] = `${acc[curr] || ''}${input[index]}`;
    return acc;
  }, {});

  // parse each component of format to a dateComponent (year, monthIndex etc...)
  // in order to build a Date object
  const dateComponents = validChars.reduce((acc, curr) => {
    acc[curr] = strToDateComponent[curr](componentsOfFormatFromInput[curr])
    return acc;
  }, {})

  if (Object.values(dateComponents).some(component => component === null)) {
    return null;
  }

  const year = dateComponents['Y'];
  const monthIndex = dateComponents['M'];
  const day = dateComponents['D'];
  const hours = (dateComponents['h'] && dateComponents['a']) ?
    (dateComponents['h'] + (dateComponents['a'] === AMPM.PM ? 12 : 0)) :
    dateComponents['H'];
  const minutes = dateComponents['m'];
  const seconds = dateComponents['s']

  const date = new Date(year, monthIndex, day, hours, minutes, seconds);
  return date;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const validChars = ['Y', 'M', 'D', 'H', 'h', 'a', 'm', 's'];

const AMPM = {
  AM: 0,
  PM: 1,
}
const now = new Date();
const strToDateComponent = {
  Y: (str) => {
    return str ? Number(str) : now.getYear();
  },
  M: (str) => {
    const month = str ? Number(str) - 1 : now.getMonth();
    return month >= 0 && month <= 11 ? month : null;
  },
  D: (str) => {
    return str ? Number(str) : now.getDay();
  },
  H: (str) => {
    const hour = str ? Number(str) : now.getHours();
    return hour >= 0 && hour <= 23 ? hour : null;
  },
  h: (str) => {
    const hour = str ? Number(str) : (now.getHours() % 12);
    return hour >= 0 && hour <= 12 ? hour : null;
  },
  a: (str) => {
    if (!str) return undefined;
    if (str.toLowerCase() === 'am') {
      return AMPM.AM;
    } else if (str.toLowerCase() === 'pm') {
      return AMPM.PM;
    } else {
      return null;
    }
  },
  m: (str) => {
    const minute = str ? Number(str) : now.getMinutes();
    return minute >= 1 && minute <= 59 ? minute : null;
  },
  s: (str) => {
    const second = str ? Number(str) : now.getSeconds();
    return second >= 1 && second <= 59 ? second : null;
  },
}
