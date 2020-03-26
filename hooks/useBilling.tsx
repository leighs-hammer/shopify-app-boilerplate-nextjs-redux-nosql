import React, { useState, useEffect } from 'react'
import billingOptions from '../_config/billingOptions'
import Axios from 'axios'
import CREATE_APP_BILLIN_SUBSCRIPTION from '../_gql/createBillingSubscription';
import { useSelector, useDispatch } from 'react-redux';
import dataShapeBilling from '../_utils/dataShapers/dataShapeBilling';
import CONSTANTS from '../_constants';

type TchangePlan = (tier: string) => any

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
  // states
  const permanentDomain: string | false = useSelector(state => state.shop.domain)
  const key: string = useSelector(state => state.app.k)
  const billing: any = useSelector(state => state.app.billing)
  const environment: string = useSelector(state => state.app.environment)

  const [fetching, setFetching] = useState(false)
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [mustRedirect, setMustRedirect] = useState('init')

  // Change Plan
  const changePlan: TchangePlan = async (tier) => {
    
    if(!tier || !permanentDomain) { return false}
    
    const planDetails = billingOptions.find(item => item.tier === tier)
    console.log(planDetails)
    if(!planDetails) { return false }
    
    const variables = {
        "trialDays": planDetails.trialLength,
        "name": planDetails.label,
        "returnUrl": `https://${permanentDomain}.myshopify.com/admin/apps/${key}/billing`,
        "test": environment,
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
    if(data && (data.status !== billing.status || data.tier !== billing.tier)) { 
      dispatch({type: CONSTANTS.UPDATE_BILLING, payload: data})
    }
    if(mustRedirect !== 'init') {
      if(typeof window !== 'undefined' && window.location) { 
        window.location.href = mustRedirect
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