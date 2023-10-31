export const convertDateMonthYearToUTC = (dateString: string) => {
  const date = new Date();
  if (dateString) {
    const [dayString, monthString, yearString] = dateString.split("/");
    date.setDate(parseInt(dayString));
    date.setMonth(parseInt(monthString) - 1);
    date.setFullYear(parseInt(yearString));
  }
  return date;
};

export const convertHourMinuteToUTC = (timeString: string) => {
  const date = new Date();
  const timeZoneOffset = -date.getTimezoneOffset() / 60;
  if (timeString) {
    const [hourString, minuteString] = timeString.split(":");
    date.setHours(parseInt(hourString) + timeZoneOffset);
    date.setMinutes(parseInt(minuteString));
  } else {
    date.setHours(timeZoneOffset);
    date.setMinutes(0);
  }
  return date;
};

export const convertFullDateToUTC = (fullDate: string) => {
  const date = new Date();
  const [dateMonthYear, hourMinute] = fullDate.split(" ");
  const convertedDate = convertDateMonthYearToUTC(dateMonthYear);
  const convertedTime = convertHourMinuteToUTC(hourMinute);

  date.setDate(convertedDate.getDate());
  date.setMonth(convertedDate.getMonth());
  date.setFullYear(convertedDate.getFullYear());
  date.setHours(convertedTime.getHours());
  date.setMinutes(convertedTime.getMinutes());

  return date;
};

export const isDateAfterNow = (fullDate: string) => {
  const date = convertFullDateToUTC(fullDate);
  const now = new Date();
  return date > now;
};
