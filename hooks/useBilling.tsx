import React, { useState } from 'react'
import billingOptions from '../_config/billingOptions'

type TchangePlan = (tier: string) => any

interface IFReturnUseBilling {
  fetching: boolean
  changePlan: TchangePlan
  mustRedirect: boolean
  data: any
  error: boolean
}


const useBilling = () => {

  // states
  const [fetching, setFetching] = useState(false)
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [mustRedirect, setMustRedirect] = useState(false)

  // changePlan
  const changePlan: TchangePlan = (tier) => console.log(tier)

  const returnObject: IFReturnUseBilling = {
    changePlan,
    data,
    error,
    fetching,
    mustRedirect,
  }

  return returnObject

}

export default useBilling