import React from 'react';
import type { CalendarDay } from '../utils/date';

export type DayEvent = {
  isHoliday: boolean;
  name: string;
};

interface CalendarGridProps {
  days: CalendarDay[];
  events?: Record<string, DayEvent>;
  showLunar?: boolean;
  onDayClick?: (dateString: string) => void;
}

const WEEKS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const CalendarGrid: React.FC<CalendarGridProps> = ({ days, events = {}, showLunar = false, onDayClick }) => {
  const rowCount = days.length / 7;

  return (
    <div className="calendar-grid" style={{ gridTemplateRows: `auto repeat(${rowCount}, 1fr)` }}>
      {WEEKS.map((day, index) => (
        <div key={day} className={`calendar-cell header ${index === 0 ? 'sun' : ''}`}>
          {day}
        </div>
      ))}
      
      {days.map((day, i) => {
        const y = day.date.getFullYear();
        const m = String(day.date.getMonth() + 1).padStart(2, '0');
        const d = String(day.date.getDate()).padStart(2, '0');
        const dateString = `${y}-${m}-${d}`;
        const event = events[dateString];
        
        const isSun = day.date.getDay() === 0;
        const isRed = isSun || event?.isHoliday;
        
        let cellClass = 'calendar-cell';
        if (!day.isCurrentMonth) {
          cellClass += ' gray';
        } else if (isRed) {
          cellClass += ' sun';
        }
        
        return (
          <div 
            key={i} 
            className={cellClass} 
            onClick={() => onDayClick?.(dateString)}
          >
            <span className="date-num">
              {day.date.getDate()}
            </span>
            {showLunar && (
              <div style={{ fontSize: '10px', color: '#999', textAlign: 'right', fontWeight: '500', marginTop: '2px' }}>
                {day.lunarIntercalation ? '윤' : ''}{day.lunarMonth}.{day.lunarDay}
              </div>
            )}
            {event?.name && <span className="holiday-text">{event.name}</span>}
          </div>
        );
      })}
    </div>
  );
};
