import { format, formatDistanceToNow, parseISO } from "date-fns";

export const useFormattedDates = (dateISOString) => {
  const date = parseISO(dateISOString);
  const publishedDateFormatted = format(date, "d LLLL 'at' HH:mm");
  const publishedDateRelativeToNow = formatDistanceToNow(date, {
    addSuffix: true,
  });

  return {
    formatted: publishedDateFormatted,
    relativeToNow: publishedDateRelativeToNow,
  };
};
