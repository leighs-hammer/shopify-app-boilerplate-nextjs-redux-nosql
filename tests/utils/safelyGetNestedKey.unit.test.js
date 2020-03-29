import safelyGetNestedText, {getNestedKey} from '../../_utils/safelyGetNestedText'

const mockDictionary = {
  test: {
    test: {
      test: {
        value: 'VALUE',
        valueArray: [
          'string',
          'string2'
        ]
      }
    }
  }
}


// getNestedKey
test('a nested value should be found with the "getNestedKey" function', () => {
  const gotten = getNestedKey(['test','test','test','value'], mockDictionary)
  expect(gotten).toBe('VALUE')
})

test('a nested value should return false with the "getNestedKey" function', () => {
  const gotten = getNestedKey(['test','test','invalid','value'], mockDictionary)
  expect(gotten).toBe(false)
})

test('a nested array value at an index should be found with the "getNestedKey" function', () => {
  const gotten = getNestedKey(['test','test','test','valueArray', '1'], mockDictionary)
  expect(gotten).toBe('string2')
})

test('a nested array should be found with the "getNestedKey" function', () => {
  const gotten = getNestedKey(['test','test','test','valueArray'], mockDictionary)
  expect(gotten.length).toBe(2)
  expect(gotten[0]).toBe('string')
  expect(gotten[1]).toBe('string2')
})

// Safely Get or Fallback or fail gracefully

test('safelyGetNestedText should find nested text using object notation', () => {
  const gotten = safelyGetNestedText('test.test.test.value', mockDictionary)
  expect(gotten).toBe('VALUE')
})

test('safelyGetNestedText should return false text using invalid object notation', () => {
  const gotten = safelyGetNestedText('test.invalid.test.value', mockDictionary)
  expect(gotten).toBe(false)
})

test('safelyGetNestedText should nested array value using object notation', () => {
  const gotten = safelyGetNestedText('test.test.test.valueArray.1', mockDictionary)
  expect(gotten).toBe('string2')
})

test('safelyGetNestedText should nested array using object notation', () => {
  const gotten = safelyGetNestedText('test.test.test.valueArray', mockDictionary)
  expect(gotten.length).toBe(2)
  expect(gotten[0]).toBe('string')
  expect(gotten[1]).toBe('string2')
})