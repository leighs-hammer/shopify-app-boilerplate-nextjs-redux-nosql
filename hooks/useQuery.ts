import React, { useState, useEffect, FunctionComponent } from 'react'
import {useSelector} from 'react-redux'
import Axios from 'axios'
import merge from 'deepmerge'

interface IFPageOptions {
  shaper?: (resonse: any) => any,
  pageOptions?: {
    key?: string,
  }
}

interface IFUseQuery {
  query: string
  variables: any
  options: IFPageOptions
}

interface IFUseQueryReturn {
  fetching: boolean, 
  error: boolean, 
  data: any, 
  runQuery: (variables?: any) => any, 
  fetchMore: (variables?: any) => any, 
  first: boolean, 
  cursors: {
    next: string,
    prev: string, 
  }, 
  pageInfo?: {
    hasNextPage?: boolean,
    hasPreviousPage?: boolean, 
  } 
}


const useQuery  = (query: string, variables: any, {shaper, pageOptions} : IFPageOptions) =>  {

  // used to check that all the stte is set
  const permanentDomain = useSelector(state => state.shop.domain)
  
  // states
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState()
  const [first, setFirst] = useState(true)
  const [cursors, setCursors] = useState({next: '', prev: ''})
  const [pageInfo, setPageInfo] = useState({hasNextPage: false, hasPreviousPage: false})
  
  /**
   * defines next & previous and sets the value
   * - Only triggered when a shaper is used
   * @param {array} shapedRespnse 
   */

  const defineAndSetCursors = (shapedRespnse) => {        
    if(shapedRespnse[0].cursor) {
      const indexOfLast = shapedRespnse.length -1
      const lastCursor = shapedRespnse[indexOfLast].cursor

      const indexOfPrevCursor = 0
      const prevCursor = shapedRespnse[indexOfPrevCursor].cursor
     
      setCursors({next: lastCursor, prev: prevCursor})
    }
  }


  /**
   * defineAndSetPageInfo
   * - defines and sets the page next and previos
   * @param {object} response - raw response to plug page info from
   */
  const defineAndSetPageInfo = (response) => {
    if(!pageOptions) { return false}

    const {key} = pageOptions
    if(response.data.data[key] && response.data.data[key].pageInfo) {
      const {hasNextPage, hasPreviousPage} = response.data.data[key].pageInfo
      setPageInfo({hasNextPage, hasPreviousPage})
    }
  }

  /**
   * Run Query
   * - Runs a graphql query through the middleware 
   * @param {Object} newVariables  - override variables
   */

  const runQuery = async (newVariables?: any) => {
    if(fetching || !permanentDomain) { return false}
    
    try {
      setFetching(true)
      setError(false)
      // request
      const queryVariables = newVariables ? newVariables : variables

      const response = await Axios.post('/api/query', {
        gql: query,
        shop: permanentDomain,
        variables: queryVariables ? queryVariables : {}
      })

      // Set Data
      if(response.data) { setData(shaper ? shaper(response) : response) }
      
      // Set cursors
      if(shaper){
        const cursorData = shaper(response)
        defineAndSetCursors(cursorData)
      }

      // set page information
      if(pageOptions) {
        defineAndSetPageInfo(response)
      }

      setFetching(false)
    } catch {
      // stuff when it fails.
      setFetching(false)
      setError(true)
    }
  }

  /**
   * fetchMore
   * Runs a graphql query through the middleware and aggregates the data into the 
   * @param {object} variables - object of variables to be passed to the query for fetching additional dat
   */

  const fetchMore = async (newVariables) => {
    
    if(fetching || !newVariables || !permanentDomain) { return false}

    try {
      setFetching(true)
      setError(false)
      
      const response = await Axios.post('/api/query', {
        gql: query,
        shop: permanentDomain,
        variables: newVariables
      })

      if(response.data) { 
        const mergedData: any = shaper ? merge(data, shaper(response)) : merge(data, response) 
        setData(mergedData)
      }
      
      // Set cursors
      if(shaper){
        const cursorData = shaper(response)
        defineAndSetCursors(cursorData)
      }

      // set page information
      if(pageOptions) {
        defineAndSetPageInfo(response)
      }

      setFetching(false)

    } catch  {
      setFetching(false)
      setError(true)
    }

  }

  // Run the query on first load. 
  useEffect(() => {
    
    if(first && permanentDomain) {
      runQuery()
      setFirst(false)
    } 
    
    return () => {}
  }, [permanentDomain])


  const hookReturns: IFUseQueryReturn = {fetching, error, data, runQuery, fetchMore, first, cursors, pageInfo}
  return hookReturns
}

export default useQuery