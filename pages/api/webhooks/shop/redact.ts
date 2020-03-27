import { deleteDocumentById } from '../../../../_utils/atlasMethods';
import { MongoClient } from 'mongodb';

export default async (req, res) => {

  const {shop_domain} = req.body
  
  const client = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING, { useUnifiedTopology: true })
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    // delete the doc

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