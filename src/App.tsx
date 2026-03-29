import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { ComponentsPage } from './pages/ComponentsPage';
import './styles/calendar.css';

const TITLE = 'CalMaker';

const TitleLock: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    document.title = TITLE;
  }, [location.pathname]);

  return null;
};

const App: React.FC = () => {
  const isDev = import.meta.env.DEV;

  return (
    <BrowserRouter>
      <TitleLock />
      <Routes>
        <Route path="/" element={<Home />} />
        {isDev && <Route path="/components" element={<ComponentsPage />} />}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
