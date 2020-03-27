export interface IFFeatureDetails {
  label: string,
  details?:string, 
}

export interface IFBillingObject {
  id?: string | boolean,
  tier: string, 
  label: string,
  description: string,
  descriptionTrial?: string,
  active: boolean | string,
  cost: number,
  includesLowerTiers?: string,
  features?: IFFeatureDetails[],
  trialLength: number,
}

const billingOptions: IFBillingObject[] = [
  {
    id: false,
    tier: 'basic',
    label: 'Basic',
    description: 'Get started with out basic feature set',
    descriptionTrial: 'includes a 14 day free trial',
    active: false,
    trialLength: 14,
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
    description: 'Lets crank it up a level',
    active: false,
    trialLength: 0,
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
  },
  {
    id: false,
    tier: 'Plus',
    label: 'plus',
    description: 'Designed for high volume stores',
    active: false,
    trialLength: 0,
    cost: 99.00,
    includesLowerTiers: 'Includes everything from pro',
    features: [
      {
        label: 'Teir 2 Support',
        details: 'Tier two support and consultancy (billed) available'
      },
      {
        label: 'Integration suppport',
        details: 'Additional consultancy for high level integrations'
      },
      {
        label: 'Slack access',
        details: 'Speak directly to the team!'
      },
    ]
  }
]

export default billingOptions