import React, { useEffect } from 'react'

import {AppProvider} from '@shopify/polaris'
import CustomLink from './CustomLink'
import { useTranslation } from './TextProvider';


const PolarisProvider = ({children}) => {

  const currentTranslation = useTranslation() // this will update according to the locale from the i8 provider

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