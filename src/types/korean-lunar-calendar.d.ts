declare module 'korean-lunar-calendar' {
  export default class KoreanLunarCalendar {
    setSolarDate(year: number, month: number, day: number): void;
    getLunarCalendar(): { year: number; month: number; day: number; intercalation: boolean };
  }
}
