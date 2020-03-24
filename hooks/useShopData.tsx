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
      const response = await Axios.post('api/install', {shop: permanentDomain, code})
      if(response.data.body.callAuthenticityKey){
        dispatch({type: CONSTANTS.INSTALL_SET_DATA, payload: {callAuthenticityKey: response.data.body.callAuthenticityKey}})
        setCallKey(response.data.body.callAuthenticityKey)
        return response.data.body.callAuthenticityKey
      }
      // no return 
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    
    if(typeof window !== 'undefined' && window.location) {
      const query = qs.parse(window.location.search)
      if(first && permanentDomain && query.code) {
        installOrData(query.code)
      }
    }

  }, [first, permanentDomain, callKey])

  return callKey

}

export default useInstall