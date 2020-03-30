import arrayContainsArray from '../../_utils/arrayContainsArray'

test('should return true when superset contains subset', () => {
  const valid = arrayContainsArray([1,2,3,4,5,6], [2,4,6])
  expect(valid).toBe(true)
})

test('should return false when superset does not contain a member of the subset', () => {
  const valid = arrayContainsArray([1,2,3,4,5,6], [2,4,6,12])
  expect(valid).toBe(false)
})

