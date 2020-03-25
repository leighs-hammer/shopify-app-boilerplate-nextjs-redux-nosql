import React from 'react'
import { Layout, Card, Heading, Badge, Stack, Button, TextStyle } from '@shopify/polaris'
import { IFBillingObject } from '../../_config/billingOptions';
import { useSelector } from 'react-redux';
import { Features } from '@shopify/app-bridge/actions';
import BillingFeatureList from './BillingFeatureList';
import colorSet from '../../_constants/colorSets';

type TBillingitems = IFBillingObject[] | []

interface IFBillingCards {
  children?: any,
  items: TBillingitems,
  isExpired: boolean
}


const BillingCards:React.FC<IFBillingCards> = ({items, isExpired}) => {

  const billing = useSelector(state => state.app.billing)
  
  if(!billing) { return null}

  return (
    <React.Fragment>
      {
        [...items].map((item: IFBillingObject) => {
          
          const isActive = billing.tier === item.tier
          const isFree = item.tier === 'free' || item.cost === 0.00
          const freeStatus = isExpired ? 'attention': 'success'
          const freeText = isExpired ? 'expired': 'active'

          return (
            <Layout.Section oneThird key={item.tier}>
              <Card 
                sectioned 
              >
                

                <Heading>
                  <span className="headingSpacing">
                    <span className="headingMain">{item.label}</span>
                    {isActive && !isFree && <Badge status='success'>Active</Badge>}
          {isActive && isFree && <Badge status={freeStatus}>{freeText}</Badge>}
                  </span>
                </Heading>
                
                <p>{item.description}</p>

                <BillingFeatureList features={item.features} />

                <Stack spacing="loose" alignment="center" distribution="trailing">
                  <Stack.Item>
                    {!isFree && <TextStyle variation="strong">{`$${item.cost}/month`}</TextStyle>}
                    {isFree && <TextStyle variation="strong">{`Free`}</TextStyle>}
                  </Stack.Item>
                  <Stack.Item>
                    {!isFree && <Button primary disabled={isActive}>{isActive ? 'Active Plan' : 'Select Plan'}</Button>}
                  </Stack.Item>
                </Stack>
              </Card>
              <style jsx>{`
                .activeHeading {
                  color: ${colorSet.indigo.Indigo};
                  margin-left: 6px;
                  font-size: 16px;
                  font-weight: normal;
                }
                .headingSpacing {
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  flex-wrap: wrap;
                }
                .headingMain {
                  flex: 1 auto;
                }
              `}</style>
            </Layout.Section>
          )
        })
      }
    </React.Fragment>
  )

}

export default BillingCards