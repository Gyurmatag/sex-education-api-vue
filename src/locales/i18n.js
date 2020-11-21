import { createI18n } from 'vue-i18n'

import { languages } from '@/locales/messages'

const messages = Object.assign(languages)

const i18n = createI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  silentTranslationWarn: true,
  objectNotation: true,
  messages
})

export default i18n
