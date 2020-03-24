const buildHeaders = (token?: string) => token ? ({
  'X-Shopify-Access-Token': token,
  'Content-Type': 'application/json',
  'Accept': 'application/lson'
}) : false

export default buildHeaders