import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center mb-4 py-2">
      <h2>{t('nav.about')}</h2>
      <p>{t('about.desc')}</p>
      <p>{t('about.extraDesc')}</p>
    </div>
  );
};

export default About;
