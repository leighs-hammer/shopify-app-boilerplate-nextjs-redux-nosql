import React, { useEffect } from 'react'
import { useI18n, I18nContext } from '@shopify/react-i18n';

import {AppProvider} from '@shopify/polaris'
import useAppBridge from '../hooks/useAppBridge'
import CustomLink from './CustomLink'
import { useText } from './TextProvider';


const PolarisProvider = ({children}) => {

  const {locale} = useAppBridge()
  
  const {currentTranslation} = useText() // this will update according to the locale from the i8 provider

  return (
      <AppProvider 
        i18n={currentTranslation}
        linkComponent={CustomLink}
        >
        {children}
      </AppProvider>
  )
}

export default PolarisProvider