import buildAuthUrl from '../../_utils/buildAuthUrl'

test('should expect an auth url to be correct', () => {
  const testUrl = buildAuthUrl('test.myshopify.com')

  expect(testUrl).toBe('https://test.myshopify.com/admin/oauth/access_token')
})

test('should return false when no shop is passed in', () => {
  // @ts-ignore
  const failedAuth = buildAuthUrl()
  expect(failedAuth).toBe('')
})