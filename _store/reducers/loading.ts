import produce from 'immer'
import CONSTANTS from '../../_constants'

export default produce((draft, action) => {
  switch (action.type) {
    case CONSTANTS.LOADING:
      draft = action.payload
      return draft
  }
})