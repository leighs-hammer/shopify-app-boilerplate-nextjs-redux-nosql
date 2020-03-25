export interface IFFeatureDetails {
  label: string,
  details?:string, 
}

export interface IFBillingObject {
  id?: string | boolean
  tier: string, 
  label: string,
  description: string,
  active: boolean,
  cost: number,
  includesLowerTiers?: string,
  features?: IFFeatureDetails[],
}

const billingOptions: IFBillingObject[] = [
  {
    id: 'internal',
    tier: 'free',
    label: 'Trial',
    description: 'Free to test our app for 7 days', 
    active: true,
    cost: 0.00
  },
  {
    id: false,
    tier: 'basic',
    label: 'Basic',
    description: 'Ready to take it up a level',
    active: false,
    cost: 10.00,
    features: [
      {
        label: 'Awesome',
        details: 'Does awesome things!'
      }
    ]
  },
  {
    id: false,
    tier: 'pro',
    label: 'Pro',
    description: 'All the bells and wistles',
    active: false,
    cost: 30.00,
    includesLowerTiers: 'Includes everything from basic',
    features: [
      {
        label: 'More awesome',
        details: 'Even more awesome stuff!'
      },
      {
        label: 'Even More awesome',
      }
    ]
  }
]

export default billingOptions