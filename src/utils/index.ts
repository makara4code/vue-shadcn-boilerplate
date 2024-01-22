/**
 * @description Get the default language of the browser
 * @returns {String}
 */
export function getBrowserLang() {
  let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
  let defaultBrowserLang = '';
  if (['km', 'km-KH'].includes(browserLang.toLowerCase())) {
    defaultBrowserLang = 'km';
  } else {
    defaultBrowserLang = 'en';
  }
  return defaultBrowserLang;
}
