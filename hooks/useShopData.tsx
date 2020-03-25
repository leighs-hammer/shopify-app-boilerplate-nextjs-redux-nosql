import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import qs from 'query-string'
import Axios from 'axios';
import CONSTANTS from '../_constants';


const useInstall = () => {

  const dispatch = useDispatch()
  const permanentDomain = useSelector(state => state.shop.domain)
  const callAuthenticityKey = useSelector(state => state.app.callAuthenticityKey)
  const [callKey, setCallKey] = useState('')
  const [first, setFirst] = useState(true)


  const installOrData = async (code) => {
    
    if(callAuthenticityKey) { return true }

    try {
      dispatch({type: CONSTANTS.LOADING, payload: true})
      const response = await Axios.post('api/install', {shop: permanentDomain, code})
      if(response.data.body.callAuthenticityKey){
        dispatch({type: CONSTANTS.INSTALL_SET_DATA, payload: {...response.data.body}})
        dispatch({type: CONSTANTS.LOADING, payload: false})
        setCallKey(response.data.body.callAuthenticityKey)
        return response.data.body.callAuthenticityKey
      }
      // no return 
    } catch (error) {
      dispatch({type: CONSTANTS.LOADING, payload: false})
      return false
    }
  }

  useEffect(() => {
    
    if(typeof window !== 'undefined' && window.location) {
      const query = qs.parse(window.location.search)
      const {code} = query
      if(first && permanentDomain) {
        installOrData(code)
      }
    }

  }, [first, permanentDomain, callKey])

  return callKey

}

export default useInstall