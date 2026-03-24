import { createContext, useContext, useState } from 'react';
import { t } from './i18n';

export const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState('vi');
  const toggleLang = () => setLang(l => l === 'vi' ? 'en' : 'vi');
  return (
    <LangContext.Provider value={{ lang, toggleLang, tx: t[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
