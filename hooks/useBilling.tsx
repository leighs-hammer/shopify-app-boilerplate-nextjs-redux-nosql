import React, { useState, useEffect } from 'react'
import billingOptions from '../_config/billingOptions'
import Axios from 'axios'
import CREATE_APP_BILLIN_SUBSCRIPTION from '../_gql/createBillingSubscription';
import { useSelector, useDispatch } from 'react-redux';
import dataShapeBilling from '../_utils/dataShapers/dataShapeBilling';
import CONSTANTS from '../_constants';
import useAppBridge from './useAppBridge';
import { Redirect } from '@shopify/app-bridge/actions';

type TchangePlan = (tier: string, disableTrial: boolean | undefined) => any

interface IFReturnUseBilling {
  fetching: boolean
  changePlan: TchangePlan
  syncBillingInfo: () => any
  mustRedirect: string
  data: any
  error: boolean
}


const useBilling = () => {

  const dispatch = useDispatch()
  const {appBridge} = useAppBridge()
  
  // selectors
  const permanentDomain: string | false = useSelector(state => state.shop.domain)
  const appUrl: string = useSelector(state => state.app.appUrl)
  const key: string = useSelector(state => state.app.k)
  const billing: any = useSelector(state => state.app.billing)
  const cak: any = useSelector(state => state.app.callAuthenticityKey)

  // development test params will be used
  const isDev: string = useSelector(state => state.app.environment)

  // statesd
  const [fetching, setFetching] = useState(false)
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [mustRedirect, setMustRedirect] = useState('init')

  // Change Plan
  const changePlan: TchangePlan = async (tier, disableTrial) => {
    
    if(!tier || !permanentDomain) { return false}
    
    const planDetails = billingOptions.find(item => item.tier === tier)
    if(!planDetails) { return false }

    
    const variables = {
        "trialDays": disableTrial ? 0 : planDetails.trialLength,
        "name": planDetails.label,
        "returnUrl": `${appUrl}/api/verifybilling?shop=${permanentDomain}&cak=${cak}`,
        "test": isDev,
        "lineItems": [{
          "plan": {
            "appRecurringPricingDetails": {
                "price": { "amount": planDetails.cost, "currencyCode": "USD" }
            }
          }
        }]
    }    

    // Run it
    try {
      setFetching(true)
      const response = await Axios.post('/api/query', {
        gql: CREATE_APP_BILLIN_SUBSCRIPTION,
        shop: permanentDomain,
        variables: variables,
        updateDb: 'billing'
      })

      if(response && response.data) {
        const shapedData = dataShapeBilling(response)
        // @ts-ignore
        setData(shapedData)
        setFetching(false)
        if(shapedData.confirmationUrl) {
          setMustRedirect(shapedData.confirmationUrl)
        }
      }

    } catch (error) {
      console.error('could not create subscription', error.message)
    }
  }

  // syncBillingInfo
  const syncBillingInfo = async () => {}

  useEffect(() => {
    // @ts-ignore
    if(data && !data.active && mustRedirect) { 
      if(mustRedirect){
        if(!fetching && mustRedirect !== 'init') {
          if(typeof window !== 'undefined' && window.location) { 
            appBridge.dispatch(
              Redirect.toRemote({
                url: mustRedirect
              })
            )
          }
        }
      } else {
        dispatch({type: CONSTANTS.UPDATE_BILLING, payload: data})
      }
    }

  }, [data, mustRedirect])

  const returnObject: IFReturnUseBilling = {
    changePlan,
    data,
    error,
    fetching,
    mustRedirect,
    syncBillingInfo,
  }

  return returnObject

}

export default useBilling