import {MongoClient} from 'mongodb'
import { listDatabases, createStoreDocument, findOneStoreDocumentById, getBilling, updateField } from '../../_utils/atlasMethods';
import { getCurrentAppBilling } from '../../_utils/shopifyMethods';
import dataShapeBillingVerify from '../../_utils/dataShapers/dataShapeBillingVerify';

export default async (req, res) => {



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

  const client = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING, { useUnifiedTopology: true })

  try {
    await client.connect()
    
    const dbDoc = await findOneStoreDocumentById(client, shop)
    
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
    const updateDb = await updateField(client, shop, 'billing', shapedBilling)

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