import buildGqlEndpoint from '../../_utils/buildGqlEndpoint'


test('Should build the correct enpoint without a version', () => {
  const endpoint = buildGqlEndpoint('some-shop.myshopify.com')
  expect(endpoint).toBe('https://some-shop.myshopify.com/admin/api/2020-01/graphql.json')
})

test('Should build the correct enpoint with a version', () => {
  const endpointWithVersion = buildGqlEndpoint('some-shop.myshopify.com', '1234561')
  expect(endpointWithVersion).toBe('https://some-shop.myshopify.com/admin/api/1234561/graphql.json')
})

test('Should return false when no shop is passed', () => {
  // @ts-ignore
  const failedEndpoint = buildGqlEndpoint()
  expect(failedEndpoint).toBe('')
})


