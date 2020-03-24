import {MongoClient} from 'mongodb'
import shopifyMethods from '../../_utils/shopifyMethods'
import { listDatabases, createStoreDocument, findOneStoreDocumentById } from '../../_utils/atlasMethods';

import installInitialDataMongo from '../../_config/installInitialDataMongo';

// Installs or returns the core shop data
export default async (req, res) => {

  // lockdown when in prod
  if(process.env.NODE_ENV === 'production') {
    // same frontend only 
    const secFetchSite = req.headers['sec-fetch-site']

    // early respond for malicious & wrong methods of requests
    if(req.method !== 'POST' || secFetchSite !== 'same-origin') {
      return res.status(400).json({error: true, message: 'Method not allowed'})
    }
  }


  // required params
  const {shop, code} = req.body

  if(!req.body.shop ) {
    console.error('Missing query data', req.body);
    return res.status(429).json({message:'Unauthorized: Shop'})
  }



  const client = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING, { useUnifiedTopology: true })
  
  // Connect
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    
    // Get the doc or create
    const storeDocument = await findOneStoreDocumentById(client, shop)
      
    if(storeDocument) {
      // store exists return early
      return res.status(200).json({
        body: {callAuthenticityKey : storeDocument.callAuthenticityKey},
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
        body: {callAuthenticityKey: newStore.callAuthenticityKey},
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
