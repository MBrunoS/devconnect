import { format, formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const useFormattedDates = (dateISOString) => {
  const date = parseISO(dateISOString);
  const publishedDateFormatted = format(date, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });
  const publishedDateRelativeToNow = formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  });

  return {
    formatted: publishedDateFormatted,
    relativeToNow: publishedDateRelativeToNow,
  };
};
