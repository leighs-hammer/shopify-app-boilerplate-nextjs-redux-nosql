const serviceAccount = () =>  {
  const decoded = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString()
  return JSON.parse(decoded)
}

export default serviceAccount