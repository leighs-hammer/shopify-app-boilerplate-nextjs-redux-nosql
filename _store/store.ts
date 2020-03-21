import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import initialStateFile from './initialState'
import rootReducer from './rootReducer'


export const initializeStore = (initialState = initialStateFile) =>  {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  )
}