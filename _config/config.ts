
type dbValues = 'atlas'

interface IFappConfig {
  db: dbValues,
  dbName: string,
  dbRoot: string,

  dualAuth: boolean,

  forceDevelopment: boolean,
}



const appConfig: IFappConfig = {
  // DB
  db: 'atlas', // optional flag if you are gonna add a database type
  dbName: process.env.APP_NAME_KEY,
  dbRoot: 'stores',

  //Users
  dualAuth: true, // enables the dual bump auto for offline & online modes

  // Billing
  forceDevelopment: false,
}

export default appConfig

