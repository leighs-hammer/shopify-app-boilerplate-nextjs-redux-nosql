import { deleteDocumentById, createDBClient } from '../../../../_utils/atlasMethods'
import { MongoClient } from 'mongodb'
import validateWebhook from '../../../../_utils/validateWebhook'

export default async (req, res) => {

  if(req.method !== 'POST'){
    return res.status(429).json({
      body: 'Unauthorized access'
    })
  }

  // headers
  const hmac = req.headers['x-shopify-hmac-sha256']
  const shop = req.headers['x-shopify-shop-domain']
  
  const {shop_domain} = req.body
  
  if(!shop || !hmac || shop_domain !== shop) {
    return res.status(429).json({
      body: 'Request could not be completed'
    })
  }


  if(!validateWebhook(req, hmac)) {
    console.error({error: true, req: {headers: req.headers, body: req.body,  shop }})
    // custom logging if you so choose
    return res.status(429).json({
      body: 'Request is not validated by HMAC'
    })
  }
  
  // All good continue and remove data
  const client = createDBClient()

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    // delete the doc

    //... DO STUFF

    const result = await deleteDocumentById(client, shop_domain)

    if(result) {
      return res.status(200).json({
        body: `Shop: ${shop_domain} deleted sucessfully`
      })
    }

    return res.status(500).json({
      body: `Shop: ${shop_domain} not deleted, or could not be found`
    })

  } catch (error) {

    return res.status(500).json({
      body: {
        message: `Shop: ${shop_domain} not deleted, or could not be found`,
        errorMessage: error.message
      }
    })
    
  } finally {
    await client.close()
  }

}