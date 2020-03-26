import React, { useContext } from 'react'
import {Context} from '@shopify/app-bridge-react'

interface IFuseAppBridgeReturn {
  state?: any,
  appBridge: any, // type this looks to be missing
}
const useAppBridge = () => {

  const appBridge = useContext(Context)

  return {
      appBridge,
    }
  }

export default useAppBridge