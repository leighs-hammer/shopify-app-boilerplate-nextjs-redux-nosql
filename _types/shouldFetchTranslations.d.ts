
export type TshouldFetchTrasnslation = (locale: string) => string | 'fallback'
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