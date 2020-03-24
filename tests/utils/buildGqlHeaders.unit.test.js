import buildHeaders from '../../_utils/buildGqlHeaders';

test('should return correct header token and types', () => {
  const headers = buildHeaders('12345')

  expect(headers['X-Shopify-Access-Token']).toBe('12345')
  expect(headers['Content-Type']).toBe('application/json')
})

test('should return false when no token is passed', () => {
  const failedHeaders = buildHeaders()
  expect(failedHeaders).toBe(false)
})