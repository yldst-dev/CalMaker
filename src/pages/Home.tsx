import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Toolbar } from '../components/Toolbar';
import type { CalendarMode } from '../components/Toolbar';
import { CalendarLayout } from '../components/CalendarLayout';
import type { DayEvent } from '../components/CalendarGrid';

export const Home: React.FC = () => {
  const horizontalPadding = 20;
  const bottomPadding = 20;
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [mode, setMode] = useState<CalendarMode>('portrait');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showLunar, setShowLunar] = useState(false);

  const [events, setEvents] = useState<Record<string, DayEvent>>({
    [`${new Date().getFullYear()}-01-01`]: { isHoliday: true, name: '신정' }
  });

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalEventName, setModalEventName] = useState('');
  const [modalIsHoliday, setModalIsHoliday] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (wrapperRef.current) {
        const { clientWidth, clientHeight } = wrapperRef.current;
        const isPortrait = mode.startsWith('portrait');
        const targetW = isPortrait ? 794 : 1123;
        const targetH = isPortrait ? 1123 : 794;

        const scaleX = (clientWidth - horizontalPadding * 2) / targetW;
        const scaleY = (clientHeight - bottomPadding) / targetH;
        setScale(Math.min(scaleX, scaleY, 1));
      }
    };
    window.addEventListener('resize', updateScale);
    updateScale();
    setTimeout(updateScale, 50);
    return () => window.removeEventListener('resize', updateScale);
  }, [bottomPadding, horizontalPadding, mode]);

  const handlePrint = () => {
    window.print();
  };

  const handleSaveImage = async () => {
    const wrapper = wrapperRef.current?.querySelector('.print-wrapper') as HTMLDivElement;
    const element = document.getElementById('calendar-container');
    if (!wrapper || !element) return;
    
    try {
      const origTransform = wrapper.style.transform;
      wrapper.style.transform = 'none';
      
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      
      wrapper.style.transform = origTransform;
      
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `calendar-${year}-${String(month).padStart(2, '0')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to save image', err);
    }
  };

  const openModal = (dateString: string) => {
    setSelectedDate(dateString);
    const existing = events[dateString];
    setModalEventName(existing?.name || '');
    setModalIsHoliday(existing?.isHoliday || false);
  };

  const saveEvent = () => {
    if (!selectedDate) return;
    setEvents(prev => {
      const next = { ...prev };
      if (!modalEventName.trim() && !modalIsHoliday) {
        delete next[selectedDate];
      } else {
        next[selectedDate] = {
          isHoliday: modalIsHoliday,
          name: modalEventName.trim()
        };
      }
      return next;
    });
    setSelectedDate(null);
  };

  const removeEvent = () => {
    if (!selectedDate) return;
    setEvents(prev => {
      const next = { ...prev };
      delete next[selectedDate];
      return next;
    });
    setSelectedDate(null);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="no-print">
        <Toolbar
          year={year}
          month={month}
          mode={mode}
          showLunar={showLunar}
          onYearChange={setYear}
          onMonthChange={setMonth}
          onModeChange={setMode}
          onShowLunarChange={setShowLunar}
          onPrint={handlePrint}
          onSaveImage={handleSaveImage}
        />
      </div>
      
      <div 
        ref={wrapperRef} 
        style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflow: 'hidden', padding: `0 ${horizontalPadding}px ${bottomPadding}px`, boxSizing: 'border-box' }}
      >
        <div 
          className="print-wrapper"
          style={{ 
            width: mode.startsWith('portrait') ? 794 : 1123, 
            height: mode.startsWith('portrait') ? 1123 : 794,
            transform: `scale(${scale})`,
            transformOrigin: 'top center'
          }}
        >
          <CalendarLayout
            year={year}
            month={month}
            mode={mode}
            imageUrl={imageUrl}
            onImageChange={setImageUrl}
            events={events}
            showLunar={showLunar}
            onDayClick={openModal}
          />
        </div>
      </div>

      {selectedDate && (
        <div className="modal-overlay no-print" onClick={() => setSelectedDate(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Edit Event: {selectedDate}</h3>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>이벤트 / 빨간날 이름</label>
              <input 
                type="text" 
                value={modalEventName}
                onChange={e => setModalEventName(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                placeholder="예: 대체휴일, 생일, 미팅..."
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={modalIsHoliday}
                  onChange={e => setModalIsHoliday(e.target.checked)}
                />
                빨간색 텍스트로 표시 (휴일/일요일 취급)
              </label>
            </div>
            <div className="modal-actions">
              <button 
                onClick={removeEvent}
                style={{ padding: '8px 16px', background: '#fee', color: '#c00', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: 'auto' }}
              >
                삭제
              </button>
              <button 
                onClick={() => setSelectedDate(null)}
                style={{ padding: '8px 16px', background: '#eee', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                취소
              </button>
              <button 
                onClick={saveEvent}
                style={{ padding: '8px 16px', background: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
