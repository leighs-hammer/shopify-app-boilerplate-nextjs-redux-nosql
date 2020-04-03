import { NextApiRequest, NextApiResponse } from 'next'
import { createRawBody, checkWebhookHmacValidity } from 'shopify-hmac-validation'
import { TverificationMiddleware, Thandler } from '../_types/verifiedConnections';

const verifiedWebhook: TverificationMiddleware = (handler: Thandler) => {

  return async (req: NextApiRequest, res: NextApiResponse) => {

    const hmac = req.headers['x-shopify-hmac-sha256']
    const shop = req.headers['x-shopify-shop-domain']
    const {shop_domain} = req.body

    if(!shop || !hmac || shop_domain !== shop) {
      return res.status(429).json({
        body: 'Request could not be completed'
      })
    }

    const rawBody = createRawBody(req.body)
    const isWebhookValid = checkWebhookHmacValidity(process.env.SHOPIFY_APP_SECRET, rawBody, hmac)

    if(!isWebhookValid) {
      console.error({error: true, req: {headers: req.headers, body: req.body,  shop }})
      // custom logging if you so choose
      return res.status(429).json({
        body: 'Request is not validated'
      })
    }

    return handler(req, res)
  }
}

export default verifiedWebhook