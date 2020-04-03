import {MongoClient} from 'mongodb'
import shopifyMethods from '../../_utils/shopifyMethods'
import { listDatabases, createStoreDocument, findOneStoreDocumentById, createDBClient } from '../../_utils/atlasMethods';

import installInitialDataMongo from '../../_config/installInitialDataMongo';
import { NextApiRequest, NextApiResponse } from 'next';
import verifiedConnection from '../../_middleware/verifiedConnection';

// Installs or returns the core shop data
const InstallHandler =  async (req: NextApiRequest, res: NextApiResponse) => {

  // required params
  const {shop, code} = req.body

  if(!req.body.shop ) {
    console.error('Missing query data', req.body);
    return res.status(429).json({message:'Unauthorized: Shop'})
  }



  const client = createDBClient()
  
  // Connect
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    
    // Get the doc or create
    const storeDocument = await findOneStoreDocumentById(client, shop)
      
    if(storeDocument) {
      // store exists return early
      return res.status(200).json({
        body: {
          callAuthenticityKey : storeDocument.callAuthenticityKey, 
          billing: storeDocument.billing,
          billingCheckRequired: true,
        },
      })

    } 

    // shopify token exchange
    if(!code) {
      return res.status(404).json({
        error: true,
        message: 'code is missing'
      })

    }

    // shopify token
    const token = await shopifyMethods.exchangeToken(shop,
      {
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_APP_SECRET,
        code
      })

    if(!token) {
      return res.status(429).json({
        error: true,
        message: 'Something has gone wrong exchanging shopify trroken'
      })
    }

    // create db listing
    await createStoreDocument(client,installInitialDataMongo(shop, token))
    // optionally create any other placeholders

    const newStore = await findOneStoreDocumentById(client, shop)

    if(newStore) {
      return res.status(200).json({
        body: {callAuthenticityKey: newStore.callAuthenticityKey, billing: storeDocument.billing},
      })
    }

    
  } catch (e) {
    
    console.error(e);
    return res.status(500).json({
      body: {error:true, message: e.message},
    })

  } finally {
    await client.close()
  }

}

export default verifiedConnection(InstallHandler)