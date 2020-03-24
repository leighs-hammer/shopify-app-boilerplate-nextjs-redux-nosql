
const buildAuthUrl = shop => shop ? `https://${shop}/admin/oauth/access_token` : ''

export default buildAuthUrl