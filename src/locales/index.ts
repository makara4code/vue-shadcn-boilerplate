import { createI18n } from 'vue-i18n';
import { getBrowserLang } from '@/utils';
import { LOCALE_KEYS, Locales } from '@/constants';

import en from './modules/en-US';
import km from './modules/km-KH';

// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = typeof en


const i18n = createI18n<[MessageSchema], 'en-US' | 'km-KH'>({
  allowComposition: true,
  availableLocales: LOCALE_KEYS,
  fallbackLocale: Locales.EN,
  globalInjection: true,
  legacy: false,
  locale: getBrowserLang(),
  messages: {
    'en-US': en,
    'km-KH': km,
  },
});

export default i18n;
