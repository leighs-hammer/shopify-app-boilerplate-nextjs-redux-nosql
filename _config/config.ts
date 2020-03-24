
type dbValues = 'atlas' | 'firebase'

interface IFappConfig {
  db: dbValues,
  dbName: string,
  dbRoot: string,
}



const appConfig: IFappConfig = {
  db: 'atlas', // optional flag if you are gonna add a database type
  dbName: 'boilerplate',
  dbRoot: 'stores'
}

export default appConfig