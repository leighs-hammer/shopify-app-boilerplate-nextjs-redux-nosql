import billingOptions from '../../_config/billingOptions';

const dataShapeBillingVerify = (firstSubscription) => {

  const {status, id, trialDays, createdAt, name, returnUrl, test} = firstSubscription
  
  const optionDetails =  billingOptions.find(item => item.label === name)
  const {tier, cost} = optionDetails

  const billingObject = {
    active: status, // add active status
    cost,
    tier,
    createdAt,
    id,
    status,
    trialDays,
    label: name,
    test,
  }

  return billingObject
}

export default dataShapeBillingVerify