import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import moment from 'moment'

import common_en from './i18n/en-US.json'

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languagedetector
  .use(LanguageDetector)
  // pass the 18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options

  .init({
    fallbackLng: 'en',
    debug: false,

    react: {
      useSuspense: false
    },

    keySeparator: false,
    interpolation: {
      format: (value, format) => {
        if (value instanceof Date) {
          return moment(value).format(format)
        }
        return value
      },
      escapeValue: false
    },

    resources: {
      en: {
        translation: { ...common_en }
      }
    }
  })

i18n.on('languageChanged', (lng) => {
  moment.locale(lng)
})

export default i18n
