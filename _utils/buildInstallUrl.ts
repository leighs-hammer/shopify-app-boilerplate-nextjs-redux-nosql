
type TbuildIntallUrl = (shop: string, state: string, online?: boolean ) => string

const buildInstallUrl:TbuildIntallUrl = (shop, state, online) => {
  return `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${process.env.SHOPIFY_APP_SCOPES}&state=${state}&redirect_uri=${process.env.APP_URL}/dashboard`
}

export default buildInstallUrl