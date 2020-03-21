import { immerCombineReducers } from 'immer-combine-reducers'
import produce from 'immer'

import loading from './reducers/loading'

// This combines immer reducers
const rootReducer =  immerCombineReducers(produce, {
  loading,
})


export default rootReducer