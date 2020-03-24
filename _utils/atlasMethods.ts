import appConfig from '../_config/config';


export const listDatabases = async (client) => {

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

export const findOneStoreDocumentById = async (client, idOfListing) => {

  const result = await client.db(appConfig.dbName).collection(appConfig.dbRoot).findOne({ _id: idOfListing });
  if(result) {
    console.log(`Found a listing in the collection with the name '${idOfListing}':`);
    return result
  } else {
    console.error(`No listings found with the name '${idOfListing}'`)
    return false
  }
}


// Index
const atlasMethods = {
  listDatabases,
  createStoreDocument,
  createMultipleStoreDocuments,
  findOneStoreDocumentById,
}

export default atlasMethods