import {checkHmacValidity} from 'shopify-hmac-validation'

export default async (req, res) => {
 
  if(!req.body.query.shop || !req.body.state) {
    console.error('Missing query data', req.body);
    return res.status(429).json({message:'Unauthorized: Required Query or Shop missing.'})
  }
  
  const shopifyValidity = checkHmacValidity(process.env.SHOPIFY_APP_SECRET, req.body.query)

  if(!shopifyValidity) {
    console.error('Is HMAC is not valid', req.body.query.shop);
    return res.status(429).json({message:'Unauthorized: Invalid entrance detected'})
  }

  const buildInstallUrl = (shop, state) => (`https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${process.env.SHOPIFY_APP_SCOPES}&state=${state}&redirect_uri=${process.env.APP_URL}/dashboard`)

  const redirectTo = buildInstallUrl(req.body.query.shop, req.body.state)

  return res.status(200).json({
    body: req.body,
    hmacValid: shopifyValidity,
    redirectTo: redirectTo
  });
}