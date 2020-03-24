
type dbValues = 'atlas'

interface IFappConfig {
  db: dbValues,
  dbName: string,
  dbRoot: string,
}



const appConfig: IFappConfig = {
  db: 'atlas', // optional flag if you are gonna add a database type
  dbName: process.env.APP_NAME_KEY,
  dbRoot: 'stores'
}

export default appConfig

