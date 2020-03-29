import React, {createContext, useContext, useState, useEffect} from 'react'
import fetch from 'isomorphic-unfetch'

// Set defaults in shouldFetchtranslation
import shouldFetchtranslation, {fallbackLocale, fallbackPreloadedLibrary} from '../_utils/shouldFetchtranslation'

import safelyGetNestedText from '../_utils/safelyGetNestedText'
import { IFTextContext, Tt, TtBlock } from '../_types/textProvider';

/**
 * Context
 */
export const TextContext: React.Context<any> = createContext({})

/**
 * TextProvider - wrap the app nested below app bridge Component
 */
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

/**
 * useTranslation - returns current translation dictionary
 */
export const useTranslation = () => useContext(TextContext).activeTranslation

/**
 * T our text helper function that returns text strings singular. 
 */
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
/**
 * TBlock - returns a block of text ina  single call for more performant text at a component level
 */
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

/**
 * The default index export of all methods and Components
 */
const TextProviderIndex = {
  TBlock,
  T,
  useTranslation,
  TextProvider,
  TextContext,
}


export default TextProviderIndex