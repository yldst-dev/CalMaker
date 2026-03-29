import { describe, it, expect } from 'vitest';
import { getCalendarDays } from './date';

describe('getCalendarDays', () => {
  it('should return exactly the weeks that span the month', () => {
    // Feb 2026 starts on Sunday and ends on Saturday, exactly 4 weeks (28 days).
    const febDays = getCalendarDays(2026, 2); 
    expect(febDays.length).toBe(28);
    expect(febDays[0].date.getDate()).toBe(1);
    expect(febDays[27].date.getDate()).toBe(28);
    expect(febDays[27].isCurrentMonth).toBe(true);
  });

  it('should correctly pad previous month when month starts on mid-week', () => {
    // April 2026 starts on Wednesday.
    const days = getCalendarDays(2026, 4);
    expect(days.length).toBe(35); // 5 weeks
    expect(days[0].date.getDate()).toBe(29); // March 29
    expect(days[0].date.getMonth()).toBe(2); // March
    expect(days[0].isCurrentMonth).toBe(false);

    // April 1 is index 3
    expect(days[3].date.getDate()).toBe(1);
    expect(days[3].date.getMonth()).toBe(3); // April
    expect(days[3].isCurrentMonth).toBe(true);
  });
});
