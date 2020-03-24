import React from 'react'

import enTranslations from '@shopify/polaris/locales/en.json'
import {AppProvider} from '@shopify/polaris'
import CustomLink from './CustomLink'

const PolarisProvider = ({children}) => {

  return (
    <AppProvider 
      i18n={enTranslations}
      linkComponent={CustomLink}
    >
      {children}
    </AppProvider>
  )
}

export default PolarisProvider