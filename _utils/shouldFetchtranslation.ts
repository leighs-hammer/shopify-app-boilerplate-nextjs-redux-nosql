// change this to set the fallback translation
import en from '../public/locales/en.json'

// This is actually bundled with the app so no need to fetch
// failing to set this will cause errors and failing tests
export const preloadedLocale: string = 'en' 
export const fallbackLocale: any = en

// you can enable translations by adding their key and paths to this object. 
// fetched translations will be marginally slower 
// however at the benifit of a faster loading app
// Remember to update the interface and the translation list

export type TTranslationKeys =  string | 'cs'|'da'|'de'|'en'|'es'|'fi'|'fr'|'hi'|'it'|'ja'|'ko'|'ms'|'nb'|'nl'|'pl'|'pt-BR'|'pt-PT'|'sv'|'th'|'tr'|'zh-CN'|'zh-TW'
export interface IFfetchTranslationsOptions {
  'cs'?: string,
  'da'?: string,
  'de'?: string,
  'en'?: string,
  'es'?: string,
  'fi'?: string,
  'fr'?: string,
  'hi'?: string,
  'it'?: string,
  'ja'?: string,
  'ko'?: string,
  'ms'?: string,
  'nb'?: string,
  'nl'?: string,
  'pl'?: string,
  'pt-BR'?: string,
  'pt-PT'?: string,
  'sv'?: string,
  'th'?: string,
  'tr'?: string,
  'zh-CN'?: string,
  'zh-TW'?: string,
}

const fetchTranslations: IFfetchTranslationsOptions = {
  fr: '/locales/fr.json',
  es: '/locales/es.json',
  de: '/locales/de.json'
}

type TshouldFetchTrasnslation = (locale: string) => string | 'fallback'

const shouldFetchtranslation: TshouldFetchTrasnslation = (locale: string) => {

  if(locale.includes(preloadedLocale)) {
    return 'fallback'
  }

  // run against the active translations
  const keys = Object.keys(fetchTranslations)
  const found = keys.find(key => locale.includes(key))
  
  if(found) {
    return fetchTranslations[found]
  }

  return 'fallback'
}

export default shouldFetchtranslation