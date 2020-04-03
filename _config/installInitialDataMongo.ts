import { v4 as uuidv4 } from 'uuid'

const installInitialDataMongo = (shop, token) => {

  return {
    _id: shop,
    shopifyApiToken: token,
    shopifyApiTokenError: false,
    callAuthenticityKey: uuidv4(),
    plan: {
      displayName: null,
      shopifyPlus: null,
      partnerDevelopment: null
    },
    billing: {
      active: false,
      status: 'init'
    },
    billingUsage: [],
    usersActive: false,
    users: [],
  }
}

export default installInitialDataMongo