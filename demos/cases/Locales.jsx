import { useState } from 'react';
import { Button, Locale } from '@svar-ui/react-core';
import { ExcelImport } from '../../src/index.js';
import { en, de, es, fr, it, jp, pt, ru, zh } from '@svar-ui/excel-import-locales';

export default function Locales() {
  const [isVisible, setIsVisible] = useState(false);
  const [lang, setLang] = useState('en');

  const locales = { en, de, es, fr, it, jp, pt, ru, zh };
  const localeOptions = [
    { id: 'en', label: 'EN' },
    { id: 'de', label: 'DE' },
    { id: 'es', label: 'ES' },
    { id: 'fr', label: 'FR' },
    { id: 'it', label: 'IT' },
    { id: 'jp', label: 'JP' },
    { id: 'pt', label: 'PT' },
    { id: 'ru', label: 'RU' },
    { id: 'zh', label: 'ZH' },
  ];

  const getWords = (lang) => locales[lang] || en;

  const config = {
    fields: [
      { id: 'name', label: 'Name' },
      { id: 'email', label: 'Email' },
    ],
    onImport: (data, result) => console.log('Imported:', data, result),
    onClose: () => setIsVisible(false),
  };

  function openLang(value) {
    setLang(value);
    setIsVisible(true);
  }

  return (
    <div className="demo-box">
      <div className="toolbar" style={{ display: 'flex', gap: '10px' }}>
        {localeOptions.map((locale) => (
          <Button
            key={locale.id}
            type={lang === locale.id ? 'primary' : 'secondary'}
            onClick={() => openLang(locale.id)}
          >
            Open {locale.label}
          </Button>
        ))}
      </div>

      {isVisible && (
        <Locale words={getWords(lang)} key={lang}>
          <ExcelImport {...config} />
        </Locale>
      )}
    </div>
  );
}
