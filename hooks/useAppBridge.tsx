import React, { useContext, useState, useEffect } from 'react'
import {Context} from '@shopify/app-bridge-react'
import { Redirect } from '@shopify/app-bridge/actions';

interface IFuseAppBridgeReturn {
  state?: any,
  appBridge: any, // type this looks to be missing
}
const useAppBridge = () => {

  const appBridge = useContext(Context)

  const [userLocale, setUserLocale] = useState('en')
  const [state, setState] = useState('en')

  const setStates = async () => {
    const state = await appBridge.getState()
    setState(state)
    setUserLocale(state.staffMember.locale)
  }

  const redirect = appBridge ? Redirect.create(appBridge) : {dispatch: () => {}}

  const redirectToRemote = (url) => {
    if(appBridge ) {
      redirect.dispatch(Redirect.Action.REMOTE, {
        url: url,
        newContext: true,
      })
    }
  }

  useEffect(() => {

    if(appBridge) {
      setStates()
    }

  }, [appBridge])

  return {
      appBridge,
      locale: userLocale,
      state,
      redirectToRemote,
    }
  }

export default useAppBridge