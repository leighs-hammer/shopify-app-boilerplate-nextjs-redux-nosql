import billingOptions from '../../_config/billingOptions';

const dataShapeBilling = (response) => {

  if(!response || !response.data || !response.data || !response.data.data.appSubscriptionCreate) { false }
  
  const subscriptionData = response.data.data.appSubscriptionCreate
  const {appSubscription : {status, id, trialDays, createdAt, name, returnUrl}, confirmationUrl} = subscriptionData
  
  const optionDetails =  billingOptions.find(item => item.label === name)
  const {tier, cost} = optionDetails

  const billingObject = {
    active: false, // add active status
    cost,
    tier,
    createdAt,
    id,
    status,
    trialDays,
    label: name,
    confirmationUrl,
  }

  return billingObject
}

export default dataShapeBilling