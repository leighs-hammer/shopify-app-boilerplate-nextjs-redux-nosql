
import {checkWebhookHmacValidity, createRawBody} from 'shopify-hmac-validation'

export default async (req, res) => {

  if(req.method !== 'POST'){
    return res.status(429).json({
      body: 'Unauthorized access'
    })
  }

  const rawBody = createRawBody(req.body)

  const hmac = req.headers['x-shopify-hmac-sha256']
  const shop = req.headers['x-shopify-shop-domain']

  if(!shop || !hmac) {
    return res.status(429).json({
      body: 'Request could not be completed'
    })
  }

  const isWebhookValid = checkWebhookHmacValidity(process.env.SHOPIFY_APP_SECRET, rawBody, hmac)

  if(isWebhookValid) {
    console.log('webhook Valid')
    // If you handle customer data, remoember to handle its deletion here. 
    // the boilerplate does not so responding. 
    // ... Do stuff



    // ... Finish doing stuff
    return res.status(200).json({
      body: `This app does not store customer data on ${shop}`
    })


  } else {
    
    console.error({error: true, req: {headers: req.headers, body: req.body, rawBody, shop }})
    // custom logging if you so choose
    return res.status(429).json({
      body: 'Request is not validated by HMAC'
    })
  }
}