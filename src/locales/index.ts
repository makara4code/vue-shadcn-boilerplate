import { createI18n } from 'vue-i18n';
import { getBrowserLang } from '@/utils';

import en from "./modules/en";
import km from "./modules/km-KH";

const i18n = createI18n({
    allowComposition: true,
    legacy: false,
    locale: getBrowserLang(),
    messages: {
        en,
        km,
    }
})

export default i18n;