import {MongoClient} from 'mongodb'
import { findOneStoreDocumentById, updateField, createDBClient } from '../../_utils/atlasMethods';
import { getCurrentAppBilling } from '../../_utils/shopifyMethods';
import dataShapeBillingVerify from '../../_utils/dataShapers/dataShapeBillingVerify';
import verifiedConnection from '../../_middleware/verifiedConnection';
import { NextApiRequest, NextApiResponse } from 'next';

const verifiyBillingHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  // lockdown when in prod
  // if(process.env.NODE_ENV === 'production') {
  //   // Add Token to all environments
    
  //   // const secFetchSite = req.headers['sec-fetch-site']
  //   const host = req.headers['x-forwarded-host']
  //   const cleanBaseOrigin = process.env.APP_URL.replace('https://', '')


  //   // early respond for malicious & wrong methods of requests
  //   if(req.method !== 'POST' || host !== cleanBaseOrigin) {
  //     return res.status(429).json({error: true, message: 'Method not allowed', secHeader: req.headers, validity: host === process.env.APP_URL })
  //   }
  // }

  // no body sent
  if(!req.query) {
    return res.status(400).json({error: true, message: 'No request submitted for handling.'})
  }

  // destructure request body
  const {shop, charge_id, cak} = req.query


  // // Validate Incoming
  if(!shop || !cak) {
    return res.status(400).json({error: true, message: 'Missing or incorrect parameters supplied'})
  }

  const client = createDBClient()

  try {
    await client.connect()
    
    const dbDoc = await findOneStoreDocumentById(client, `${shop}`)
    
    // checks for existence authenticity of pass through
    if(!dbDoc || dbDoc.callAuthenticityKey !== cak) {
      res.writeHead(302, {
        'Location': `https://${shop}/admin/apps/${process.env.SHOPIFY_API_KEY}/billing?errorVerifying=true`
      })
      return res.end()
    }

    const shopifyCurrentAppBilling = await getCurrentAppBilling(shop, dbDoc.shopifyApiToken)
    
    if(!shopifyCurrentAppBilling) {
      res.writeHead(302, {
        'Location': `https://${shop}/admin/apps/${process.env.SHOPIFY_API_KEY}/billing?errorVerifying=true`
      })
      return res.end()
    }
    


    const specificBillingObjectApproved = shopifyCurrentAppBilling[0]
    const shapedBilling = dataShapeBillingVerify(specificBillingObjectApproved)
    const updateDb = await updateField(client, `${shop}`, 'billing', shapedBilling)

    if(updateDb) {
      res.writeHead(302, {
        'Location': `https://${shop}/admin/apps/${process.env.SHOPIFY_API_KEY}/dashboard?billingApproved=true&plan=${shapedBilling.tier}`
      })

      return res.end()
    }

  } catch (error) {
    
    res.writeHead(300, {
      'Location': `https://${shop}/admin/apps/${process.env.SHOPIFY_API_KEY}/billing?errorVerifying=true`
    })
    return res.end()

  } finally {
    await client.close()
  }
  
  res.writeHead(302, {
    'Location': `https://${shop}/admin/apps/${process.env.SHOPIFY_API_KEY}/billing`
  })
  return res.end()
}

export default verifiedConnection(verifiyBillingHandler)