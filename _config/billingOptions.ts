interface IFBillingObject {
  tier: string, 
  active: boolean,
  cost: string,
}

const billingOptions: IFBillingObject[] = [
  {
    tier: 'free',
    active: true,
    cost: '0.00'
  },
  {
    tier: 'basic',
    active: false,
    cost: '10.00',
  },
  {
    tier: 'pro',
    active: false,
    cost: '30.00',
  }
]

export default billingOptions