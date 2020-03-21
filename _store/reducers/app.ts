import produce from 'immer'
import CONSTANTS from '../../_constants'

export default produce((draft, action) => {
  switch (action.type) {
    
    // Router Sync
    case CONSTANTS.UPDATE_CURRENT_PATH:
      draft.currentPath = action.payload
      return draft

    // Installs
    case CONSTANTS.INSTALL_SET_DATA:
      draft = Object.assign({}, draft, action.payload)
      return draft

    case CONSTANTS.INSTALL_SET_DATA_RESET:
      draft = Object.assign({}, draft, {
        authTokenError: false,
        callAuthenticityKey: false,
        credentialToken: false,
        credentialTokenError: false,
        firstInstall: false,
      })
      return draft
    
    case CONSTANTS.FIREBASE_LOGIN_RESET:
      draft.credentialToken = false
      return draft


  }
})