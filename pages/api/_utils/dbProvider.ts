import appConfig from "../../../_config/config"


const dbProvider = () => {
  // error
  if(!appConfig.db) {
    console.error('no DB config set.')
    return false
  }
  // MongoDB Atlas
  if(appConfig.db === 'atlas') {}
  
  // Firebase Firestore
  if(appConfig.db === 'firebase') {}

}

export default dbProvider