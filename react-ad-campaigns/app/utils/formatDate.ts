export const formatDate = (date: string): { date: string; time: string } => {
  const parsedDate = new Date(date);

  // Using Intl.DateTimeFormat for formatting
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "UTC",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
    parsedDate
  );

  const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
    parsedDate
  );

  return { date: formattedDate, time: formattedTime };
};
