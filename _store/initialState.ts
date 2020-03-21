const initialState = {
  loading: false,
  app: {
    authTokenError: false,
    callAuthenticityKey: false,
    credentialToken: false,
    credentialTokenError: false,
    firstInstall: false,
    k: process.env.SHOPIFY_API_KEY,
    currentPath: {
      path: '/',
      href: '/'
    }
  },
  shop: {
    domain: false,
  },
}

export default initialState