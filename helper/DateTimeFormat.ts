export const dateTimeFormat = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    weekday: "long", // long, short, narrow
    year: "numeric", // numeric, 2-digit
    month: "long", // numeric, 2-digit, long, short, narrow
    day: "numeric", // numeric, 2-digit
    hour: "2-digit", // numeric, 2-digit
    minute: "2-digit", // numeric, 2-digit
  });
};
