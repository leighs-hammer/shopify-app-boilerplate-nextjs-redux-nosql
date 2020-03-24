import appConfig from '../_config/config';


export const listDatabases = async (client) => {

  const databasesList = await client.db().admin().listDatabases();

  console.log('Databases:');
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}


export const createListing = async (client, newListing) => {
  const result = await client.db(appConfig.dbName).collection(appConfig.dbRoot).insertOne(newListing);
  console.log(`New listing created with the following id: ${result.insertedId}`);

}


export const createMultipleListings = async (client, newListings) => {
  const result = await client.db(appConfig.dbName).collection(appConfig.dbRoot).insertMany(newListings);

  console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
  console.log(result.insertedIds);

}

export const findOneListingById = async (client, idOfListing) => {

  const result = await client.db(appConfig.dbName).collection(appConfig.dbRoot).findOne({ _id: idOfListing });

  console.log(result)
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
  createListing,
  createMultipleListings,
  findOneListingById,
}

export default atlasMethods