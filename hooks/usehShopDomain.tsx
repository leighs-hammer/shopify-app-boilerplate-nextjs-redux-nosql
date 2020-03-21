import React, {useEffect} from 'react'
import qs from 'query-string'
import {useDispatch, useSelector} from 'react-redux'
import CONSTANTS from '../_constants'
/**
 * IF the shop= query exists it will catch redux up automatically. 
 */
const useShopDomain = () => {

  const dispatch = useDispatch()
  const permanentDomain = useSelector(state => state.shop.domain)

  useEffect(() =>   {
    // Only run when non SSR
    if(typeof window !== 'undefined' && window.location) {
      const query = qs.parse(window.location.search)
      // Sets the shop on auth redirect.
      // does not set on index.
      if(query.shop && !permanentDomain && window.location.pathname !== '/') {
        dispatch({type: CONSTANTS.UPDATE_SHOP_DOMAIN, payload: query.shop})
      }
    }
  }, [permanentDomain])

  return [permanentDomain]
}

export default useShopDomain