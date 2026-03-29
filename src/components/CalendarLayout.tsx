import React, { useRef } from 'react';
import { CalendarGrid } from './CalendarGrid';
import type { DayEvent } from './CalendarGrid';
import type { CalendarMode } from './Toolbar';
import { getCalendarDays } from '../utils/date';
import '../styles/calendar.css';

interface CalendarLayoutProps {
  year: number;
  month: number;
  mode: CalendarMode;
  imageUrl: string | null;
  onImageChange: (url: string | null) => void;
  events?: Record<string, DayEvent>;
  showLunar?: boolean;
  onDayClick?: (dateString: string) => void;
}

export const CalendarLayout: React.FC<CalendarLayoutProps> = ({
  year,
  month,
  mode,
  imageUrl,
  onImageChange,
  events,
  showLunar = false,
  onDayClick,
}) => {
  const days = getCalendarDays(year, month);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onImageChange(url);
    }
  };

  const handleContainerClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`calendar-page ${mode}`} id="calendar-container">
      <div className="calendar-img-container" onClick={handleContainerClick}>
        <input
          type="file"
          accept="image/*"
          className="calendar-img-upload"
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
        {imageUrl ? (
          <img src={imageUrl} alt="Calendar Top" />
        ) : (
          <div className="no-print" style={{ color: '#888', textAlign: 'center', padding: '20px' }}>
            {mode === 'portrait' ? '가로 이미지 업로드 (클릭)' : '세로 이미지 업로드 (클릭)'}
          </div>
        )}
      </div>

      <div className="calendar-content">
        <div className="calendar-header">
          <span className="year">{year}</span>
          <span className="month">{String(month).padStart(2, '0')}</span>
        </div>
        <CalendarGrid days={days} events={events} showLunar={showLunar} onDayClick={onDayClick} />
      </div>
    </div>
  );
};
