import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ar from '../locales/ar.json';
import tr from '../locales/tr.json';
import fa from '../locales/fa.json';
import ru from '../locales/ru.json';
import fr from '../locales/fr.json';

const resources = {
    ar: { translation: ar },
    tr: { translation: tr },
    fa: { translation: fa },
    ru: { translation: ru },
    fr: { translation: fr },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'ar',
        debug: false,

        interpolation: {
            escapeValue: false,
        },

        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
        },

        react: {
            useSuspense: false,
        },
    });

export default i18n;
