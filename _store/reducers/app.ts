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
        callAuthenticityKey: false,
      })
      return draft

    case CONSTANTS.UPDATE_BILLING:
      draft = Object.assign({}, draft, {
        billing: action.payload,
      })
      return draft


  }
})