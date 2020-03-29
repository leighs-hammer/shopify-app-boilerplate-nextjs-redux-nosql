import React, { useEffect } from 'react'
import {I18nContext, I18nManager} from '@shopify/react-i18n'
import useAppBridge from '../hooks/useAppBridge'
import { TextProvider } from './TextProvider'


const I81nProvider = ({children}) => {

  const {locale} = useAppBridge()
  const i18nManager = new I18nManager({locale, onError: (err) => console.error({err})})

  return (
    <I18nContext.Provider value={i18nManager}>
      <TextProvider locale={locale}>
        {children}
      </TextProvider>
    </I18nContext.Provider>
  )
}

export default I81nProvider