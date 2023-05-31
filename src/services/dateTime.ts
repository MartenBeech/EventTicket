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
  if (timeString) {
    const [hourString, minuteString] = timeString.split(":");
    date.setHours(parseInt(hourString));
    date.setMinutes(parseInt(minuteString));
  } else {
    date.setHours(0);
    date.setMinutes(0);
  }
  return date;
};
