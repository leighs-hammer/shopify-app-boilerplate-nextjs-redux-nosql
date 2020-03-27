import appConfig from '../_config/config';
import { MongoClient } from 'mongodb';


export const listDatabases = async (client: MongoClient) => {

  const databasesList = await client.db().admin().listDatabases();

  console.log('Databases:');
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}


export const createStoreDocument = async (client, document) => {
  const result = await client.db(appConfig.dbName).collection(appConfig.dbRoot).insertOne(document);
  console.log(`New listing created with the following id: ${result.insertedId}`);
  return document.callAuthenticityKey
}


export const createMultipleStoreDocuments = async (client, document) => {
  const result = await client.db(appConfig.dbName).collection(appConfig.dbRoot).insertMany(document);

  console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);

}

export const findOneStoreDocumentById = async (client, id) => {

  const result = await client.db(appConfig.dbName).collection(appConfig.dbRoot).findOne({ _id: id });
  if(result) {
    console.log(`Found a listing in the collection with the name '${id}':`);
    return result
  } else {
    console.error(`No listings found with the name '${id}'`)
    return false
  }
}

export const getStoreTokenById = async (client, id) => {
  const result = await client.db(appConfig.dbName).collection(appConfig.dbRoot).findOne({ _id: id })
  if(result) {
    const {shopifyApiToken, callAuthenticityKey} = result 
    return {shopifyApiToken, callAuthenticityKey}
  }
  return false
}

export const updateField = async (client, id, field, payload) => {
  const result = await client.db(appConfig.dbName).collection(appConfig.dbRoot).updateOne({ _id: id }, {$set: { [field] : payload}})
  console.log(`updating ${id}.${field}`)
  if(result) {
    return true
  }
  return false
}

export const getBilling = async (client: MongoClient, id: string) => {
  const result = await client.db(appConfig.dbName).collection(appConfig.dbRoot).findOne({_id: id}, { billing: 1})
  if(result) {
    return result
  }
  return true
}

// Index
const atlasMethods = {
  createStoreDocument,
  createMultipleStoreDocuments,
  findOneStoreDocumentById,
  getStoreTokenById,
  listDatabases,
  updateField,
  getBilling,
}

export default atlasMethods