import React, {createContext, useContext, useState, useEffect} from 'react'
import fetch from 'isomorphic-unfetch'
import shouldFetchtranslation, {fallbackLocale, fallbackPreloadedLibrary} from '../_utils/shouldFetchtranslation'
import safelyGetNestedText from '../_utils/safelyGetNestedText'
import { IFTextContext, Tt, TtBlock } from '../_types/textProvider';


export const TextContext: React.Context<any> = createContext({})


export const TextProvider: React.FC<IFTextContext> = ({children, locale}) => {

  const [currentLocale, setCurrentLocale] = useState(fallbackLocale)
  const [activeTranslation, setActiveTranslation] = useState(fallbackPreloadedLibrary)

  const updateCurrentLocale = async (locale: string) => {

    if(locale === currentLocale || locale.includes(currentLocale)) {
      console.log(`Using translations for ${locale}`)
      return false
    }

    const localePath = shouldFetchtranslation(locale)

    if(localePath !== 'fallback') {
      try {      
        // reset
        setCurrentLocale(locale)
        const newTranslation = await fetch(localePath).then(r => r.json())
  
        if(newTranslation) { 
          console.log(`Swapping translation - ${locale}`)
          setActiveTranslation(newTranslation)
          return true
        }
      } catch (error) {
        console.error(error.message)
      }
    } 

    // reset
    console.log(`Active translation not found for ${locale}, falling back to ${fallbackPreloadedLibrary}`)
    setCurrentLocale(fallbackPreloadedLibrary)
    setActiveTranslation(fallbackLocale)
    return true
  }

  useEffect(() => {
    
    if (locale !== currentLocale) {
      console.log('Running Update')
      updateCurrentLocale(locale)
    }

  }, [locale])

  return (
    <TextContext.Provider value={{activeTranslation, currentLocale, fallbackLocale }}>
      {children}
    </TextContext.Provider>
  )
}


export const useTranslation = () => useContext(TextContext).activeTranslation

export const T: Tt = (textKey) => {
  
  const Context = useContext(TextContext)
  const dictionary = Context.activeTranslation
  const locale = Context.currentLocale
  const translatedValue = safelyGetNestedText(textKey, dictionary)

  if(translatedValue) {
    return translatedValue
  }

  console.log(`No translation found for ${locale} falling back to ${fallbackLocale}`)
  const fallbackTranslation = safelyGetNestedText(textKey, fallbackPreloadedLibrary)
  
  if(fallbackTranslation) {
    console.log(`Translation found in fallback dictionary ${fallbackLocale}`)
    return fallbackTranslation
  }

  // no TranslationFound
  return 'NO TRANSLATION FOUND'
}

export const TBlock: TtBlock = (textKey) => {

  const Context = useContext(TextContext)
  const dictionary = Context.activeTranslation
  const locale = Context.currentLocale
  const translatedValue: any = safelyGetNestedText(textKey, dictionary)

  if(translatedValue) {
    return translatedValue
  }

  console.log(`No translation found for ${locale} falling back to ${fallbackLocale}`)
  const fallbackTranslation: any = safelyGetNestedText(textKey, fallbackPreloadedLibrary)
  
  if(fallbackTranslation) {
    console.log(`Translation found in fallback dictionary ${fallbackLocale}`)
    return fallbackTranslation
  }

  // no TranslationFound
  return 'NO BLOCK FOUND CHECK YOU LOCALES'
}

// just for sanity sake

const TextProviderIndex = {
  TBlock,
  T,
  useTranslation,
  TextProvider,
  TextContext,
}


export default TextProviderIndex