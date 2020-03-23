import appConfig from "../../../_config/config";


export const listDatabases = async (client) => {
  let databasesList
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}


export const createListing = async (client, newListing) => {
  const result = await client.db(appConfig.dbName).collection(appConfig.dbRoot).insertOne(newListing);
  console.log(`New listing created with the following id: ${result.insertedId}`);

}


async function createMultipleListings(client, newListings){
  const result = await client.db(appConfig.dbName).collection(appConfig.dbRoot).insertMany(newListings);

  console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
  console.log(result.insertedIds);

}