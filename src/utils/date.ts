import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
} from 'date-fns';
import KoreanLunarCalendar from 'korean-lunar-calendar';

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  lunarMonth: number;
  lunarDay: number;
  lunarIntercalation: boolean;
}

/**
 * Returns an array of exactly the weeks that span the month.
 * @param year The year (e.g., 2026)
 * @param month 1-indexed month (1 for Jan, 2 for Feb)
 */
export function getCalendarDays(year: number, month: number): CalendarDay[] {
  const targetDate = new Date(year, month - 1, 1);
  const firstDayOfMonth = startOfMonth(targetDate);
  const lastDayOfMonth = endOfMonth(targetDate);

  const startDate = startOfWeek(firstDayOfMonth, { weekStartsOn: 0 }); // Sunday start
  const endDate = endOfWeek(lastDayOfMonth, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  return days.map((date) => {
    const lunar = new KoreanLunarCalendar();
    lunar.setSolarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const lunarResult = lunar.getLunarCalendar();

    return {
      date,
      isCurrentMonth: isSameMonth(date, targetDate),
      lunarMonth: lunarResult.month,
      lunarDay: lunarResult.day,
      lunarIntercalation: lunarResult.intercalation,
    };
  });
}
