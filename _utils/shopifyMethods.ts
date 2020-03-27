import Axios from 'axios'
import buildAuthUrl from './buildAuthUrl'
import buildHeaders from './buildGqlHeaders'
import buildGqlEndpoint from './buildGqlEndpoint'
import GET_ACTIVE_SUBSCRIPTION from '../_gql/getActiveSubscription'

// getting a token
export const exchangeToken = async (shop, payload) => {
  try {
    const requestData = await Axios.post(buildAuthUrl(shop), payload)

    if(!requestData.data.access_token) {return false}
    
    return requestData.data.access_token
  } catch {
    return false
  }
}

// retrieving billing
export const getCurrentAppBilling = async (shop, token) => {
  const headers = buildHeaders(token)

  const requestData = await Axios({
    url: buildGqlEndpoint(shop),
    method: 'post',
    data: {
      query: GET_ACTIVE_SUBSCRIPTION,
    },
    headers: headers
  })

  // return stuff
  if(requestData.data) {
    return {...requestData.data.data.currentAppInstallation.activeSubscriptions}
  }

  return false

}


const shopifyMethods = {
  exchangeToken,
  getCurrentAppBilling
}

export default shopifyMethods