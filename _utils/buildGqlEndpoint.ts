
const buildGqlEndpoint = (shop, version = '2020-01') => shop ? `https://${shop}/admin/api/${version}/graphql.json` : false

export default buildGqlEndpoint