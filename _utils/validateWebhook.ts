import { createRawBody, checkWebhookHmacValidity } from 'shopify-hmac-validation'
import { NextApiRequest } from 'next'

type TvalidateWebhook = (req: NextApiRequest, hmac: string | string[]) => boolean

const validateWebhook: TvalidateWebhook = (req, hmac) => {

  const rawBody = createRawBody(req.body)
  const isWebhookValid = checkWebhookHmacValidity(process.env.SHOPIFY_APP_SECRET, rawBody, hmac)
  
  return isWebhookValid

}

export default validateWebhook