import { TsafelyGetNestedText, TgetNestedKey } from '../_types/safelyGetNestedText';

export const getNestedKey: TgetNestedKey = (pathKeys, dictionary) => pathKeys.reduce((xs, x) => (xs && xs[x]) ? xs[x] : false, dictionary)

// Safe function
const safelyGetNestedText: TsafelyGetNestedText = (textKey, dictionary) => {

  if(typeof textKey !== 'string') {
    console.error('safelyGetNestedText requires a string key using object notation to the location you would like to retrieve')
    return `Could lookup translation at ${textKey}`
  }
  
  // just makes sure its an array
  const safePathKeys = textKey.split('.')

  return getNestedKey(safePathKeys, dictionary)

}

export default safelyGetNestedText