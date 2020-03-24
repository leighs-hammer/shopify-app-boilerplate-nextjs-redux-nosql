
const buildGqlEndpoint = (shop: string, version: string = '2020-01') => shop ? `https://${shop}/admin/api/${version}/graphql.json` : ''

export default buildGqlEndpoint