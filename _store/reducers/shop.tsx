import produce from 'immer'
import CONSTANTS from '../../_constants'

export default produce((draft, action) => {
  switch (action.type) {
    case CONSTANTS.UPDATE_SHOP:
      draft = action.payload
      return draft
    case CONSTANTS.UPDATE_SHOP_DOMAIN:
      draft.domain = action.payload
      return draft
  }
})