const GET_ACTIVE_SUBSCRIPTION = `{
  currentAppInstallation {
    activeSubscriptions {
      name
      returnUrl
      id
      status
      createdAt
      trialDays
      test
    }
  }
}`

export default GET_ACTIVE_SUBSCRIPTION