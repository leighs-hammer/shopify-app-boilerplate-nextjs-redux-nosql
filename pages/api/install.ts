import envServiceProviderConfig from "./_utils/env_service_provider"
import * as admin from 'firebase-admin'
import installInitialDataFirebase from '../../_config/installInitialDataFirebase';

import {MongoClient} from 'mongodb'
import { listDatabases, createListing } from './_utils/atlasMethods';

// import serviceAccount from "./_utils/env_service_provider";
import installInitialDataMongo from '../../_config/installInitialDataMongo';
// Will try and spark a new admin
// try {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount()),
//     databaseURL: process.env.FIREBASE_DATABASE_URL
//   })

// } catch (error) {
//   // ignore duplicate catch
// }

// Installs or returns the core shop data
export default async (req, res) => {
  
  const client = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING, { useUnifiedTopology: true })
  
  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      // await  listDatabases(client);

      await createListing(client,installInitialDataMongo('something.myshopify.com'))

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
  // if(!req.body.query.shop) {
  //   console.error('Missing query data', req.body);
  //   return res.status(429).json({message:'Unauthorized: Shop'})
  // }

  // const db = admin.firestore()

  // const dbRef = await db.collection(process.env.APP_NAME_KEY).doc('TEST-STORE-2')

  // let responseData

  // try {
  //   const snapshot = await dbRef.get()

  //   if(!snapshot.exists) {
  //     const appDBref = await db.collection(process.env.APP_NAME_KEY).doc('TEST-STORE-3').set(installInitialData())
  //     // Generate shopify token
  //     console.log('dosnt exist')
  //     responseData = await dbRef.get().onSnapshot(data => data)
  //   } else {
  //     responseData = await snapshot.onSnapshot(data => data)
  //   }
    


  // } catch (error) {

  // }

  // console.log(responseData)


  return res.status(200).json({
    body: {},
  });
}

