import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguageContext } from '../context/LanguageContext';
import './Navigation.css';

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'vi', label: 'VI' },
  { code: 'ja', label: '日本語' },
];

const Navigation = () => {
  const location = useLocation();
  const { lang, setLang, t } = useLanguageContext();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="page-toggle" aria-label="Page switcher">
        <Link
          className={`toggle-btn ${isActive('/home') ? 'active' : ''}`}
          to="/home"
        >
          {t('nav.about')}
        </Link>
        <Link
          className={`toggle-btn ${isActive('/projects') ? 'active' : ''}`}
          to="/projects"
        >
          {t('nav.projects')}
        </Link>
        <Link
          className={`toggle-btn ${isActive('/gallery') ? 'active' : ''}`}
          to="/gallery"
        >
          Gallery
        </Link>
      </nav>

      <div className="language-switcher" role="group" aria-label="Language switcher">
        {LANGS.map(({ code, label }) => (
          <button
            key={code}
            className={`lang-btn ${lang === code ? 'active' : ''}`}
            type="button"
            onClick={() => setLang(code)}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
};

export default Navigation;
