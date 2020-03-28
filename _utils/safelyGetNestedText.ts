
export const getNestedKey = (pathKeys: string[], dictionary: any) => pathKeys.reduce((xs, x) => (xs && xs[x]) ? xs[x] : false, dictionary)

type TsafelyGetNestedText = (texkKey: string, dictionary: Object) => string

const safelyGetNestedText: TsafelyGetNestedText = (textKey, dictionary) => {

  if(typeof textKey !== 'string') {
    console.error(`safelyGetNestedText requires a string key using object notation to the location you would like to retrieve`)
    return 'Could lookup translation at key location'
  }
  
  let safePathKeys = textKey.split('.')

}

export default safelyGetNestedText