import { v4 as uuidv4 } from 'uuid'

const installInitialDataMongo = (shop, token) => ({
  _id: shop,
  shopifyApiToken: token,
  shopifyApiTokenError: false,
  callAuthenticityKey: uuidv4(),
})

export default installInitialDataMongo