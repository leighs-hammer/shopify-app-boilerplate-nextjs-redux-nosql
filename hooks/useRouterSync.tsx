import React, {useEffect, useState} from 'react'
import { History } from '@shopify/app-bridge/actions'
import createApp from '@shopify/app-bridge'
import { HistoryAction } from '@shopify/app-bridge/actions/Navigation/History'
import {useDispatch, useSelector} from 'react-redux'
import CONSTANTS from '../_constants'

/**
 * Keeps shopify and the iframe in sync. 
 */


const useRouterSync = () => {

  const dispatch = useDispatch()
  const permanentDomain = useSelector(state => state.shop.domain)
  const shopifyKey = useSelector(state => state.app.k)

  useEffect(() => {
    if(window && permanentDomain) {
      const path = window.location.pathname
      const shopifyHistoryActions = app => History.create(app)
      const shopifyAppBridge = permanentDomain ? createApp({apiKey: shopifyKey, shopOrigin: permanentDomain}) : false
      const shopifyHistory =  shopifyAppBridge ? shopifyHistoryActions(shopifyAppBridge) : false

      if(shopifyHistory) {
        shopifyHistory.dispatch(History.Action.PUSH, path)
        dispatch({type: CONSTANTS.UPDATE_CURRENT_PATH, payload: {path: path, href: window.location.href}})
        console.log('SHOPIFY NAV UPDATED: ', path)
      }
    }
  }, [permanentDomain])

  return []
}

export default useRouterSync