import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Axios from 'axios'
import CONSTANTS from '../_constants'
import { IFPageOptions } from './useQuery';

interface IFUseMutationReturn {
  data?: any,
  error: boolean,
  fetching: boolean,
  runBulkMutation: (type: string, array: any[]) => any,
  runMutation: (mutation?: string, variables?: any) => any,
}


const useMutation = (query: string, variables: any, {shaper, pageOptions}: IFPageOptions) => {

  const dispatch = useDispatch()

  const permanentDomain = useSelector(state => state.shop.domain)
  
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState()


  /**
   * runMutation
   * - Will run the mutation to be triggered on apply mostly used for single queries
   * - bulk will be run server side. 
   * 
   * @param {GQLquery} mutation - mutation string query defaults to the instantiated query
   * @param {object} variables - this is a set of specific variables 
   */
  const runMutation = async (mutation = query, vars = variables) => {
    
    if(fetching || !permanentDomain) { return false}

    try {
      setFetching(true)
      setError(false)
      
      // query
      const response = await Axios.post('/api/query', {
        gql: mutation,
        shop: permanentDomain,
        variables: vars
      })
      
      if(response.data) { setData(shaper ? shaper(response) : response) }
      setFetching(false)
      return true

    } catch (error) {
      // when the $417 hits the ban
      setFetching(false)
      setError(true)
      return false
    }

  }

  // Placeholder for queued mutations
  const runBulkMutation = (type, array) => {}

  useEffect(() => {
    dispatch({type: CONSTANTS.LOADING, payload: fetching})
  }, [fetching])


  // Return 
  const hookReturn: IFUseMutationReturn = {
    data, 
    error, 
    fetching, 
    runBulkMutation,
    runMutation 
  }

  return hookReturn
}

export default useMutation