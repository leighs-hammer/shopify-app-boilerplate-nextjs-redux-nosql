import { v4 as uuidv4 } from 'uuid'

const installInitialDataMongo = (shop, token) => ({
  _id: shop,
  shopifyApiToken: token,
  shopifyApiTokenError: false,
  callAuthenticityKey: uuidv4(),
  billing: {
    tier: 'free',
    active: true,
    trialStarted: Date.now(),
    history: []
  },
})

export default installInitialDataMongo