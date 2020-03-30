
type dbValues = 'atlas'

interface IFappConfig {
  db: dbValues,
  dbName: string,
  dbRoot: string,

  forceDevelopment: boolean,
}



const appConfig: IFappConfig = {
  // DB
  db: 'atlas', // optional flag if you are gonna add a database type
  dbName: process.env.APP_NAME_KEY,
  dbRoot: 'stores',

  // Billing
  forceDevelopment: true,
}

export default appConfig

