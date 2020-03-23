
type dbValues = 'atlas' | 'firebase'

interface IFappConfig {
  db: dbValues,
  dbName: string,
  dbRoot: string,
}

const appConfig: IFappConfig = {
  db: 'atlas',
  dbName: 'boilerplate',
  dbRoot: 'stores'
}

export default appConfig