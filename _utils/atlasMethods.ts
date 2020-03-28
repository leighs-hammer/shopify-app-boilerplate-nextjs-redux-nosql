import appConfig from '../_config/config';
import { MongoClient } from 'mongodb';

export const createDBClient = () => {
  const client: MongoClient = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING, { useUnifiedTopology: true })
  return client
}

export const listDatabases = async (client: MongoClient) => {

  const databasesList = await client.db().admin().listDatabases();

  console.log('Databases:');
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}


export const createStoreDocument = async (client: MongoClient, document: any) => {
  const result = await client.db(appConfig.dbName).collection(appConfig.dbRoot).insertOne(document);
  console.log(`New listing created with the following id: ${result.insertedId}`);
  return document.callAuthenticityKey
}

export const findOneStoreDocumentById = async (client: MongoClient, id: string) => {

  const result = await client.db(appConfig.dbName).collection(appConfig.dbRoot).findOne({ _id: id });
  if(result) {
    console.log(`Found a listing in the collection with the name '${id}':`);
    return result
  } else {
    console.error(`No listings found with the name '${id}'`)
    return false
  }
}

export const getStoreTokenById = async (client: MongoClient, id: string) => {
  const result = await client.db(appConfig.dbName).collection(appConfig.dbRoot).findOne({ _id: id })
  if(result) {
    const {shopifyApiToken, callAuthenticityKey} = result 
    return {shopifyApiToken, callAuthenticityKey}
  }
  return false
}

export const updateField = async (client: MongoClient, id: string, field: string, payload: any) => {
  const result = await client.db(appConfig.dbName).collection(appConfig.dbRoot).updateOne({ _id: id }, {$set: { [field] : payload}})
  console.log(`updating ${id}.${field}`)
  if(result) {
    return true
  }
  return false
}


export const deleteDocumentById = async (client: MongoClient, id: string) => {
  const result = await client.db(appConfig.dbName).collection(appConfig.dbRoot).deleteOne({_id: id})
  if(result) {
    return result
  }
  return false
}


// Index
const atlasMethods = {
  createDBClient,
  createStoreDocument,
  deleteDocumentById,
  findOneStoreDocumentById,
  getStoreTokenById,
  listDatabases,
  updateField,
}



export default atlasMethods