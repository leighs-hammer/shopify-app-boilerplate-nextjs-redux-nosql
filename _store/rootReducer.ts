import { immerCombineReducers } from 'immer-combine-reducers'
import produce from 'immer'

import loading from './reducers/loading'
import shop from './reducers/shop'
import app from './reducers/app'

// This combines immer reducers
const rootReducer =  immerCombineReducers(produce, {
  app,
  loading,
  shop,
})


export default rootReducer