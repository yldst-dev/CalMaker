import React, { useState } from 'react';
import { Toolbar } from '../components/Toolbar';
import type { CalendarMode } from '../components/Toolbar';
import { CalendarGrid } from '../components/CalendarGrid';
import { getCalendarDays } from '../utils/date';

export const ComponentsPage: React.FC = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [mode, setMode] = useState<CalendarMode>('portrait');
  const days = getCalendarDays(year, month);

  return (
    <div style={{ padding: '40px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '40px', fontSize: '24px', fontWeight: 'bold' }}>UI Components Showcase (Dev Only)</h1>
      
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>1. Toolbar Component</h2>
        <div style={{ border: '1px dashed #ccc', padding: '20px', backgroundColor: '#fff' }}>
          <Toolbar
            year={year}
            month={month}
            mode={mode}
            showLunar={true}
            onYearChange={setYear}
            onMonthChange={setMonth}
            onModeChange={setMode}
            onShowLunarChange={() => alert('Show Lunar toggled')}
            onPrint={() => alert('Print triggered')}
            onSaveImage={() => alert('Save Image triggered')}
          />
        </div>
      </section>

      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>2. CalendarGrid Component</h2>
        <p style={{ marginBottom: '16px', color: '#666' }}>Displays 42 days (6 weeks) for {year}-{String(month).padStart(2, '0')}</p>
        <div style={{ border: '1px dashed #ccc', padding: '20px', backgroundColor: '#fff', maxWidth: '800px' }}>
          <div className="calendar-content" style={{ height: 'auto', border: '1px solid #000' }}>
             <CalendarGrid days={days} events={{ [`${year}-02-16`]: { isHoliday: true, name: '설날' } }} />
          </div>
        </div>
      </section>
    </div>
  );
};
