import { v4 as uuidv4 } from 'uuid'

const installInitialDataMongo = (shop, token) => {

  const trialLength = 7 // days adjust as need be
  const installDate = new Date()
  const expiresDate = new Date(installDate.getTime() + (trialLength * 24 * 60 * 60 * 1000))

  return {
    _id: shop,
    shopifyApiToken: token,
    shopifyApiTokenError: false,
    callAuthenticityKey: uuidv4(),
    billing: {
      active: false,
      status: 'init'
    },
    billingHistory: []
  }
}

export default installInitialDataMongo