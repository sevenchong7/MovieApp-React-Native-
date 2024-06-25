import * as enJson from './en.json';
import * as bmJson from './bm.json'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en:{
        common: enJson
    },
    bm:{
        common: bmJson
    }
};

i18n
.use(initReactI18next)
.init({
    resources,
    partialBundledLanguages: true,
    compatibilityJSON: 'v3',
    fallbackLng:'en',
    debug: false,
    defaultNS: "common",
    ns: ["translation", "common"],
    locales: ['en','bm'],
    interpolation:{
        escapeValue: false
    },
    react: {
        useSuspense: true,
    },
});

export default i18n;