import React from 'react';
import { Printer, ArrowLeft, ArrowRight, Download, ImageIcon, RectangleVertical, RectangleHorizontal } from 'lucide-react';

export type CalendarMode = 'portrait' | 'landscape' | 'portrait-no-image' | 'landscape-no-image';

export interface ToolbarProps {
  year: number;
  month: number;
  mode: CalendarMode;
  showLunar: boolean;
  onYearChange: (y: number) => void;
  onMonthChange: (m: number) => void;
  onModeChange: (m: CalendarMode) => void;
  onShowLunarChange: (show: boolean) => void;
  onPrint: () => void;
  onSaveImage: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  year,
  month,
  mode,
  showLunar,
  onYearChange,
  onMonthChange,
  onModeChange,
  onShowLunarChange,
  onPrint,
  onSaveImage,
}) => {
  const handlePrevMonth = () => {
    if (month === 1) {
      onMonthChange(12);
      onYearChange(year - 1);
    } else {
      onMonthChange(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      onMonthChange(1);
      onYearChange(year + 1);
    } else {
      onMonthChange(month + 1);
    }
  };

  const btnStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      gap: '12px', 
      padding: '12px', 
      backgroundColor: '#fff',
      borderBottom: '1px solid #eaeaea',
      flexWrap: 'wrap'
    }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button style={btnStyle} onClick={handlePrevMonth}>
          <ArrowLeft size={16} /> Prev
        </button>
        <div style={{ fontSize: '18px', fontWeight: 'bold', width: '100px', textAlign: 'center' }}>
          {year} . {String(month).padStart(2, '0')}
        </div>
        <button style={btnStyle} onClick={handleNextMonth}>
          Next <ArrowRight size={16} />
        </button>
      </div>

      <div style={{ width: '1px', height: '20px', backgroundColor: '#ddd', margin: '0 8px' }} />

      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer', padding: '6px 8px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff' }}>
        <input type="checkbox" checked={showLunar} onChange={e => onShowLunarChange(e.target.checked)} />
        음력
      </label>

      <div style={{ display: 'flex', gap: '4px', backgroundColor: '#f0f0f0', padding: '4px', borderRadius: '6px' }}>
        {[
          { id: 'portrait', label: '세로', icon: <ImageIcon size={14} />, ariaLabel: '세로 사진 템플릿' },
          { id: 'portrait-no-image', label: '세로', icon: <RectangleVertical size={14} />, ariaLabel: '세로 전체 템플릿' },
          { id: 'landscape', label: '가로', icon: <ImageIcon size={14} />, ariaLabel: '가로 사진 템플릿' },
          { id: 'landscape-no-image', label: '가로', icon: <RectangleHorizontal size={14} />, ariaLabel: '가로 전체 템플릿' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onModeChange(item.id as CalendarMode)}
            aria-label={item.ariaLabel}
            title={item.ariaLabel}
            style={{
              padding: '6px 12px',
              border: 'none',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: mode === item.id ? '600' : '400',
              backgroundColor: mode === item.id ? '#fff' : 'transparent',
              boxShadow: mode === item.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {item.label}
            {item.icon}
          </button>
        ))}
      </div>

      <button style={btnStyle} onClick={onSaveImage}>
        <Download size={16} />
        Save Image
      </button>

      <button style={{ ...btnStyle, backgroundColor: '#000', color: '#fff', borderColor: '#000' }} onClick={onPrint}>
        <Printer size={16} />
        Print A4
      </button>
    </div>
  );
};
