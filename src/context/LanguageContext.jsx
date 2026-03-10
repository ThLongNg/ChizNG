import React, { createContext, useContext, useState, useCallback } from 'react';
import { TRANSLATIONS } from '../hooks/useLanguage';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const getInitialLang = () => {
    try { return localStorage.getItem('preferredLanguage') || 'en'; } catch { return 'en'; }
  };

  const [lang, setLangState] = useState(getInitialLang);

  const setLang = useCallback((newLang) => {
    if (!TRANSLATIONS[newLang]) return;
    try { localStorage.setItem('preferredLanguage', newLang); } catch { /* ignore */ }
    setLangState(newLang);
  }, []);

  const t = useCallback(
    (key) => TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguageContext must be used inside LanguageProvider');
  return ctx;
};
