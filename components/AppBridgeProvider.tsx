import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import {Provider} from '@shopify/app-bridge-react'

const AppBridgeProvider = ({children}) => {

  const permanentDomain = useSelector(state => state.shop.domain)
  const key = useSelector(state => state.app.k)


  if(!permanentDomain || !key) {
      return (
        <React.Fragment>
          {children}
        </React.Fragment>
      )
  }

  const appBridgeConfig = {apiKey: key, shopOrigin: permanentDomain, forceRedirect: true}

  console.log(appBridgeConfig)
  return (
    <Provider config={appBridgeConfig}>
      {children}
    </Provider>
  )


}

export default AppBridgeProvider