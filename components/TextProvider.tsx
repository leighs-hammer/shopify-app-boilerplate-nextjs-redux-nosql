import React, {createContext, useContext, useState, useEffect} from 'react'
import fetch from 'isomorphic-unfetch'
import shouldFetchtranslation, {fallbackLocale, preloadedLocale} from '../_utils/shouldFetchtranslation'

export const TextContext: React.Context<any> = createContext({})

interface IFTextContext {
  children: any,
  locale?: string
}

export const TextProvider: React.FC<IFTextContext> = ({children, locale}) => {

  const [currentLocale, setCurrentLocale] = useState(preloadedLocale)
  const [activeTranslation, setActiveTranslation] = useState(fallbackLocale)

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
    console.log(`Active translation not found for ${locale}, falling back to ${preloadedLocale}`)
    setCurrentLocale(preloadedLocale)
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
    <TextContext.Provider value={{activeTranslation, currentLocale}}>
      {children}
    </TextContext.Provider>
  )
}

export const useText = () => useContext(TextContext).activeTranslation

