// change this to set the fallback translation
import en from '../public/locales/en.json'
import { IFfetchTranslationsOptions, TshouldFetchTrasnslation } from '../_types/shouldFetchTranslations';

// This is actually bundled with the app so no need to fetch
// failing to set this will cause errors and failing tests
export const fallbackLocale: string = 'en' 
export const fallbackPreloadedLibrary: any = en
fallbackPreloadedLibrary
// you can enable translations by adding their key and paths to this object. 
// fetched translations will be marginally slower 
// however at the benifit of a faster loading app
// Remember to update the interface and the translation list

const fetchTranslations: IFfetchTranslationsOptions = {
  fr: '/locales/fr.json',
  es: '/locales/es.json',
  de: '/locales/de.json'
}



const shouldFetchtranslation: TshouldFetchTrasnslation = (locale: string) => {

  if(locale.includes(fallbackLocale)) {
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