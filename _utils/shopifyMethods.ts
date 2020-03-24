import Axios from 'axios'
import buildAuthUrl from './buildAuthUrl'

export const exchangeToken = async (shop, payload) => {
  try {
    const requestData = await Axios.post(buildAuthUrl(shop), payload)

    if(!requestData.data.access_token) {return false}
    
    return requestData.data.access_token
  } catch {
    return false
  }
}



const shopifyMethods = {
  exchangeToken
}

export default shopifyMethods