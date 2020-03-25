const initialState = {
  loading: false,
  app: {
    callAuthenticityKey: false,
    k: process.env.SHOPIFY_API_KEY,
    currentPath: {
      path: '/',
      href: '/'
    },
    billing: 'init',
  },
  shop: {
    domain: false,
  },
}

export default initialState