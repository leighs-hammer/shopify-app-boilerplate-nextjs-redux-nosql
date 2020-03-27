const CREATE_APP_BILLIN_SUBSCRIPTION: string = `mutation appSubscriptionCreate(
  $name: String!, 
  $lineItems: [AppSubscriptionLineItemInput!]!, 
  $returnUrl: URL!
  $test: Boolean!
  $trialDays: Int!
	) {
  appSubscriptionCreate(
    name: $name, 
    lineItems: $lineItems, 
    returnUrl: $returnUrl,
    test: $test,
    trialDays: $trialDays
    
  ) {
    appSubscription {
      name
      returnUrl
      id
      status
      createdAt
      trialDays
    }
    confirmationUrl
    userErrors {
      field
      message
    }
  }
}`

export default CREATE_APP_BILLIN_SUBSCRIPTION